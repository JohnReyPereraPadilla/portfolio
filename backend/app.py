import os
import time
from flask import Flask, render_template, request, jsonify, Response
from dotenv import load_dotenv
from supabase import create_client, Client
from werkzeug.utils import secure_filename

load_dotenv()

app = Flask(__name__, 
            template_folder='../frontend/templates', 
            static_folder='../frontend/static')

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# ==========================================
# 1. HOMEPAGE ROUTE (Fetches all data)
# ==========================================
@app.route('/')
def home():
    # Fetch CV stats
    stats_response = supabase.table('portfolio_stats').select('*').eq('id', 1).execute()
    cv_stats = stats_response.data[0] if stats_response.data else {"cv_views": 0, "cv_downloads": 0}
    
    # Fetch Project Likes
    likes_response = supabase.table('project_likes').select('*').execute()
    project_likes = {item['project_id']: {'count': item['likes'], 'liked_by': item['liked_by'] or []} for item in likes_response.data}
    
    # Fetch Projects from Database
    projects_response = supabase.table('projects').select('*').execute()
    db_projects = projects_response.data
    
    return render_template('index.html', stats=cv_stats, project_likes=project_likes, db_projects=db_projects)

# ==========================================
# 2. API ROUTES FOR CV STATS
# ==========================================
@app.route('/api/stats/view', methods=['POST'])
def track_view():
    current = supabase.table('portfolio_stats').select('*').eq('id', 1).execute().data[0]
    supabase.table('portfolio_stats').update({'cv_views': current['cv_views'] + 1}).eq('id', 1).execute()
    return jsonify({"status": "success"})

@app.route('/api/stats/download', methods=['POST'])
def track_download():
    current = supabase.table('portfolio_stats').select('*').eq('id', 1).execute().data[0]
    supabase.table('portfolio_stats').update({'cv_downloads': current['cv_downloads'] + 1}).eq('id', 1).execute()
    return jsonify({"status": "success"})

# ==========================================
# 3. API ROUTE FOR PROJECT HEARTS
# ==========================================
@app.route('/api/like/<project_id>', methods=['POST'])
def like_project(project_id):
    data = request.json
    user_id = data.get('user_id')
    
    if not user_id:
        return jsonify({"error": "User ID required"}), 400

    response = supabase.table('project_likes').select('*').eq('project_id', project_id).execute()
    
    if response.data:
        project_data = response.data[0]
        current_likes = project_data['likes']
        liked_by = project_data['liked_by'] or []
        
        if user_id in liked_by:
            liked_by.remove(user_id)
            new_likes = max(0, current_likes - 1)
            action = "unliked"
        else:
            liked_by.append(user_id)
            new_likes = current_likes + 1
            action = "liked"
            
        supabase.table('project_likes').update({
            'likes': new_likes,
            'liked_by': liked_by
        }).eq('project_id', project_id).execute()
        
    else:
        liked_by = [user_id]
        new_likes = 1
        action = "liked"
        supabase.table('project_likes').insert({
            'project_id': project_id, 
            'likes': new_likes,
            'liked_by': liked_by
        }).execute()

    return jsonify({"status": "success", "action": action, "new_count": new_likes})

# ==========================================
# 4. API ROUTE FOR ADDING NEW PROJECT (With Image Upload)
# ==========================================
@app.route('/api/projects', methods=['POST'])
def add_project():
    name = request.form.get('name')
    category = request.form.get('category')
    year = request.form.get('year')
    role = request.form.get('role')
    description = request.form.get('description')
    overview = request.form.get('overview')
    tech = request.form.get('tech').split(',')
    features = request.form.get('features').split(',')
    image_file = request.files.get('image')

    image_url = ""
    
    # I-upload ang image sa Supabase Storage
    if image_file:
        filename = secure_filename(image_file.filename)
        unique_filename = f"{int(time.time())}_{filename}"
        
        try:
            supabase.storage.from_('project-images').upload(
                path=unique_filename,
                file=image_file.read(),
                file_options={"content-type": image_file.content_type}
            )
            image_url = supabase.storage.from_('project-images').get_public_url(unique_filename)
        except Exception as e:
            return jsonify({"error": f"Image upload failed: {str(e)}"}), 400

    # I-save sa Database
    project_id = name.lower().replace(' ', '-')
    
    new_project = {
        "id": project_id,
        "name": name,
        "category": category,
        "year": int(year),
        "role": role,
        "description": description,
        "overview": overview,
        "tech": tech,
        "features": features,
        "image": image_url,
        "gallery": [],
        "type": "Personal",
        "status": "Completed"
    }
    
    try:
        supabase.table('projects').insert(new_project).execute()
        return jsonify({"status": "success"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# ==========================================
# 5. ERROR HANDLER & ROBOTS
# ==========================================
@app.errorhandler(404)
def page_not_found(e):
    if request.path.startswith('/api/'):
        return jsonify(error="Not found"), 404
    return render_template('index.html')

@app.route('/robots.txt')
def robots():
    content = "User-agent: *\nAllow: /\n"
    return Response(content, mimetype='text/plain')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
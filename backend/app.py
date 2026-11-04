import os
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from supabase import create_client, Client

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
    
    return render_template('index.html', stats=cv_stats, project_likes=project_likes)

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
        liked_by = project_data['liked_by'] or [] # Listahan ng mga user IDs
        
        if user_id in liked_by:
            # UNLIKE: Binabawas natin at tinatanggal ang user ID
            liked_by.remove(user_id)
            new_likes = max(0, current_likes - 1)
            action = "unliked"
        else:
            # LIKE: Dinadagdagan natin at idinadagdag ang user ID
            liked_by.append(user_id)
            new_likes = current_likes + 1
            action = "liked"
            
        supabase.table('project_likes').update({
            'likes': new_likes,
            'liked_by': liked_by
        }).eq('project_id', project_id).execute()
        
    else:
        # Kung first time ma-like ang project na ito
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
# 4. 404 ERROR HANDLER (Fixes the Hash Router refresh issue)
# ==========================================
@app.errorhandler(404)
def page_not_found(e):
    # If the request is for an API, return JSON error
    if request.path.startswith('/api/'):
        return jsonify(error="Not found"), 404
    
    # For anything else, return the main page (so #/projects/... works)
    return render_template('index.html')

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
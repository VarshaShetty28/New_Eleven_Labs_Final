from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
from routes.audio_routes import audio_routes
import os

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(audio_routes)

# Home route
@app.route("/")
def home():
    return {"message": "ElevenLabs Clone Flask Backend Running 🚀"}

# Health check route for Render
@app.route("/health")
def health_check():
    return {"status": "healthy", "message": "Backend is running"}

# Route to serve audio files (keep for backward compatibility, but not needed with Cloudinary)
@app.route('/static/audio/<filename>')
def serve_audio(filename):
    try:
        return send_from_directory('audio', filename)
    except Exception as e:
        return jsonify({"error": f"File not found: {filename}"}), 404

if __name__ == "__main__":
    # Use PORT environment variable from Render, fallback to 5000 for local
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=False, host="0.0.0.0", port=port)
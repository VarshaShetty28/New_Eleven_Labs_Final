from flask import Flask, send_from_directory
from flask_cors import CORS
from routes.audio_routes import audio_routes

app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(audio_routes)

# Home route
@app.route("/")
def home():
    return {"message": "ElevenLabs Clone Flask Backend Running 🚀"}

# Route to serve audio files from /backend/audio
@app.route('/static/audio/<filename>')
def serve_audio(filename):
    return send_from_directory('audio', filename)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
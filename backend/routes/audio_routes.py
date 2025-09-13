from flask import Blueprint, request, jsonify
from config.database import db
from models.audio_model import AudioModel

audio_routes = Blueprint("audio_routes", __name__)
audio_collection = db["audios"]

# ✅ Get audio by language
@audio_routes.route("/audio/<language>", methods=["GET"])
def get_audio(language):
    audio = audio_collection.find_one({"language": language.upper()})
    if audio:
        return jsonify({
            "language": audio["language"],
            "url": audio["url"]
        })
    return jsonify({"error": f"No audio found for {language}"}), 404

# ✅ Add audio to DB
@audio_routes.route("/audio", methods=["POST"])
def add_audio():
    data = request.json
    if not data.get("language") or not data.get("url"):
        return jsonify({"error": "language and url required"}), 400
    
    audio = AudioModel(data["language"], data["url"])
    audio_collection.insert_one(audio.to_dict())
    return jsonify({"message": "Audio added successfully!"}), 201
from flask import Blueprint, request, jsonify
from config.database import db
from models.audio_model import AudioModel

audio_routes = Blueprint("audio_routes", __name__)
audio_collection = db["audios"]

#  Get audio by language
@audio_routes.route("/audio/<language>", methods=["GET"])
def get_audio(language):
    try:
        audio = audio_collection.find_one({"language": language.upper()})
        if audio:
            return jsonify({
                "language": audio["language"],
                "url": audio["url"],
                "status": "success"
            }), 200
        else:
            return jsonify({
                "error": f"No audio found for {language}",
                "available_languages": ["ENGLISH", "ARABIC"]
            }), 404
    except Exception as e:
        return jsonify({
            "error": "Database error",
            "details": str(e)
        }), 500

#  Add audio to DB
@audio_routes.route("/audio", methods=["POST"])
def add_audio():
    try:
        data = request.json
        if not data.get("language") or not data.get("url"):
            return jsonify({"error": "language and url required"}), 400
        
        audio = AudioModel(data["language"], data["url"])
        audio_collection.insert_one(audio.to_dict())
        return jsonify({"message": "Audio added successfully!"}), 201
    except Exception as e:
        return jsonify({
            "error": "Failed to add audio",
            "details": str(e)
        }), 500

#  Get all audio files
@audio_routes.route("/audio", methods=["GET"])
def get_all_audio():
    try:
        audios = list(audio_collection.find({}, {"_id": 0}))
        return jsonify({
            "audios": audios,
            "count": len(audios)
        }), 200
    except Exception as e:
        return jsonify({
            "error": "Failed to fetch audio list",
            "details": str(e)
        }), 500
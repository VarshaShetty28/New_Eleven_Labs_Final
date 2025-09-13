from config.database import db

audio_collection = db["audios"]

# Clear existing data
audio_collection.delete_many({})

# Insert new records linking to your local audio files
audios = [
    {
        "language": "ENGLISH",
        "url": "http://127.0.0.1:5000/static/audio/english_audio.mp3"
    },
    {
        "language": "ARABIC",
        "url": "http://127.0.0.1:5000/static/audio/arabic_audio.mp3"
    }
]

audio_collection.insert_many(audios)
print("✅ Seeded English + Arabic audio files into DB!")
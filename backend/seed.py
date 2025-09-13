from config.database import db

audio_collection = db["audios"]

# Clear existing data
print(" Clearing existing audio records...")
result = audio_collection.delete_many({})
print(f"Deleted {result.deleted_count} old records")

# Insert new records with Cloudinary URLs
audios = [
    {
        "language": "ENGLISH",
        "url": "https://res.cloudinary.com/dl6vxcgox/video/upload/v1757768699/english_audio_dcl0fi.mp3"
    },
    {
        "language": "ARABIC",
        "url": "https://res.cloudinary.com/dl6vxcgox/video/upload/v1757768782/arabic_audio_dzbbvv.mp3"
    }
]

try:
    insert_result = audio_collection.insert_many(audios)
    print(f" Seeded {len(insert_result.inserted_ids)} audio files with Cloudinary URLs!")
    
    print("\n Database contents:")
    for audio in audios:
        print(f"  {audio['language']}: {audio['url']}")
        
    print("\n SUCCESS! Your production app should work now!")
    
    # Test the URLs
    print("\n Testing Cloudinary URLs...")
    import requests
    
    for audio in audios:
        try:
            response = requests.head(audio['url'], timeout=5)
            if response.status_code == 200:
                size_kb = int(response.headers.get('content-length', 0)) // 1024
                print(f"   {audio['language']}: Working ({size_kb}KB)")
            else:
                print(f"   {audio['language']}: HTTP {response.status_code}")
        except Exception as e:
            print(f"   {audio['language']}: {str(e)}")
            
except Exception as e:
    print(f" Error seeding database: {e}")
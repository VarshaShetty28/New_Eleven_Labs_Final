class AudioModel:
    def __init__(self, language, url):
        self.language = language
        self.url = url
    
    def to_dict(self):
        return {
            "language": self.language.upper(),
            "url": self.url
        }
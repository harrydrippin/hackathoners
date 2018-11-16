from hackathoners import create_app
from hackathoners.config import Config
from hackathoners.crawler.utils import Analyser

app = create_app(Config)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    # Test purposed code
    #Analyser.analyse(["lablup/backend.ai"])
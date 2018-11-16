from hackathoners import create_app
from hackathoners.config import Config
from hackathoners.crawler.utils import Analyser

app = create_app(Config)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
    # TODO(@gwons): Analyser Pulse 분석 추가 및 안정화
    # Analyser.analyse(["lablup/backend.ai"])
from flask import Flask
from flask_cors import CORS
from flask import Blueprint
from flask_restful import Api
from hackathoners.crawler import CrawlerThread

def create_app(config):
    _app = Flask(__name__)
    _app.config.from_object(config)
    _app.secret_key = config.secret_key
    
    CORS(_app, resources={r"/*": {"origins": "*"}})

    api_v1_blueprint = Blueprint('api', __name__, url_prefix="/api")
    api_v1 = Api(api_v1_blueprint)

    from hackathoners.restapi.crawl import Crawl
    from hackathoners.restapi.team_detail import TeamDetail
    from hackathoners.restapi.team_list import TeamList

    api_v1.add_resource(Crawl, '/crawl')
    api_v1.add_resource(TeamDetail, '/detail')
    api_v1.add_resource(TeamList, '/list')

    _app.register_blueprint(api_v1_blueprint)

    @_app.route("/")
    def index():
        return "<h1>OMMAT Server Ver. 1.0.0.</h1>"
    
    return _app
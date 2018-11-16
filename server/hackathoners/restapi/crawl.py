from flask import request
from flask import session
from flask_restful import Resource
from hackathoners.config import Config
from hackathoners.db import Database

import json
import time


class Crawl(Resource):
    def get(self):
        return {'status': 0}

    def post(self):
        timestamp = Database.get_crawler_timestamp()
        now_timestamp = int(time.time())

        if timestamp and timestamp - now_timestamp > 3600000:
            return {'status': 1}
        elif Database.is_crawling_ongoing():
            return {'status': 2}
        else:
            return {'status': 0}
        
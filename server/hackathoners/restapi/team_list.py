from flask import request
from flask import session
from flask_restful import Resource
from hackathoners.config import Config
from hackathoners.db import Database
from hackathoners.crawler import CrawlerThread
import json
import time

class TeamList(Resource):
    def get(self):
        compare, target = Database.get_repository_list()
        if not compare:
            return {
                "result": 1
            }
        return {
            "result": 0,
            "compare": compare,
            "target": target
        }

    def post(self):
        args = json.loads(request.data.decode('utf-8'))
        compare, target = args["compare"], args["target"]
        Database.set_repository_list(compare, target)
        timestamp = Database.get_crawler_timestamp()
        now_timestamp = int(time.time())

        if Database.is_crawling_ongoing():
            return {'result': 1}
        else:
            thread = CrawlerThread(1, "CrawlJobTrigger", 1)
            thread.start()
            return {'result': 0}
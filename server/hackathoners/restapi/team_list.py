from flask import request
from flask import session
from flask_restful import Resource
from hackathoners.config import Config
from hackathoners.db import Database
import json

class TeamList(Resource):
    def get(self):
        compare, target = Database.get_repository_list()
        return {
            "result": 0,
            "compare": compare,
            "target": target
        }

    def post(self):
        args = json.loads(request.data.decode('utf-8'))
        compare, target = args["compare"], args["target"]
        Database.set_repository_list(compare, target)
        return {
            "result": 0
        }
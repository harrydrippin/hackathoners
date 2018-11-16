from flask import request
from flask import session
from flask_restful import Resource
from hackathoners.config import Config
from hackathoners.db import Database
import json

class TeamDetail(Resource):
    def post(self):
        args = json.loads(request.data.decode('utf-8'))
        repo = args["repo"]

        repo_report = Database.get_report_detail(repo)

        if not repo_report:
            return {
                "result": 1
            }
        return {
            "result": 0,
            "detail": repo_report
        }
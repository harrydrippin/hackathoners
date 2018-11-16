from flask import request
from flask import session
from flask_restful import Resource
from hackathoners.config import Config
import json

class TeamDetail(Resource):
    def post(self):
        return {'status': 0}
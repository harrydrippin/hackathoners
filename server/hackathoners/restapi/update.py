from flask import request
from flask import session
from flask_restful import Resource
from hackathoners.config import Config
import json

class TeamUpdate(Resource):
    def post(self):
        return {'status': 0}
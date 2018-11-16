from flask import request
from flask import session
from flask_restful import Resource
from hackathoners.config import Config
import json

class TeamList(Resource):
    def get(self):
        return {'status': 0}
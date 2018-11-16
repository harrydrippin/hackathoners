from flask import request
from flask import session
from flask_restful import Resource
from hackathoners.config import Config
import json

# TODO(@gwons): Crawler 코드에 해당 내용 편입
class GetCommit(Resource):
    def get(self):
        headers = {
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
        }
        
        url = "https://github.com/utilForever/Hearthstonepp/graphs/commit-activity-data"

        res = requests.get(url, headers=headers)
        _m = res.json()
        sleep(1)
        for i in range(52):
            del _m[i]['days']
        return _m
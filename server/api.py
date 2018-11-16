from flask import Flask
from flask_restful import Resource, Api
from flask_restful import reqparse
from time import *
import json, requests

app = Flask(__name__)
api = Api(app)

# 현재 등록된 팀 목록 ()
class TeamInfo(Resource):
    def get(self):
        return {'status': 'TeamInfo API'}

# 팀의 자세한 정보 API
class TeamDetailInfo(Resource):
    def get(self):
        return {'status': 'TeamDetailInfo API'}

# 커밋 갯수, 타임스탬프 API
class getCommits(Resource):
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

# API를 만들자
api.add_resource(TeamInfo, '/info')
api.add_resource(TeamDetailInfo, '/detail_info')
api.add_resource(getCommits, '/commits')

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
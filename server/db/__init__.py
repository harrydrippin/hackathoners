from tinydb import TinyDB, where
from tinydb.operations import delete
from config import Config

class Database:
    db = TinyDB(Config.tinydb_document)
    team = db.table('team')

    @classmethod
    def get_info(cls, name):
        """
        한 팀의 점수와 자세한 정보를 가져옵니다.
        """
        result = cls.team.search(where('name') == name)

        if len(result) == 0: 
            return False
        
        return result[0].copy()

    @classmethod
    def get_all(cls):
        """
        모든 팀의 점수를 가져옵니다.
        """
        return cls.team.all()

    @classmethod
    def set_info(cls, score):
        """
        한 팀의 점수와 자세한 정보를 세팅합니다.
        """
        # if cls.team.get(where('name') == score["name"]) != None:
        #     cls.team.remove(where('name') == score["name"])
        return cls.team.upsert(score, where('name') == str(score["name"]))

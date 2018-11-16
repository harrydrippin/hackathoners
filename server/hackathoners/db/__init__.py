from tinydb import TinyDB, where
from tinydb.operations import delete
from hackathoners.config import Config
import time

"""
Table: repository
    {
        "name": "owner/project_name",
        "explainer": "프로젝트에 대한 간단한 설명"
    }

Table: crawler
    {
        "timestamp": UnixTime,
        "is_ongoing": True or False
    }

Table: report
    {
        "name": "owner/project_name",
        ...여타 다른 Report 요소들
    }
"""

class Database:
    db = TinyDB(Config.tinydb_document)

    # 각 팀 별 Report를 저장함
    report = db.table('report')
    # 팀 리스트를 유지 관리함
    repository = db.table('repository')
    # Crawler 동작 시간을 관리함
    crawler = db.table('crawler')

    @classmethod
    def get_report_detail(cls, name):
        """
        한 Repository의 Report를 가져옵니다.
        :param name 'owner/project_name' 꼴의 String
        """
        result = cls.report.search(where('name') == name)

        if len(result) == 0: 
            return False
        
        return result[0].copy()

    @classmethod
    def set_report_detail(cls, name, report):
        """
        한 Repository의 Report를 저장합니다.
        :param name 'owner/project_name' 꼴의 String
        :param report Report 정보를 담는 Dictionary
        """
        return cls.report.upsert(report, where('name') == str(report["name"]))

    @classmethod
    def get_repository_list(cls):
        """
        모든 Repository의 List를 가져옵니다.
        만약 없다면, False를 반환합니다.
        """

        data = cls.repository.all()

        if len(data) == 0:
            return False, False

        return data[0]["compare"], data[0]["target"]

    @classmethod
    def set_repository_list(cls, compare, target):
        """
        Repository List를 저장합니다.
        :param compare 대조군 Code를 담은 List
        :param target 분석 대상 Code를 담은 List
        """
        # 모든 데이터를 삭제하고 하나의 데이터를 넣음
        cls.repository.purge()
        cls.repository.insert({
            "compare": compare,
            "target": target
        })

    @classmethod
    def get_crawler_timestamp(cls):
        """
        Crawler가 마지막으로 종료된 시간을 가져옵니다.
        만약 한 번도 돌아간 적이 없다면 False를 반환합니다.
        """
        crawler_all = cls.crawler.all()
        if len(crawler_all) == 0:
            return False
        return crawler_all[0].copy()["timestamp"]

    @classmethod
    def is_crawling_ongoing(cls):
        """
        현재 Crawling Job이 돌고 있는지 확인합니다.
        """
        info = cls.crawler.all()
        if len(info) == 0:
            return False
        return info[0]["is_ongoing"]

    @classmethod
    def change_crawler_state(cls, state):
        """
        주어진 인자로 Crawler의 상태를 변경합니다.
        :param state True or False
        """
        cls.crawler.purge()
        cls.crawler.insert({
            "timestamp": time.time(),
            "is_ongoing": state
        })

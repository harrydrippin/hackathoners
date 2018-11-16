from .utils import Analyser
from hackathoners.config import Config
from hackathoners.db import Database

import threading
import time
import json

def crawler_run():
   """
   Crawler를 실행하는 함수입니다.
   이 함수는 무조건 Background에서 실행되어야 합니다.
   """
   team_info = Database.get_repository_list()
   if not team_info:
      print("[-] No any team info found")
      return
   print("[+] Start to crawl")
   start = time.time()
   processed_array = Analyser.analyse(team_info)
   print("[+] Ended. %d seconds." % (time.time() - start))

class CrawlerThread(threading.Thread):
   def __init__(self, threadID, name, counter):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.name = name
      self.counter = counter

   def run(self):
        crawler_run()
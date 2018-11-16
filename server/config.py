# -*- coding: utf-8 -*-
import os

from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv())

class Config:
    secret_key = os.environ.get("SECRET_KEY")
    tinydb_document = os.environ.get("TINYDB_DOCUMENT")

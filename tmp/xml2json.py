#!/usr/bin/python3

from bs4 import BeautifulSoup as bs
from glob import glob
import pymongo
import re
from datetime import datetime

header = ['團號', '出發日期', '回程日期', '抵台日期', '天數',\
        '產品名稱', '去程航班', '回程航班', '飯店', '雜支', \
        '航班', '詳細內容', '團費售價', '團費售價', '總機位', \
        '可報名', '候補', '報名', '住宿', '狀態', '銷售說明', \
        '備註']

def stripDate(date):
    rr = re.split('([0-9][0-9])/([0-9][0-9])', date)[1:-1]
    if len(rr) != 2: return None
    mm, dd = rr
    mm, dd = int(mm), int(dd)
    if mm >= 10:
        return datetime(2015, mm, dd)
    else:
        return datetime(2016, mm, dd)

schema = { 
        '住宿': str, 
        '候補': int, 
        '備註': str, 
        '出發日期': stripDate,
        '去程航班': str,
        '可報名': int,
        '回程日期': stripDate,
        '回程航班': str,
        '團號': str,
        '團費售價': lambda ss: int(ss.replace(',','')) if ',' in ss else None,
        '報名': str,
        '天數': int,
        '抵台日期': stripDate,
        '狀態': str,
        '產品名稱': str,
        '總機位': int,
        '航班': str,
        '詳細內容': str,
        '銷售說明': str,
        '雜支': str,
        '飯店': str}

ll = []
for fn in glob('*.xml'):
    with open(fn) as ff:
        soup = bs(ff)
        table = soup.find('table')
        for tr in table.findAll('tr')[3:]:
            ll.append([td.text.strip() for td in tr.findAll('td')])
ll = [dict((key, schema[key](l[i])) for i, key in enumerate(header)) for l in ll]

if __name__ == "__main__":
    from pymongo import MongoClient
    client = MongoClient()
    db = client['loyo']
    coll = db['airplanes']
    coll.insert_many(ll)

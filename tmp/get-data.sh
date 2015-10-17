#!/bin/bash

curl 'http://www.loyo.com.tw/eweb/go/Get_GO_M_grup_list.asp' \
    -H 'Pragma: no-cache' \
    -H 'Origin: http://www.loyo.com.tw' \
    -H 'Accept-Encoding: gzip, deflate' \
    -H 'Accept-Language: en-US,en;q=0.8,zh-TW;q=0.6,zh;q=0.4,ja;q=0.2,zh-CN;q=0.2,gl;q=0.2' \
    -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36' \
    -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
    -H 'Accept: text/plain, */*; q=0.01' \
    -H 'Cache-Control: no-cache' \
    -H 'X-Requested-With: XMLHttpRequest' \
    -H 'Cookie: ASPSESSIONIDASCSCRDC=LLEOGKLANGHBAGAHMCENNNCE; __atuvc=8%7C41; __utmt=1; __utma=48933435.1245910534.1445068055.1445068055.1445087208.2; __utmb=48933435.5.10.1445087208; __utmc=48933435; __utmz=48933435.1445068055.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none)' \
    -H 'Connection: keep-alive' \
    -H 'Referer: http://www.loyo.com.tw/eWeb/GO/L_GO_Type.asp?iMGRUP_CD=KE03&iSUB_CD=GO&JOIN_TP=1' \
    --data "iMGRUP_CD=$1&iSUB_CD=GO&REF_AMRNK=1&AMRNK=1&e_date=&s_date=&s_t_days=&e_t_days=&NOT_DISPLAY_FG=&site_cd=1&pGO_SET_SELLPRICE_TXT=1&GO_SHOW_DETAILGRUP_LIST=0&GO_SHOW_SUM_QT=0&GO_SHOW_SALE_QT=0&show_grup_cd=none&oGO_SHOW_GBOOK_FG=0&oGO_SHOW_GRUP_SNM_FG=1&oGO_SHOW_DTL_PACK=0&oGO_SHOW_DTL_HTL=0&oGO_SHOW_GBOOK_RETN=0&oGO_SHOW_GBOOK_LEAV=0&SELL_AMT_NM=%E5%9C%98%E8%B2%BB%E5%94%AE%E5%83%B9&RQ_WORD2=%E5%80%99%E8%A3%9C" \
    --compressed | iconv -f big5 -t utf8 > $1.xml

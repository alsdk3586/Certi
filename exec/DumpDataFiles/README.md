# 자격증 DB 구축을 위한 OPEN API 정리

> 사용한 정부 API

#### 공공데이터 포털: 한국 산업인력 공단 자격증 Open API

- https://www.notion.so/API-8199e53457ad4ae5941fafcf51b51174#c17254ffeaf842489485835728b8c8ef
- https://www.notion.so/API-8199e53457ad4ae5941fafcf51b51174#0062f18a2cbf4c6686fefbe7b1cfca37
- https://www.notion.so/API-8199e53457ad4ae5941fafcf51b51174#f8f88b5bfae74be6bb6048147c42cacb

### certifiacate data load

```python
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element, dump

# 한국산업인력공단_국가자격취득자 현황 조회 서비스
# T: 3408개 for pageNo in range(1, 70)
# C: 677개 for pageNo in range(1, 15):
# W: 295개 for pageNo in range(1, 7):

# 테스트

certificates = []
check = []
# 자격구분 코드로 인한 idx 3회 순환.
for idx in range(3):
    print("한 자격구분 코드 완료")
    if idx == 0:
        qualgbCd = "T"
        for pageNo in range(1, 70):
            url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy=2021&qualgbCd={}&serviceKey=".format(pageNo, qualgbCd)
            key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
            url += key
            response = requests.get(url).content
            soup = BeautifulSoup(response, 'html.parser')
            doc = ET.fromstring(str(soup))
            iter_elem = doc.iter(tag="item")
            for elem in iter_elem:
                certificate = {}
                check_cd = elem.find('jmcd').text
                if check_cd in check:
                    continue
                check.append(check_cd)
                certificate['jmcd'] = elem.find('jmcd').text
                certificate['jmnm'] = elem.find('jmnm').text
                certificate['qualgbcd'] = elem.find('qualgbcd').text
                certificate['qualgbnm'] = elem.find('qualgbnm').text
                certificates.append(certificate)
    elif idx == 1:
        qualgbCd = "C"
        for pageNo in range(1, 15):
            url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy=2021&qualgbCd={}&serviceKey=".format(pageNo, qualgbCd)
            key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
            url += key
            response = requests.get(url).content
            soup = BeautifulSoup(response, 'html.parser')
            doc = ET.fromstring(str(soup))
            iter_elem = doc.iter(tag="item")
            for elem in iter_elem:
                certificate = {}
                check_cd = elem.find('jmcd').text
                if check_cd in check:
                    continue
                check.append(check_cd)
                certificate['jmcd'] = elem.find('jmcd').text
                certificate['jmnm'] = elem.find('jmnm').text
                certificate['qualgbcd'] = elem.find('qualgbcd').text
                certificate['qualgbnm'] = elem.find('qualgbnm').text
                certificates.append(certificate)
    elif idx == 2:
        qualgbCd = "W"
        for pageNo in range(1, 7):
            url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy=2021&qualgbCd={}&serviceKey=".format(pageNo, qualgbCd)
            key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
            url += key
            response = requests.get(url).content
            soup = BeautifulSoup(response, 'html.parser')
            doc = ET.fromstring(str(soup))
            iter_elem = doc.iter(tag="item")
            for elem in iter_elem:
                certificate = {}
                check_cd = elem.find('jmcd').text
                if check_cd in check:
                    continue
                check.append(check_cd)
                certificate['jmcd'] = elem.find('jmcd').text
                certificate['jmnm'] = elem.find('jmnm').text
                certificate['qualgbcd'] = elem.find('qualgbcd').text
                certificate['qualgbnm'] = elem.find('qualgbnm').text
                certificates.append(certificate)
# sql문 저장
f = open('certificate.sql', 'w', encoding='utf8')
for certificate in certificates:
    s = "insert into certificate values ("
    for value in certificate.values():
        s += "'"+value.strip()+"', "
    s = s.rstrip(', ')
    s += ");\n"
    f.write(s)
f.close()
```



### Statistics Data load

```python
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element, dump

# 한국산업인력공단_국가자격취득자 현황 조회 서비스
# T: 3408개 for pageNo in range(1, 70)
# C: 677개 for pageNo in range(1, 15):
# W: 295개 for pageNo in range(1, 7):

# 테스트

statistics = [] # statistics table에 담을 data

# 자격구분 코드로 인한 idx 3회 순환.
for idx in range(3):
    print("한 자격구분 코드 완료")
    # 자격구분 코드 T
    if idx == 0:
        qualgbCd = "T"
        for pageNo in range(1, 70):

            url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy=2021&qualgbCd={}&serviceKey=".format(pageNo, qualgbCd)
            key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
            url += key

            response = requests.get(url).content
            soup = BeautifulSoup(response, 'html.parser')
            doc = ET.fromstring(str(soup))
            iter_elem = doc.iter(tag="item")

            for elem in iter_elem:
                statistic = {}

                # 데이터 리스트에 담기.
                statistic['jmcd'] = elem.find('jmcd').text
                statistic['agegrupcd'] = elem.find('agegrupcd').text
                statistic['agegrupnm'] = elem.find('agegrupnm').text
                statistic['gendercd'] = elem.find('gendercd').text
                statistic['gendernm'] = elem.find('gendernm').text
                statistic['acqucnt'] = elem.find('acqucnt').text
                statistics.append(statistic)
    # 자격 구분 코드 C
    elif idx == 1:
        qualgbCd = "C"
        for pageNo in range(1, 15):
            url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy=2021&qualgbCd={}&serviceKey=".format(pageNo, qualgbCd)
            key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
            url += key
            response = requests.get(url).content
            soup = BeautifulSoup(response, 'html.parser')
            doc = ET.fromstring(str(soup))
            iter_elem = doc.iter(tag="item")
            for elem in iter_elem:
                statistic = {}

                # 데이터 리스트에 담기.
                statistic['jmcd'] = elem.find('jmcd').text
                statistic['agegrupcd'] = elem.find('agegrupcd').text
                statistic['agegrupnm'] = elem.find('agegrupnm').text
                statistic['gendercd'] = elem.find('gendercd').text
                statistic['gendernm'] = elem.find('gendernm').text
                statistic['acqucnt'] = elem.find('acqucnt').text
                statistics.append(statistic)
    # 자격 구분 코드 W
    elif idx == 2:
        qualgbCd = "W"
        for pageNo in range(1, 7):
            url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy=2021&qualgbCd={}&serviceKey=".format(pageNo, qualgbCd)
            key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
            url += key
            response = requests.get(url).content
            soup = BeautifulSoup(response, 'html.parser')
            doc = ET.fromstring(str(soup))
            iter_elem = doc.iter(tag="item")
            for elem in iter_elem:
                statistic = {}

                # 데이터 리스트에 담기.
                statistic['jmcd'] = elem.find('jmcd').text
                statistic['agegrupcd'] = elem.find('agegrupcd').text
                statistic['agegrupnm'] = elem.find('agegrupnm').text
                statistic['gendercd'] = elem.find('gendercd').text
                statistic['gendernm'] = elem.find('gendernm').text
                statistic['acqucnt'] = elem.find('acqucnt').text
                statistics.append(statistic)

# sql문 저장
f = open('statistic.sql', 'w', encoding='utf8')
for statistic in statistics:
    s = "insert into statistics (certificate_code, statistic_age_code, statistic_age, statistic_gender_code, statistic_gender, statistic_get_number) values ("
    for value in statistic.values():
        s += "'"+value.strip()+"', "
    s = s.rstrip(', ')
    s += ");\n"
    f.write(s)
f.close()
```



### Statistics Data load2

```python
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element, dump

# 한국산업인력공단_국가자격취득자 현황 조회 서비스
# T: 3408개 for pageNo in range(1, 70)
# C: 677개 for pageNo in range(1, 15):
# W: 295개 for pageNo in range(1, 7):

# 없는 종목코드 데이터 삽입 방지
# csv 파일 읽기
import csv

check = []
with open('certificate.csv', 'r', encoding='utf-8') as f:
    rdr = csv.reader(f)
    for certi_code in rdr:
        check = certi_code

statistics = {} # statistics table에 담을 data

# 자격구분 코드로 인한 idx 3회 순환.
for year in range(2016, 2021):
    for idx in range(3):
        print("한 자격구분 코드 완료")
        # 자격구분 코드 T
        if idx == 0:
            qualgbCd = "T"
            for pageNo in range(1, 70):
            # for pageNo in range(1, 3):
                url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy={}&qualgbCd={}&serviceKey=".format(pageNo, year, qualgbCd)
                key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
                url += key

                response = requests.get(url).content
                soup = BeautifulSoup(response, 'html.parser')
                doc = ET.fromstring(str(soup))
                iter_elem = doc.iter(tag="item")

                for elem in iter_elem:
                    statistic = {}
                    check_cd = elem.find('jmcd').text
                    if check_cd not in check:
                        continue
                    # 데이터 리스트에 담기.
                    agegrupcd = elem.find('agegrupcd').text
                    gendercd = elem.find('gendercd').text
                    if check_cd+agegrupcd+gendercd in statistics:
                        statistics[check_cd+agegrupcd+gendercd]['acqucnt'] += int(elem.find('acqucnt').text)
                    else:
                        statistic['agegrupnm'] = elem.find('agegrupnm').text
                        statistic['gendernm'] = elem.find('gendernm').text
                        statistic['acqucnt'] = int(elem.find('acqucnt').text)
                        statistic['jmcd'] = elem.find('jmcd').text
                        statistics[check_cd+agegrupcd+gendercd] = (statistic)
        # 자격 구분 코드 C
        elif idx == 1:
            qualgbCd = "C"
            for pageNo in range(1, 15):
            # for pageNo in range(1, 3):
                url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy=2021&qualgbCd={}&serviceKey=".format(pageNo, qualgbCd)
                key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
                url += key

                response = requests.get(url).content
                soup = BeautifulSoup(response, 'html.parser')
                doc = ET.fromstring(str(soup))
                iter_elem = doc.iter(tag="item")
                for elem in iter_elem:
                    statistic = {}
                    check_cd = elem.find('jmcd').text
                    if check_cd not in check:
                        continue
                    # 데이터 리스트에 담기.
                    agegrupcd = elem.find('agegrupcd').text
                    gendercd = elem.find('gendercd').text
                    if check_cd+agegrupcd+gendercd in statistics:
                        statistics[check_cd+agegrupcd+gendercd]['acqucnt'] += int(elem.find('acqucnt').text)
                    else:
                        statistic['agegrupnm'] = elem.find('agegrupnm').text
                        statistic['gendernm'] = elem.find('gendernm').text
                        statistic['acqucnt'] = int(elem.find('acqucnt').text)
                        statistic['jmcd'] = elem.find('jmcd').text
                        statistics[check_cd+agegrupcd+gendercd] = (statistic)
        # 자격 구분 코드 W
        elif idx == 2:
            qualgbCd = "W"
            for pageNo in range(1, 7):
            # for pageNo in range(1, 3):
                url = "http://apis.data.go.kr/B490007/qualAcquPtcond/getQualAcquPtcond?numOfRows=50&pageNo={}&dataFormat=xml&acquYy=2021&qualgbCd={}&serviceKey=".format(pageNo, qualgbCd)
                key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
                url += key

                response = requests.get(url).content
                soup = BeautifulSoup(response, 'html.parser')
                doc = ET.fromstring(str(soup))
                iter_elem = doc.iter(tag="item")
                for elem in iter_elem:
                    statistic = {}
                    check_cd = elem.find('jmcd').text
                    if check_cd not in check:
                        continue
                    # 데이터 리스트에 담기.
                    agegrupcd = elem.find('agegrupcd').text
                    gendercd = elem.find('gendercd').text
                    if check_cd+agegrupcd+gendercd in statistics:
                        statistics[check_cd+agegrupcd+gendercd]['acqucnt'] += int(elem.find('acqucnt').text)
                    else:
                        statistic['agegrupnm'] = elem.find('agegrupnm').text
                        statistic['gendernm'] = elem.find('gendernm').text
                        statistic['acqucnt'] = int(elem.find('acqucnt').text)
                        statistic['jmcd'] = elem.find('jmcd').text
                        statistics[check_cd+agegrupcd+gendercd] = (statistic)

# 남성과 여성 성별 숫자 따로 총합 내기.
statistics_list = [st for st in statistics.values()]
new_statistics_dictionary = dict()
for statistic in statistics_list:
    jmcd = statistic['jmcd']
    agegrupnm = statistic['agegrupnm']
    gendernm = statistic['gendernm']
    acqucnt = statistic['acqucnt']
    if agegrupnm == '80대' or agegrupnm == '90대' or agegrupnm == '100대': continue
    if jmcd in new_statistics_dictionary:
        new_statistics_dictionary[jmcd][gendernm] += acqucnt
        new_statistics_dictionary[jmcd][agegrupnm] += acqucnt
    else:
        if gendernm == '남성':
            new_statistics_dictionary[jmcd] = {'50대': 0, '40대': 0, '남성': acqucnt, '70대': 0, '60대': 0, '10대': 0, '30대':0, '20대': 0, '여성': 0, 'jmcd': jmcd}
        elif gendernm == '여성':
            new_statistics_dictionary[jmcd] = {'50대': 0, '40대': 0, '남성': 0, '70대': 0, '60대': 0, '10대': 0,
                                               '30대': 0, '20대': 0, '여성': acqucnt, 'jmcd': jmcd}

final_statistic = [value for value in new_statistics_dictionary.values()]

# sql문 저장
f = open('statistic.sql', 'w', encoding='utf8')
for statistic in final_statistic:
    s = "insert into statistics (fifty, fourty, statistic_man, seventy, sixty, teen, thirty, twenty, statistic_women, certificate_code) values ("
    for value in statistic.values():
        if type(value) == int:
            value = str(value)
        s += "'"+value.strip()+"', "
    s = s.rstrip(', ')
    s += ");\n"
    f.write(s)
f.close()
```



### AcceptanceRate Data load

```python
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element, dump

# 없는 종목코드 데이터 삽입 방지
# csv 파일 읽기
import csv

check = []
with open('certificate.csv', 'r', encoding='utf-8') as f:
    rdr = csv.reader(f)
    for certi_code in rdr:
        check = certi_code

datas = [] # statistics table에 담을 data

for pageNo in range(1, 55):
    url = "http://openapi.q-net.or.kr/api/service/rest/InquiryAcquStatisSVC/getEuhistList?numOfRows=50&pageNo={}&baseYY=2020&ServiceKey=".format(pageNo)
    key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
    url += key

    response = requests.get(url).content
    soup = BeautifulSoup(response, 'html.parser')
    doc = ET.fromstring(str(soup))
    iter_elem = doc.iter(tag="item")

    # 경과체크
    cnt = 0
    for elem in iter_elem:
        cnt +=1
        if (cnt%10) == 0: print("진행중.")
        data = {}
        check_cd = elem.find('jmcd').text
        if check_cd not in check:
            continue
        # 데이터 리스트에 담기.
        data['pilpassrate'] = elem.find('pilpassrate').text
        data['silpassrate'] = elem.find('silpassrate').text
        data['lastrsltpassrate'] = elem.find('lastrsltpassrate').text
        data['statisyy'] = elem.find('statisyy').text
        data['jmcd'] = elem.find('jmcd').text

        datas.append(data)

# sql문 저장
f = open('Acceptancerate.sql', 'w', encoding='utf8')
for data in datas:
    s = "insert into acceptance_rate (acceptance_rate_doc, acceptance_rate_prac, acceptance_rate_result, acceptance_stat_date, certificate_code) values ("
    for value in data.values():
        s += "'"+value.strip()+"', "
    s = s.rstrip(', ')
    s += ");\n"
    f.write(s)
f.close()
```



#### schedule data load

```python
import requests
from bs4 import BeautifulSoup
import xml.etree.ElementTree as ET
from xml.etree.ElementTree import Element, dump

# 없는 종목코드 데이터 삽입 방지
# csv 파일 읽기
import csv

check = []
with open('certificate.csv', 'r', encoding='utf-8') as f:
    rdr = csv.reader(f)
    for certi_code in rdr:
        check = certi_code

datas = [] # statistics table에 담을 data

for jmCd in check:
    url = "http://apis.data.go.kr/B490007/qualExamSchd/getQualExamSchdList?numOfRows=50&pageNo=1&dataFormat=xml&implYy=2021&jmCd={}&ServiceKey=".format(jmCd)
    key = "pg48D3FYflY8PkE9Vhd%2FkHGfCpn6iggpyOE7SJfTfGmA%2Bjw%2FpOka%2B0o2gw6CWR0XvRmCi62UbbJfxqQ8UDBCEQ%3D%3D"
    url += key

    response = requests.get(url).content
    soup = BeautifulSoup(response, 'html.parser')
    doc = ET.fromstring(str(soup))
    iter_elem = doc.iter(tag="item")

    # 경과체크
    cnt = 0
    for elem in iter_elem:
        cnt +=1
        if (cnt%2) == 0: print("진행중.")

        data = {}

        # 데이터 리스트에 담기.
        if elem.find('docexamenddt').text == None:
            temp = '00000000'
            data['docexamenddt'] = temp
        else:
            data['docexamenddt'] = elem.find('docexamenddt').text
        if elem.find('docexamstartdt').text == None:
            temp = '00000000'
            data['docexamstartdt'] = temp
        else:
            data['docexamstartdt'] = elem.find('docexamstartdt').text
        if elem.find('docpassdt').text == None:
            temp = '00000000'
            data['docpassdt'] = temp
        else:
            data['docpassdt'] = elem.find('docpassdt').text
        if elem.find('docregenddt').text == None:
            temp = '00000000'
            data['docregenddt'] = temp
        else:
            data['docregenddt'] = elem.find('docregenddt').text
        if elem.find('docregstartdt').text == None:
            temp = '00000000'
            data['docregstartdt'] = temp
        else:
            data['docregstartdt'] = elem.find('docregstartdt').text

        data['implseq'] = elem.find('implseq').text
        data['implyy'] = elem.find('implyy').text
        data['pracexamenddt'] = elem.find('pracexamenddt').text
        data['pracexamstartdt'] = elem.find('pracexamstartdt').text
        data['pracpassdt'] = elem.find('pracpassdt').text
        data['pracregenddt'] = elem.find('pracregenddt').text
        data['pracregstartdt'] = elem.find('pracregstartdt').text
        data['jmcd'] = jmCd
        if None in data.values():
            continue
        datas.append(data)

# sql문 저장
f = open('schedule.sql', 'w', encoding='utf8')
for data in datas:
    s = "insert into schedule (schedule_doc_exam_end_dt, schedule_doc_exam_start_dt, schedule_doc_pass_dt, schedule_doc_reg_end_dt, schedule_doc_reg_start_dt, \
    schedule_impl_seq, schedule_impl_year, schedule_prac_exam_end_dt, schedule_prac_exam_start_dt, schedule_prac_pass_dt, schedule_prac_reg_end_dt, \
    schedule_prac_reg_start_dt, certificate_code) values ("
    for value in data.values():
        s += "'"+value.strip()+"', "
    s = s.rstrip(', ')
    s += ");\n"
    f.write(s)
f.close()
```


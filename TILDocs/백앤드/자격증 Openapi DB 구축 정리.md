# 자격증 DB 구축을 위한 OPEN API 정리



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

certificates = [] # certificate table에 담을 data
check = [] # certificate table data 중복 방지

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
                certificate = {}
                # 중복데이터 방지
                check_cd = elem.find('jmcd').text
                if check_cd in check:
                    continue
                check.append(check_cd)
                # 데이터 리스트에 담기.
                certificate['jmcd'] = elem.find('jmcd').text
                certificate['jmnm'] = elem.find('jmnm').text
                certificate['qualgbcd'] = elem.find('qualgbcd').text
                certificate['qualgbnm'] = elem.find('qualgbnm').text
                certificates.append(certificate)
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

# # certificate code 리스트 저장(없는 데이터 삽입 방지)
# import csv
#
# # csv파일로 적기
# #  newline 설정을 안하면 한줄마다 공백있는 줄이 생긴다.
# with open('certificate.csv', 'w', newline='') as f:
#     writer = csv.writer(f)
#     writer.writerow(check)

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



### certificate table DDL

```sql
CREATE TABLE certificate (
	certificate_code int not null,
    certificate_name varchar(20),
    certificate_classification_code varchar(20),
    certificate_classification_name varchar(20),
    PRIMARY KEY(certificate_code)
);
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

# 없는 종목코드 데이터 삽입 방지
# csv 파일 읽기
import csv

check = []
with open('certificate.csv', 'r', encoding='utf-8') as f:
    rdr = csv.reader(f)
    for certi_code in rdr:
        check = certi_code

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
                check_cd = elem.find('jmcd').text
                if check_cd not in check:
                    print(check_cd)
                    continue
                # 데이터 리스트에 담기.
                statistic['agegrupcd'] = elem.find('agegrupcd').text
                statistic['agegrupnm'] = elem.find('agegrupnm').text
                statistic['gendercd'] = elem.find('gendercd').text
                statistic['gendernm'] = elem.find('gendernm').text
                statistic['acqucnt'] = elem.find('acqucnt').text
                statistic['jmcd'] = elem.find('jmcd').text
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
                check_cd = elem.find('jmcd').text
                if check_cd not in check:
                    continue
                # 데이터 리스트에 담기.
                statistic['agegrupcd'] = elem.find('agegrupcd').text
                statistic['agegrupnm'] = elem.find('agegrupnm').text
                statistic['gendercd'] = elem.find('gendercd').text
                statistic['gendernm'] = elem.find('gendernm').text
                statistic['acqucnt'] = elem.find('acqucnt').text
                statistic['jmcd'] = elem.find('jmcd').text
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
                check_cd = elem.find('jmcd').text
                if check_cd not in check:
                    continue
                # 데이터 리스트에 담기.
                statistic['agegrupcd'] = elem.find('agegrupcd').text
                statistic['agegrupnm'] = elem.find('agegrupnm').text
                statistic['gendercd'] = elem.find('gendercd').text
                statistic['gendernm'] = elem.find('gendernm').text
                statistic['acqucnt'] = elem.find('acqucnt').text
                statistic['jmcd'] = elem.find('jmcd').text
                statistics.append(statistic)

# sql문 저장
f = open('statistic.sql', 'w', encoding='utf8')
for statistic in statistics:
    s = "insert into statistics (statistic_age_code, statistic_age, statistic_gender_code, statistic_gender, statistic_get_number, certificate_code) values ("
    for value in statistic.values():
        s += "'"+value.strip()+"', "
    s = s.rstrip(', ')
    s += ");\n"
    f.write(s)
f.close()

```



### Statistics DDL

```sql
use certi;
CREATE TABLE statistics (
	statistic_id int NOT NULL auto_increment,
	certificate_code varchar(10),
    statistic_age_code int,
    statistic_age varchar(10),
    statistic_gender_code varchar(10),
    statistic_gender varchar(10),
    statistic_get_number int,
	PRIMARY KEY (statistic_id),
    FOREIGN KEY (certificate_code) references certificate(certificate_code)
);

# 외래키 조회문
SELECT * FROM certi.statistics st, certi.certificate ct where st.certificate_code = ct.certificate_code;
```


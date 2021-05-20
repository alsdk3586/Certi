<h1 align="center">자격증 닷컴</h1>
<p>
</p>

> 자격증 정보를 캘린더 형식으로 한 눈에 볼 수 있는 서비스. 일정 조회부터 관리까지!

`개발환경: React.js, JavaSpring JPA, MySQL`
<br />
<img src="https://img.shields.io/static/v1?label=SSAFY&message=4%EA%B8%B0&color=ff69b4">
<img src="https://img.shields.io/static/v1?label=서울&message=4반&color=violet">
<img src="https://img.shields.io/static/v1?label=Domain&message=자율&color=blueviolet">
</p>

🧙‍♂️만든사람들

## SSAFY 4기 서울 4반 A407팀

### 팀명  

**럭키세븐 팀**

### 팀원

이형창(팀장), 조성국(팀원), 김지영(팀원), 김혜민(팀원)

---

## 목차

- **Install and Usage**

- [기획배경](#기획배경)
- [기획](#기획)
  - 와이어프레임
  - UI디자인
  - ERD
- [주요기능](#주요기능)
- [기술스택](#기술스택)
- [개발환경](#개발환경)
  - Git flow 전략
  - 컨벤션

---

## Install and Usage

> `git clone`을 한 후 `Frontend`와 `Backend`에서 아래와 같은 설정을 해주셔야 합니다.

#### 1. Frontend

```bash
$ yarn install
$ yarn start
```

#### 2. Backend

- `Spring IDE`(ex. IntelliJ, sts, etc.)에 Backned 폴더를 프로젝트 Import.
- `Gradle build`

---

# 🍓기획배경

![image-20210520121730556](README.assets/image-20210520121730556.png)
![image-20210520121745158](README.assets/image-20210520121745158.png)

- 위의 문제로 사이트의 메인페이지인 `자격증 캘린더`를 통해 일정관리 및 상세 정보 확인을 가능하게 해준다.
- 사용자 중심의 UI 디자인으로 자격증 정보를 쉽게 확인하게 해준다.

# 🍊기획

## 와이어프레임

> [🔗Figma에서 보기](https://www.figma.com/file/SyjKaPQNXZEOdaoHayQThk/%EC%9E%90%EA%B2%A9%EC%A6%9D%EB%8B%B7%EC%BB%B4?node-id=0%3A1)

- 아래와 같이 개발 전 화면 정의서(와이어프레임)을 만들어 봤습니다.

#### 메엔 페이지 및 자격증 상세 모달

![image-20210520122026723](README.assets/image-20210520122026723.png)

#### 채팅

![image-20210520122240706](README.assets/image-20210520122240706.png)

- 그 외 기타 페이지는 아래 실화면에서 확인 가능.

## ERD

> [🔗ERDCloud에서 보기](https://www.erdcloud.com/d/iy4qEBaXCphs8ptRG)

- DB 구축을 위한 ERD도 짜 보았습니다.

#### 전체 ERD

![image-20210520122340541](README.assets/image-20210520122340541.png)

#### 자격증 ERD 

![image-20210520122502193](README.assets/image-20210520122502193.png)

## 기능명세서

> 🔗[Google Spreadsheet 에서 보기](https://docs.google.com/spreadsheets/d/1-JvruJtCtgnynP956Kfkmnfya6Jk7fHmF1j6riF0mhc/edit?ts=60767b7e#gid=0)

- 개발하기 앞서 개발할 기능 목록을 모두 정리하는 작업도 시행했습니다.

![image-20210520122933200](README.assets/image-20210520122933200.png)

# 🍋주요기능

### 0. 들어가는 페이지

- 사용자 첫 화면은 홈페이지에 대한 설명과 로그인을 할 수 있는 페이지를 띄어줌.
  - 사용자 편의를 위한 홈페이지에 대한 설명
  - 첫 들어가기 페이지에서 바로 로그인 가능.

![image-20210520123242090](README.assets/image-20210520123242090.png)

### 1. 캘린더를 통한 일정관리

- 메인화면
  - 전체 자격증 일정 정보를 캘린더 형식으로 한눈에 확인 가능
  - 검색기능으로 원하는 자격증 조회 가능.

![image-20210520123131135](README.assets/image-20210520123131135.png)

### 2. 자격증 상세 정보 조회

- 자격증에 대한 상세정보 조회 가능
  - 해당 자격증의 기본적인 정보(원서 접수일, 시험일 등) 조회 가능
  - 합격률 통계정보 조회 가능
  - 연령별 및 성별 지원자 수와 취득자 수 통계정보 조회 가능
  - 해당 자격증 즐겨찾기 가능.

![image-20210520123538063](README.assets/image-20210520123538063.png)

### 3. 자격증 커뮤니티 게시판

- 자격증별 스터디 모집이나 정보 공유 등을 위한 게시판 구현
- 상단 탭 이동으로 편하게 게시판 분류 가능

![image-20210520123719143](README.assets/image-20210520123719143.png)

### 4. 자격증 별 채팅방 및 채팅기능

- 자격증별로 채팅방을 구성해 해당 자격증에 대한 자유로운 이야기를 나눌 수 있게 구현
- Socket을 이용한 채팅기능과 채팅 정보 저장 및 관리 가능.

![image-20210520123955640](README.assets/image-20210520123955640.png)

# 🍏기술스택

- Frontend
  - React.js
  - Socket를 이용한 채팅
- Backend
  - JavaSpring JPA
- DB
  - MySQL

# 🍇개발 Convetention

> [📓git flow 전략](https://www.notion.so/Git-flow-60ffe0684268485e82993a35ae8ee679)  
> [📕git 컨벤션](https://www.notion.so/Git-735deb09e4364ee397d9ea834c4aec70)  
> [🐘java 컨벤션](https://www.notion.so/java-79a0e9905b154bb38d1c14a82af26d67)
> [📌React 컨벤션](https://www.notion.so/React-1c53910e9520467aa9e3215f9d684d3d)



### 배포 URL

- 미정.
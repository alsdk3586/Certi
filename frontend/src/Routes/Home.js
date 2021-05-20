// export default () => "Home";
import './style.min.css';
import { Link } from "react-router-dom"

export default () => {
  return (
    <>
      <div id="main" class="section">
      {/* <img class="main__image animated fadeInUp" src="https://studiomate.kr/img/illust_main.png" srcset="img/illust_main/illust_main_372.png 372w,
              https://studiomate.kr/img/illust_main/illust_main_560.png 560w,
              https://studiomate.kr/img/illust_main/illust_main_768.png 768w,
              https://studiomate.kr/img/illust_main/illust_main_992.png 992w,
            https://studiomate.kr/img/illust_main/illust_main_1170.png 1170w" alt="스튜디오메이트 서비스 이미지" /> */}
        <div class="main__content animated fadeInUp">
            <img class="main__image animated fadeInUp" src="https://studiomate.kr/img/illust_sub_2.png" srcset="https://studiomate.kr/img/illust_sub_2/illust_sub_2_372.png 372w,
                    https://studiomate.kr/img/illust_sub_2/illust_sub_2_560.png 560w,
                    https://studiomate.kr/img/illust_sub_2/illust_sub_2_768.png 768w,
                    https://studiomate.kr/img/illust_sub_2/illust_sub_2_992.png 992w" alt="일러스트_해결" />
        
          <div class="main__content__wrapper">
            <h1 class="main__content__title">
              <span>당신의 가치를</span>
              <span>더 높은 단계로 이끌어줄</span>
              <b>자격증 관리 서비스</b>
            </h1>

            <p class="main__content__mission">
              이제 자격증 일정 관리는 자격증닷컴과 함께하세요.
            </p>
            <Link to ='/login' class="button">
              로그인하기
            </Link>
          </div>
        </div>
      </div>

      <div id="about" class="section mt-20">

        <div class="about__content">
          <div class="about__content__wrapper">
            <h1 class="about__content__title">
              <span>이런 문제들로</span>
              <span><b>불편</b>했던 적이 있다면?</span>
            </h1>
            <p class="about__content__description">
              이런 문제들로 고민했던 적이 있다면?<br />
              자격증닷컴이 해결해 드리겠습니다!
            </p>
          </div>
          <div class="about__content__cards">
            <div class="about__content__card">
              <img src="https://studiomate.kr/img/card_number_1.png" alt="01번" />
              <p>자격증 시험 신청 일정을</p>
              <p>자주 잊어버려 타이밍을 놓치거나</p>
            </div>
            <div class="about__content__card">
              <img src="https://studiomate.kr/img/card_number_2.png" alt="02번" />
              <p>필기 원서 접수부터 시험일과 시험 발표일,</p>
              <p>실기 시험 일정까지 모두 보고 싶을 때</p>
            </div>
            <div class="about__content__card">
              <img src="https://studiomate.kr/img/card_number_3.png" alt="03번" />
              <p>같은 자격증을 준비하는 사람들과</p>
              <p>소통하며 정보를 공유하고 싶을 때</p>
            </div>
          </div>
        </div>
      </div>

      <div id="service" class="section">

        <div class="service__content flex-row">
          <img class="service__image" src="https://studiomate.kr/img/illust_sub_3.png" alt="일러스트" />
          <div class="service__content__inner d-flex flex-column">
            <h1 class="service__content__title">
              자격증닷컴
            </h1>
            <div class="service__content__description">
              <p>자격증에 대한 모든 것</p>
              <p>접수 일정, 합격 발표일에 대한 일정 캘린더 기능</p>
              <p>관심 자격증 등록하면 일정을 알려주는</p>
              <p>서비스 입니다.</p>
            </div>

            <div class="service__content__advantages">
              <h5>장점</h5>
              <ul>
                <li class="number1">모든 자격증 일정 관리 편의성 증대</li>
                <li class="number2">관심 자격증 일정 알림 서비스</li>
                <li class="number3">자격증 정보 공유 채팅 서비스</li>
              </ul>
            </div>

            {/* <div class="service__content__advantages">
              <h5>회원</h5>
              <ul>
                <li class="number1">수업예약 편리성</li>
                <li class="number2">내 회원권 관리</li>
                <li class="number3">시설과 강사에 대한 정보 접근 용이</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
      <div id="contact" class="section">
        <div class="contact__contact">
          <div class="contact__contact__info">
            <p>자격증닷컴</p>
            <p>
              <span> </span>
              <span>
                팀원 소개
              </span>
            </p>

            <p>팀장</p>
            <p>이형창</p>

            <p>팀원</p>
            <p>김혜민</p>

            <p>팀원</p>
            <p>김지영</p>

            <p>팀원</p>
            <p>조성국</p>

          </div>

          <div class="contact__contact__policy-links">
            <a href="./terms-of-service.html" target="_blank" rel="noopener noreferrer">
              이용약관
            </a>
            <a href="./privacy-policy.html" target="_blank" rel="noopener noreferrer">
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>

    </>
  );
}
package com.ssafy.certi.controller;

import com.ssafy.certi.domain.*;
import com.ssafy.certi.repository.AcceptanceRateRepository;
import com.ssafy.certi.repository.CertificateRepository;
import com.ssafy.certi.repository.ScheduleRepository;
import com.ssafy.certi.repository.StatisticsRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Api(tags = {"2. Certificate"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/certificate")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private AcceptanceRateRepository acceptanceRateRepository;
    @Autowired
    private StatisticsRepository statisticsRepository;

    @ApiOperation(value = "자격증 전체 리스트", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/list")
    public ResponseEntity<List<Certificate>> certificateAllList() {

        try {
            List<Certificate> certificateList=certificateRepository.findAll();
            return new ResponseEntity<>(certificateList, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            List<Certificate> box = null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    // 메인 캘린더 자격증 일정 정보
    @ApiOperation(value = "캘린더 자격증 일정", notes = "캘린더 메인페이지 일정 등록을 위한 데이터 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/schedule")
    public ResponseEntity<List<Schedule>> scheduleAll() {

        try { // schedule 자격증 데이터 모두 반환
            List<Schedule> scheduleList=scheduleRepository.findAll();
            return new ResponseEntity<>(scheduleList, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            List<Schedule> box = null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    // 캘린더 자격증 상세 정보 조회
    // DTO로 변환 필요.(일단 실패해서,, 보류.)
    // 합격률 통계 상세정보 반환
    @ApiOperation(value = "자격증 상세정보 조회", notes = "자격증 상세정보 조회를 위한 특정 자격증 상세정보 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("acceptancerate/{certificateCode}")
    public ResponseEntity<List<AcceptanceRate>> certificateAcceptanceRateDetail(@PathVariable String certificateCode) {
        try {
            List<AcceptanceRate> result=acceptanceRateRepository.findByCertificateCodeCertificateCode(certificateCode);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            List<AcceptanceRate> box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    // 연령대, 성별, 취득자 수 상세정보 반환
    @ApiOperation(value = "자격증 상세정보 조회", notes = "자격증 상세정보 조회를 위한 특정 자격증 상세정보 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("statistics/{certificateCode}")
    public ResponseEntity<List<Statistics>> certificateStatisticsDetail(@PathVariable String certificateCode) {
        try {
            List<Statistics> result=statisticsRepository.findByCertificateCodeCertificateCode(certificateCode);
            return new ResponseEntity<>(result, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            List<Statistics> box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    // 검색 기능
    @ApiOperation(value = "자격증 검색 기능", notes = "자격증의 이름을 검색하면 해당 자격증의 정보를 반환한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/search/{certificateClassificationCode}")
    public ResponseEntity<List<Certificate>> certificateSearch(@PathVariable String certificateClassificationCode) {
        try {
            // 자격증 이름을 대충 검색해도 전부 포함시켜서 나오도록 (Like 와이들카드)와 대소문자 구분 없이 하도록 하게끔 Jpa SQL Query를 짜줌.
            List<Certificate> result_sub=certificateRepository.findByCertificateClassificationCodeContainingIgnoreCase(certificateClassificationCode);

            // 배열 선언
            ArrayList list = new ArrayList();
            for (int i = 0; i < result_sub.size(); i++) {
                String certi = result_sub.get(i).getCertificateCode().toString();
                List<Schedule> schedule = scheduleRepository.findByCertificateCodeCertificateCode(certi);
                for (int j = 0; j < schedule.size(); j++) {
                    list.add(schedule.get(j));
                }
            }
            return new ResponseEntity<>(list, HttpStatus.OK);

        } catch (IllegalStateException e) {
            List<Certificate> box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }
        

    // 자격증 DB 테스트
    @ApiOperation(value = "자격증 DB 테스트", notes = "")
    @ApiResponses({
            @ApiResponse(code = 200, message = "데이터 입력 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @PostMapping("/test")
    public ResponseEntity<String> test(@ApiParam(value = "certificateCode, certificateName, certificateClassificationCode, certificateClassificationName", required = true) @RequestBody Map<String, String> certificate) {
        try {
            certificateRepository.save(Certificate.builder()
                    .certificateCode(certificate.get("certificateCode"))
                    .certificateName(certificate.get("certificateName"))
                    .certificateClassificationCode(certificate.get("certificateClassificationCode"))
                    .certificateClassificationName(certificate.get("certificateClassificationName"))
                    .build());

            return new ResponseEntity<>(certificate.get("certificateName"), HttpStatus.OK); // 자격증 입력 성송시 자격증 이름 반환

        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }
}

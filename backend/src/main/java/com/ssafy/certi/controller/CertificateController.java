package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Certificate;
import com.ssafy.certi.domain.Schedule;
import com.ssafy.certi.repository.CertificateRepository;
import com.ssafy.certi.repository.ScheduleRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@Api(tags = {"2. Certificate"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/certificate")
public class CertificateController {


    private CertificateRepository certificateRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;

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

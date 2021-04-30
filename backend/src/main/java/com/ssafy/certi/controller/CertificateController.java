package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Certificate;
import com.ssafy.certi.repository.CertificateRepository;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;


@Api(tags = {"2. Certificate"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/certificate")
public class CertificateController {
    private final CertificateRepository certificateRepository;
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

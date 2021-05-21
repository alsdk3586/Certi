package com.ssafy.certi.controller;


import com.ssafy.certi.domain.Certificate;
import com.ssafy.certi.domain.FavoriteList;
import com.ssafy.certi.domain.User;
import com.ssafy.certi.repository.CertificateRepository;
import com.ssafy.certi.repository.FavoriteListRepository;
import com.ssafy.certi.security.JwtTokenProvider;
import com.ssafy.certi.service.UserService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.spring.web.json.Json;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(tags = "4. FavoriteList")
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping("/favorite")
public class FavoriteController {

    @Autowired
    private FavoriteListRepository favoriteListRepository;

    @Autowired
    CertificateRepository certificateRepository;

    @Autowired
    UserService userService;
    private Map<String, String> favoriteList;
    private HttpServletRequest request;

    @ApiOperation(value="즐겨찾기 추가", notes = "")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @PostMapping("/create")
    public ResponseEntity<String> favoritePostAdd(@ApiParam(value = "certificateCode,a", required = true) @RequestBody Map<String, String> certificatecode, HttpServletRequest request) {
        try {
            User person = userService.findByToken(JwtTokenProvider.resolveToken(request));
            Certificate certificate = certificateRepository.findByCertificateCode(certificatecode.get("certificateCode"));
            // certificateCode null 값일 시 즐겨찾기에 추가 X
            if (certificate == null) {
//                throw new IllegalArgumentException("해당 자격증 코드는 null 값으로 즐겨찾기 추가 불가능");
                return new ResponseEntity<>("this certificate doenst have certificateInformation", HttpStatus.BAD_REQUEST);
            }
            // 해당 유저 즐겨찾기 목록에 이미 존재하는 certificatecode인지 검사.
            List<FavoriteList> favoritelist = favoriteListRepository.findByUserIdUserId(person.getUserId());

            ArrayList list = new ArrayList();
            for (int i = 0; i < favoritelist.size(); i++) {
                Object target = favoritelist.get(i).getCertificateCode();
                if (target != null) {
                    String finalTarget = favoritelist.get(i).getCertificateCode().getCertificateCode().toString();
                    list.add(finalTarget);
                }
            };
            // 이미 존재할 경우 추가 X
            if (list.contains(certificatecode.get("certificateCode"))) {
//                throw new IllegalArgumentException("이미 즐겨찾기 목록에 존재합니다.");
                return new ResponseEntity<>("This certificate already exists in your favoritelist", HttpStatus.BAD_REQUEST);
            } else {
                favoriteListRepository.save(FavoriteList.builder()
                        .userId(person)
                        .certificateCode(certificate)
                        .build());
                return new ResponseEntity<>("true", HttpStatus.OK);
            }
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value="즐겨찾기 조회", notes = "")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/")
    public ResponseEntity<List<FavoriteList>> favoriteListAll(HttpServletRequest request) {
        try {
            User person = userService.findByToken(JwtTokenProvider.resolveToken(request));
            List<FavoriteList> favoritelist = favoriteListRepository.findByUserIdUserId(person.getUserId());
            return new ResponseEntity<>(favoritelist, HttpStatus.OK);
        } catch (IllegalStateException e) {
            List<FavoriteList> box = null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }

    @ApiOperation(value = "즐겨찾기 삭제", notes = "성공 시, true 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "등록 성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    // delete를 위해선 Transactional annotation 필수.
    @Transactional
    @DeleteMapping("/delete/{certificateCode}")
    public ResponseEntity<FavoriteList> FavoriteListPostDelete(@PathVariable String certificateCode, HttpServletRequest request) {
        try {
            User person= userService.findByToken(JwtTokenProvider.resolveToken(request));
            List<FavoriteList> favoriteList=favoriteListRepository.findByCertificateCodeCertificateCode(certificateCode);
            for(int i=0;i<favoriteList.size();i++){
                if(person.getUserId()==favoriteList.get(i).getUserId().getUserId()){
                    favoriteListRepository.deleteByCertificateCodeCertificateCode(certificateCode);//즐겨찾기 완전 삭제
                }
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalStateException e) { // exception return 하게 수정
            FavoriteList box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }
}

package com.ssafy.certi.controller;


import com.ssafy.certi.domain.Board;
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
import org.springframework.beans.factory.annotation.Required;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
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
    @PostMapping("/create/{certificateCode}")
    public ResponseEntity<String> favoritePostAdd(@PathVariable String certificateCode, HttpServletRequest request) {
        try {
            User person = userService.findByToken(JwtTokenProvider.resolveToken(request));
            Certificate certificate = certificateRepository.findByCertificateCode(certificateCode);
            favoriteListRepository.save(FavoriteList.builder()
                .userId(person)
                .certificateCode(certificate)
                .build());
            return new ResponseEntity<>("true", HttpStatus.OK);
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
            FavoriteList favoriteList=favoriteListRepository.findByCertificateCodeCertificateCode(certificateCode);
            if(person.getUserId()==favoriteList.getUserId().getUserId()){
                favoriteListRepository.deleteByCertificateCodeCertificateCode(certificateCode);//즐겨찾기 완전 삭제
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (IllegalStateException e) { // exception return 하게 수정
            FavoriteList box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }
}

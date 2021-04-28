package com.ssafy.certi.controller;

import com.ssafy.certi.domain.User;
import com.ssafy.certi.repository.UserRepository;
import com.ssafy.certi.security.JwtTokenProvider;
import com.ssafy.certi.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Api(tags = {"1. User"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    // 기본형
    @Autowired
    UserService userService;

    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;


    // 회원 가입
    @ApiOperation(value = "회원가입", notes = "회원가입")
    @PostMapping("/join")
    public ResponseEntity<String> join(@ApiParam(value = "userEmail, userPassword, userNickname", required = true) @RequestBody Map<String, String> user) {
        try {
            userService.validateDuplicateUserNick(user.get("userNickname"));
            userService.validateDuplicateUserEmail(user.get("userEmail"));
            userRepository.save(User.builder()
                    .userEmail(user.get("userEmail"))
                    .userPassword(passwordEncoder.encode(user.get("userPassword")))
                    .userNickname(user.get("userNickname"))
                    .build());

            return new ResponseEntity<>(user.get("userNickname"), HttpStatus.OK);

        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }


    // 로그인
    @ApiOperation(value = "로그인", notes = "로그인")
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login
    (@ApiParam(value = "userEmail, userPassword", required = true) @RequestBody Map<String, String> user) {
        Map<String, Object> response = new HashMap<>();
        HttpStatus status;
        try {
            User curUser = userRepository.findByUserEmail(user.get("userEmail"))
                    .orElseThrow(() -> new IllegalArgumentException("가입되지 않은 이메일 입니다."));
            if (!passwordEncoder.matches(user.get("userPassword"), curUser.getPassword())) {
                throw new IllegalArgumentException("잘못된 비밀번호입니다.");
            }
            response.put("token", jwtTokenProvider.createToken(curUser.getUsername()));
            status = HttpStatus.OK;

        } catch (Exception e) {
            response.put("message", e.toString());
            status = HttpStatus.NOT_ACCEPTABLE;
        }

        return new ResponseEntity<>(response, status);
    }


    // 토큰으로 회원조회
    @ApiOperation(value = "token으로 회원 정보 조회", notes = "token 필요")
    @GetMapping(value = "/token/mypage")
    public ResponseEntity<User> getUser(HttpServletRequest request) {
        Optional<User> user = Optional.ofNullable(userService.findByToken(JwtTokenProvider.resolveToken(request)));
        return user
                .map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }


    // 회원 정보 수정
    @ApiOperation(value = "회원 정보 변경", notes = "token 필요")
    @PutMapping(value = "/token/updateInfo", produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<String> updateMember(@RequestBody Map<String, String> user, HttpServletRequest request) {
        User curUser = userService.findByToken(JwtTokenProvider.resolveToken(request));
        try {
            if (!user.get("userNickname").equals(curUser.getUserNickname())) {
                userService.validateDuplicateUserNick(user.get("userNickname"));
                curUser.setUserNickname(user.get("userNickname"));
            }
            curUser.setUserPassword(passwordEncoder.encode(user.get("userPassword")));

            userRepository.save(curUser);

        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(user.get("userNickname"), HttpStatus.OK);
    }

    //  비밀번호 일치 여부
    @ApiOperation(value = "비밀번호 일치 여부", notes = "token 필요")
    @PostMapping(value = "/token/passwordConfirm")
    public HttpStatus passwordConfirm(HttpServletRequest request, @RequestBody String userPassword) {
        User user = userService.findByToken(JwtTokenProvider.resolveToken(request));
        if (!passwordEncoder.matches(userPassword.substring(0, userPassword.length() - 1), user.getPassword())) {
            return HttpStatus.NOT_ACCEPTABLE;
        }
        return HttpStatus.OK;
    }

    // 자격증 좋아요
    @ApiOperation(value = "자격증 좋아요", notes = "token, certificate code")
    @PostMapping(value = "/token/follow/{certificateCode}")
    public ResponseEntity<String> follow(@PathVariable("certificateCode") int certificateCode, HttpServletRequest request) {
        try {

        } catch (Exception e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>("OK", HttpStatus.OK);
    }
}


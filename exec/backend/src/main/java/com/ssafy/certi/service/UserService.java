package com.ssafy.certi.service;

import com.ssafy.certi.domain.User;
import com.ssafy.certi.repository.UserRepository;
import com.ssafy.certi.security.JwtTokenProvider;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 중복 닉네임 체크
    public void userNicknameDuplicateCheck(String userNickname) {
        Optional<User> person= userRepository.findByUserNickname(userNickname);
        if(!person.isEmpty()){
            if(person.get().getUserFlag()!=0) {    //  탈퇴하지 않은 회원의 닉네임만 체크
                userRepository.findByUserNickname(userNickname)
                        .ifPresent(m -> {
                            throw new IllegalStateException("duplicate Nickname!!!!!");
                        });
            }
        }
    }

    // 중복 이메일 체크
    public void userEmailDuplicateCheck(String userEmail) {
        Optional<User> curUser = userRepository.findByUserEmail(userEmail);
        if(!curUser.isEmpty()){
            if(curUser.get().getUserFlag()!=0) {    //  탈퇴하지 않은 회원의 이메일만 체크
            curUser.ifPresent(m -> {
                        throw new IllegalStateException("duplicate Email!!!!!");
                    });
            }
        }
    }


    // 이메일로 회원조회
    public User loadUserByUsername(String userEmail) {
        return userRepository.findByUserEmail(userEmail)
                .orElse(null);
    }


    // token으로 회원 찾기
    public User findByToken(String token) {
        return loadUserByUsername(JwtTokenProvider.getUserId(token));
    }

}

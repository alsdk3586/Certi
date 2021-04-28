package com.ssafy.certi.service;

import com.ssafy.certi.domain.User;
import com.ssafy.certi.repository.UserRepository;
import com.ssafy.certi.security.JwtTokenProvider;
import org.springframework.security.core.userdetails.UserDetailsService;

public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void validateDuplicateUserNick(String userNickName) {
        userRepository.findByUserNickname(userNickName)
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 닉네임입니다.");
                });
    }


    public void validateDuplicateUserEmail(String userEmail) {
        userRepository.findByUserEmail(userEmail)
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 이메일입니다.");
                });
    }


    // 이메일로 회원조회
    public User loadUserByUsername(String userEmail) {
        return userRepository.findByUserEmail(userEmail)
                .orElse(null);
    }


    // token으로 회원 찾기
    public User findByToken(String token) {

        return loadUserByUsername(JwtTokenProvider.getUserNo(token));

    }

}

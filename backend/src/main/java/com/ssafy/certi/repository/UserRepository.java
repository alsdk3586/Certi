package com.ssafy.certi.repository;

import com.ssafy.certi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUserEmail(String userEmail);
    Optional<User> findByUserNickname(String userNickname);
}
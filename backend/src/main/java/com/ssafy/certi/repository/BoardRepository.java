package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Board;
import com.ssafy.certi.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
}

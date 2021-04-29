package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {

}

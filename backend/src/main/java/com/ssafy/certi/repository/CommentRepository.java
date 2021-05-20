package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Board;
import com.ssafy.certi.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<List<Comment>> findAllByBoard(Board board);
    void deleteByBoard(Board board);
}

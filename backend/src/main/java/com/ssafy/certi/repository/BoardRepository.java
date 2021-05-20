package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;
import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findAll();
    Board findByBoardId(Integer boardId);
    List<Board> findByBoardTitleContaining(String Title);

    List<Board> findByBoardCategory(String category);
    void deleteByBoardId(Integer boardId);

}

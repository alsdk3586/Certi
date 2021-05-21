package com.ssafy.certi.dto;

import com.ssafy.certi.domain.Board;
import com.ssafy.certi.domain.Comment;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import java.util.List;
import java.util.Optional;

@Setter
@Getter
public class DetailBoard {
    Board board;
    Optional<List<Comment>> comment;
}

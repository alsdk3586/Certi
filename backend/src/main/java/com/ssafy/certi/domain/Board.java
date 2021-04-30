package com.ssafy.certi.domain;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="board_id")
    private int boardId;

    @Column(name="user_id")
    private int userId;

    @Column(name="board_category")
    private int boardCategory;

    @Column(name="board_title")
    private String boardTitle;

    @Column(name="board_content")
    private String boardContent;

    @Column(name="board_file")
    private String boardFile;

    @Column(name="board_writer")
    private String boardWriter;

    @Column(name="board_create")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date boardCreate;

    @Column(name="board_hit")
    private int boardHit;

    @Column(name="board_flag")
    private int boardFlag;

}


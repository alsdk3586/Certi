package com.ssafy.certi.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int boardId;

    @ManyToOne
    @JoinColumn(name = "User_userId")
    private User userId;

    @Column(name = "board_category")
    private int boardCategory;

    @Column(name = "board_title")
    private String boardTitle;

    @Column(name = "board_content")
    private String boardContent;

    @Column(name = "board_file")
    private String boardFile;

    @Column(name = "board_writer")
    private String boardWriter;

    @Column(name = "board_create", nullable = false)
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate boardCreate;

    @Column(name = "board_hit")
    private Integer boardHit;

    @Column(name = "board_flag")
    private Integer boardFlag;

    public Board() {

    }
}


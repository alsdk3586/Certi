package com.ssafy.certi.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="board_id")
    @NotBlank
    private int boardId;

    @NotBlank
    @ManyToOne
    @JoinColumn(name="User_userId")
    private User user;

    @NotBlank
    @Column(name="board_category")
    private int boardCategory;

    @NotBlank
    @Column(name="board_title")
    private String boardTitle;

    @NotBlank
    @Column(name="board_content")
    private String boardContent;

    @Column(name="board_file")
    private String boardFile;

    @NotBlank
    @Column(name="board_writer")
    private String boardWriter;

    @NotBlank
    @Column(name="board_create")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date boardCreate;

    @NotBlank
    @Column(name="board_hit")
    private int boardHit;

    @NotBlank
    @Column(name="board_flag")
    private int boardFlag;

}


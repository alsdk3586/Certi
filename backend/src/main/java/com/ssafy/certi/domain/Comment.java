package com.ssafy.certi.domain;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotBlank
    @Column(name="comment_id")
    private int commentId;

    @NotBlank
    @Column(name="board_id")
    private int boardId;

    @NotBlank
    @Column(name="user_id")
    private int userId;

    @NotBlank
    @Column(name="comment_user_id")
    private int commentUserId;

    @NotBlank
    @Column(name = "comment_content")
    private String commentContent;

    @NotBlank
    @Column(name="comment_create")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private int commentCreate;

}

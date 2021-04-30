package com.ssafy.certi.domain;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;

@Entity
@Getter
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_id")
    private int commentId;

    @Column(name="board_id")
    private int boardId;

    @Column(name="user_id")
    private int userId;

    @Column(name="comment_user_id")
    private int commentUserId;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name="comment_create")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private int commentCreate;

}

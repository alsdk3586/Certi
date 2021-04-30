package com.ssafy.certi.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotBlank
    @Column(name="comment_id")
    private int commentId;

    @NotBlank
    @ManyToOne
    @JoinColumn(name="Board_board_id")
    private Board board;

    @NotBlank
    @ManyToOne
    @JoinColumn(name="Board_user_id")
    private Board userId;

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

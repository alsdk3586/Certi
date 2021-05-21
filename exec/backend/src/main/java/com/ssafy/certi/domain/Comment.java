package com.ssafy.certi.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int commentId;

    @ManyToOne
    @JoinColumn(name = "Board_board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "User_user_id")
    private User UserId;

    @Column(name = "comment_content")
    private String commentContent;

    @Column(name = "comment_create")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate commentCreate;

}

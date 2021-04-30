package com.ssafy.certi.domain;

import lombok.Getter;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
public class Like {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="like_id")
    private int likeId;

    @NotBlank
    @ManyToOne
    @JoinColumn(name="Board_board_id")
    private Board boardId;

    @NotBlank
    @ManyToOne
    @JoinColumn(name = "User_userId")
    private User userId;

}

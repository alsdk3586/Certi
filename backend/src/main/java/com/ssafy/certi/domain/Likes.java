package com.ssafy.certi.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Likes {

    @NotBlank
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="likes_id")
    private int likesId;

    @NotBlank
    @ManyToOne
    @JoinColumn(name="Board_board_id")
    private Board boardId;

    @NotBlank
    @ManyToOne
    @JoinColumn(name = "User_userId")
    private User userId;

}

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
public class Notification {

    @NotBlank
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private int notificationId;

    @NotBlank
    @ManyToOne
    @JoinColumn(name="User_userId")
    private User userId;

    @NotBlank
    @Column(name="notification_message")
    private String notificationMessage;

    @NotBlank
    @Column(name="notification_type")
    private int notificationType;

    @NotBlank
    @Column(name = "notification_flag")
    private int notificationFlag;

    @NotBlank
    @Column(name="notification_create")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date notificationCreate;

    @OneToOne
    @JoinColumn(name = "Board_board_id")
    private Board boardId;

}

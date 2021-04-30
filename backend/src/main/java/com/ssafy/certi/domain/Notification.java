package com.ssafy.certi.domain;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Getter
public class Notification {

    @NotBlank
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private int notificationId;

    @NotBlank
    @Column(name="user_id")
    private int userId;

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

    @Column(name = "board_id")
    private int boardId;

}

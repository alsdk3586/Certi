package com.ssafy.certi.domain;

import lombok.Getter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
public class Notification {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notification_id")
    private int notificationId;

    @Column(name="user_id")
    private int userId;

    @Column(name="notification_message")
    private String notificationMessage;

    @Column(name="notification_type")
    private int notificationType;

    @Column(name = "notification_flag")
    private int notificationFlag;

    @Column(name="notification_create")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date notificationCreate;

    @Column(name = "board_id")
    private int boardId;

}

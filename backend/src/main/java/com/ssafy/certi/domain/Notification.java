package com.ssafy.certi.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Notification {

    @Id @GeneratedValue
    private int notification_id;

    private int user_id;

    private String notification_message;

    private int notification_type;

    private int notification_flag;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date notification_create;

    private int board_id;

    public int getUser_id() {
        return user_id;
    }

    public int getBoard_id() {
        return board_id;
    }

    public Date getNotification_create() {
        return notification_create;
    }

    public int getNotification_flag() {
        return notification_flag;
    }

    public int getNotification_id() {
        return notification_id;
    }

    public int getNotification_type() {
        return notification_type;
    }

    public String getNotification_message() {
        return notification_message;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public void setBoard_id(int board_id) {
        this.board_id = board_id;
    }

    public void setNotification_create(Date notification_create) {
        this.notification_create = notification_create;
    }

    public void setNotification_flag(int notification_flag) {
        this.notification_flag = notification_flag;
    }

    public void setNotification_id(int notification_id) {
        this.notification_id = notification_id;
    }

    public void setNotification_message(String notification_message) {
        this.notification_message = notification_message;
    }

    public void setNotification_type(int notification_type) {
        this.notification_type = notification_type;
    }
}

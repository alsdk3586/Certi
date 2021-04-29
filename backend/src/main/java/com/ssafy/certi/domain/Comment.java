package com.ssafy.certi.domain;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comment {

    @Id @GeneratedValue
    private int comment_id;

    private int baord_id;

    private int user_id;

    private int comment_userid;

    private String comment_content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private int comment_create;


    public int getUser_id() {
        return user_id;
    }

    public int getBaord_id() {
        return baord_id;
    }

    public int getComment_create() {
        return comment_create;
    }

    public int getComment_id() {
        return comment_id;
    }

    public int getComment_userid() {
        return comment_userid;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public void setBaord_id(int baord_id) {
        this.baord_id = baord_id;
    }

    public void setComment_content(String comment_content) {
        this.comment_content = comment_content;
    }

    public void setComment_create(int comment_create) {
        this.comment_create = comment_create;
    }

    public void setComment_id(int comment_id) {
        this.comment_id = comment_id;
    }

    public void setComment_userid(int comment_userid) {
        this.comment_userid = comment_userid;
    }
}

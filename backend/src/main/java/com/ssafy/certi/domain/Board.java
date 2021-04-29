package com.ssafy.certi.domain;


import lombok.Builder;
import lombok.Getter;
import lombok.NonNull;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Board {

    @Id @GeneratedValue
    private int board_id;

    private int user_id;

    private int board_category;

    private String baord_title;

    private String board_content;

    private String board_file;

    private String board_writer;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date board_create;

    private int board_hit;

    private int board_flag;

    public Date getBoard_create() {
        return board_create;
    }

    public int getBoard_category() {
        return board_category;
    }

    public int getBoard_flag() {
        return board_flag;
    }

    public int getBoard_hit() {
        return board_hit;
    }

    public int getBoard_id() {
        return board_id;
    }

    public int getUser_id() {
        return user_id;
    }

    public String getBaord_title() {
        return baord_title;
    }

    public String getBoard_content() {
        return board_content;
    }

    public String getBoard_file() {
        return board_file;
    }

    public String getBoard_writer() {
        return board_writer;
    }

    public void setBaord_title(String baord_title) {
        this.baord_title = baord_title;
    }

    public void setBoard_category(int board_category) {
        this.board_category = board_category;
    }

    public void setBoard_content(String board_content) {
        this.board_content = board_content;
    }

    public void setBoard_create(Date board_create) {
        this.board_create = board_create;
    }

    public void setBoard_file(String board_file) {
        this.board_file = board_file;
    }

    public void setBoard_flag(int board_flag) {
        this.board_flag = board_flag;
    }

    public void setBoard_hit(int board_hit) {
        this.board_hit = board_hit;
    }

    public void setBoard_id(int board_id) {
        this.board_id = board_id;
    }

    public void setBoard_writer(String board_writer) {
        this.board_writer = board_writer;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }
}


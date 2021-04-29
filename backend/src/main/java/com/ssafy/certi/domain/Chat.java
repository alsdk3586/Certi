package com.ssafy.certi.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.sql.Date;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Chat {

    @Id
//    @GeneratedValue
//    @Column(name = "certificate_code")
    private String certificateCode;

    private int messageSenderId;

    private String message;
    private int messageReading;
    private LocalDateTime messageCreate;

    @Builder
    public Chat(String certificateCode,int messageSenderId,String message){
        this.certificateCode=certificateCode;
        this.messageSenderId=messageSenderId;
        this.message=message;
        this.messageCreate= LocalDateTime.now();
    }

    /**
     * 채팅 생성
     * @param certificateCode 채팅 방
     * @param messageSenderId 보낸이
     * @param message 내용
     * @return Chat Entity
     */
    public static Chat createChat(String certificateCode, int messageSenderId, String message) {
        return Chat.builder().certificateCode(certificateCode)
                .messageSenderId(messageSenderId)
                .message(message)
                .build();
    }

}

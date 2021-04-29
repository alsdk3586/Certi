package com.ssafy.certi.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Room {
    @Id
//    @GeneratedValue
//    @Column(name = "certificate_code")
    private String certificateCode;
    private LocalDateTime chatroomCreate;

    @Builder
    public Room(String certificateCode){
        this.certificateCode = certificateCode;
    }

    //채팅방 생성

    public static Room createRoom(String certificateCode){
        return Room.builder()
                .certificateCode(certificateCode)
                .build();
    }

}

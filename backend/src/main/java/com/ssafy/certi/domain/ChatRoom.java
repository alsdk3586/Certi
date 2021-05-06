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
public class ChatRoom {
    @Id
//    @GeneratedValue
//    @Column(name = "certificate_code")
    private String certificateCode;
    private LocalDateTime localDateTime;


    //어떤 필드에 어떤 값을 넣어야할지 명확하게 구분하기 위해 생성자 말고 Builder를 사용함
    @Builder
    public ChatRoom(String certificateCode,LocalDateTime localDateTime){
        this.certificateCode = certificateCode;
        this.localDateTime=localDateTime;
    }

    //채팅방 생성

//    public static ChatRoom createRoom(String certificateCode){
//        return ChatRoom.builder()
//                .certificateCode(certificateCode)
//                .build();
//    }

}

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
    private String certificateCode;
    private LocalDateTime localDateTime;


    //채팅방 생성
    @Builder
    public static ChatRoom createRoom(String certificateCode){
        ChatRoom chatRoom = new ChatRoom();
        chatRoom.certificateCode = certificateCode;
        chatRoom.localDateTime = LocalDateTime.now();

        return chatRoom;
    }

}

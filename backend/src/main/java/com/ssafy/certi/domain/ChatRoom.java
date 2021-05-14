package com.ssafy.certi.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_id")
    private int chatroomId;

    @ManyToOne
    @JoinColumn(name = "certificate_code")
    private Certificate certificateCode;

    private LocalDateTime createdAt;

    @PrePersist
    public void createdAt() {
        this.createdAt = LocalDateTime.now();
    }

    //채팅방 생성
//    @Builder
//    public static ChatRoom createRoom(String certificateCode){
//        ChatRoom chatRoom = new ChatRoom();
//        chatRoom.certificateCode = certificateCode;
//        chatRoom.localDateTime = LocalDateTime.now();
//
//        return chatRoom;
//    }

}

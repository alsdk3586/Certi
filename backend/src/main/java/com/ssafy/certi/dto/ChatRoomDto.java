package com.ssafy.certi.dto;

import com.ssafy.certi.domain.ChatRoom;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChatRoomDto {
    private String certificateCode;
    private LocalDateTime localDateTime;


    public static ChatRoomDto create(String certificateCode, LocalDateTime localDateTime){
        ChatRoomDto chatRoom = new ChatRoomDto();
        chatRoom.certificateCode = certificateCode;
        chatRoom.localDateTime = localDateTime;

        return chatRoom;
    }

    @Builder
    public ChatRoomDto(String certificateCode, LocalDateTime localDateTime){
        this.certificateCode=certificateCode;
        this.localDateTime=localDateTime;
    }

    //SAVE - 생성
    public ChatRoom toEntity(){
        return ChatRoom.builder()
                .certificateCode(certificateCode)
                .localDateTime(localDateTime)
                .build();
    }



}

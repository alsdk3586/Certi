package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Chat;
import com.ssafy.certi.domain.ChatRoom;
import com.ssafy.certi.dto.ChatMessage;
import com.ssafy.certi.repository.ChatRepository;
import com.ssafy.certi.repository.ChatRoomRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"4. Chat Message"})
@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;

    @ApiOperation(value = "채팅")
    @MessageMapping("/sendMessage/{certificateCode}") // 클라이언트에서 /sendMessage로 메세지를 전달하면 sendMessage 메소드가 실행됨
    @SendTo("/topic/pubic/{certificateCode}") // 그리고 /topic/pubic 쪽으로 결과를 return 시킴.
    public ChatMessage sendMessage(
            @ApiParam(value = "messageSenderId, message, messageCreate", required = true)
            @Payload ChatMessage chatMessage,
            @DestinationVariable String certificateCode) {
            ChatRoom chatRoom = chatRoomRepository.findByCertificateCode(chatMessage.getRoomCode());
            chatRepository.save(Chat.builder()
                    .certificateCode(certificateCode)
                    .messageSenderId(chatMessage.getSender())
                    .messageCreate(chatMessage.getDateTime())
                    .message(chatMessage.getContent())
                    .build()
            );
            return chatMessage;
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/pubic")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor,
                               String certificateCode) {
        ChatRoom chatRoom = chatRoomRepository.findByCertificateCode(certificateCode);
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
//        headerAccessor.getSessionAttributes().put("roomcode", chatMessage.getRoomCode());
        return chatMessage;
    }
}

package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Chat;
import com.ssafy.certi.dto.ChatMessage;
import com.ssafy.certi.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;

//    @MessageMapping("/{certificateCode}")
//    @SendTo("/room/{certificateCode}")
//    public ChatMessage test(@DestinationVariable String certificateCode, ChatMessage message){
//
//        //채팅 저장
//        Chat chat=chatService.createChat(certificateCode,message.getMessageSenderId(),message.getMessage());
//
//        return ChatMessage.builder()
//                .certificateCode(certificateCode)
//                .messageSenderId(chat.getMessageSenderId())
//                .message(chat.getMessage())
//                .build();
//
//    }
@MessageMapping("/sendMessage")
@SendTo("/topic/pubic")
public ChatMessage sendMessage(@Payload ChatMessage chatMessage) {
    return chatMessage;
}

    @MessageMapping("/addUser")
    @SendTo("/topic/pubic")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage;
    }
}

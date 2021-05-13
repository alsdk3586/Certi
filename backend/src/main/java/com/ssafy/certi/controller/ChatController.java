package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Chat;
import com.ssafy.certi.dto.ChatMessage;
import com.ssafy.certi.repository.ChatRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"4. Chat Message"})
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final SimpMessageSendingOperations messagingTemplate;

//    @ApiOperation(value = "채팅")
//    @MessageMapping("/sendMessage") //  websocket으로 들어오는 메세지 발행 처리.
//    @SendTo("/topic/pubic")
//    public void message(ChatMessage message) {
//        if (ChatMessage.MessageType.JOIN.equals(message.getType()))
//            message.setMessage(message.getSender() + "님이 입장하셨습니다.");
//        messagingTemplate.convertAndSend("/sub/chat/room/" + message.getCertificateCode(), message);
//    }

    private final ChatRepository chatRepository;

    @ApiOperation(value = "채팅")
    @MessageMapping("/sendMessage")
    @SendTo("/topic/pubic")
    public ChatMessage sendMessage(
            @ApiParam(value = "certificateCode, messageSenderId, message, messageCreate", required = true)
            @Payload ChatMessage chatMessage) {
            chatRepository.save(Chat.builder()
                    .certificateCode("2290")
                    .messageSenderId(chatMessage.getSender())
                    .messageCreate(chatMessage.getDateTime())
                    .message(chatMessage.getContent())
                    .build()
            );
            messagingTemplate.convertAndSend("/sub/chat/room/" + chatMessage.getRoomCode(), chatMessage);
            return chatMessage;
    }

    @MessageMapping("/addUser")
    @SendTo("/topic/pubic")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor,
                               String certificateCode) {
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        headerAccessor.getSessionAttributes().put("roomcode", certificateCode);
        return chatMessage;
    }
}

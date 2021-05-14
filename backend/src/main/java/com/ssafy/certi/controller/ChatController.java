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
    private final ChatRoomRepository chatRoomRepository;

    @ApiOperation(value = "채팅")
    @MessageMapping("/sendMessage") // 클라이언트에서 /sendMessage로 메세지를 전달하면 sendMessage 메소드가 실행됨
//    @SendTo("/topic/pubic") // 그리고 /topic/pubic 쪽으로 결과를 return 시킴.
    public ChatMessage sendMessage(
            @ApiParam(value = "messageSenderId, message, messageCreate", required = true)
            @Payload ChatMessage chatMessage) {
            ChatRoom chatRoom = chatRoomRepository.findByCertificateCode(chatMessage.getRoomCode());
            chatRepository.save(Chat.builder()
                    .certificateCode(chatMessage.getRoomCode())
                    .messageSenderId(chatMessage.getSender())
                    .messageCreate(chatMessage.getDateTime())
                    .message(chatMessage.getContent())
                    .build()
            );
            messagingTemplate.convertAndSend("/topic/pubic/" + chatMessage.getRoomCode(), chatMessage);
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
        headerAccessor.getSessionAttributes().put("roomcode", chatMessage.getRoomCode());
        return chatMessage;
    }
}

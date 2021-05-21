package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Chat;
import com.ssafy.certi.dto.ChatMessage;
import com.ssafy.certi.repository.ChatRepository;
import com.ssafy.certi.repository.ChatRoomRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Api(tags = {"4. Chat Message"})
@RestController
@RequiredArgsConstructor
@CrossOrigin("*")
public class ChatController {
    private final ChatRepository chatRepository;
    private final ChatRoomRepository chatRoomRepository;

    @ApiOperation(value = "채팅")
    @MessageMapping("/sendMessage") // 클라이언트에서 /sendMessage로 메세지를 전달하면 sendMessage 메소드가 실행됨
    @SendTo("/topic/pubic") // 그리고 /topic/pubic 쪽으로 결과를 return 시킴.
    public ChatMessage sendMessage(
            @ApiParam(value = "messageSenderId, message, messageCreate", required = true)
            @Payload ChatMessage chatMessage) {
//            ChatRoom chatRoom = chatRoomRepository.findByCertificateCode(chatMessage.getRoomcode());
            System.out.println("보낸 채팅: " + chatMessage);
            chatRepository.save(Chat.builder()
                    .certificateCode(chatMessage.getRoomcode())
                    .messageSenderId(chatMessage.getSender())
                    .messageCreate(chatMessage.getDateTime())
                    .message(chatMessage.getContent())
                    .build()
            );
            return chatMessage;
    }

    @ApiOperation(value = "기존 채팅 조회", notes = "성공 시, true 반환")
    @GetMapping("/chatHistory/{roomcode}")
    public ResponseEntity<Optional<List<Chat>>> chatHistory(@PathVariable String roomcode) {
        try {
            Optional<List<Chat>> history= chatRepository.findAllByCertificateCode(roomcode);

            return new ResponseEntity<>(history, HttpStatus.OK);

        } catch (IllegalStateException e) { // exception return 하게 수정
            Optional<List<Chat>> box=null;
            return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
        }
    }


    @MessageMapping("/addUser")
    @SendTo("/topic/pubic")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,
                               SimpMessageHeaderAccessor headerAccessor) {
//        ChatRoom chatRoom = chatRoomRepository.findByCertificateCode(certificateCode);
        // Add user in web socket session
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
//        headerAccessor.getSessionAttributes().put("roomcode", chatMessage.getRoomCode());
        return chatMessage;
    }
}

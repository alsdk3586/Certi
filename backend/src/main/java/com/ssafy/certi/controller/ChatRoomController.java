package com.ssafy.certi.controller;

import com.ssafy.certi.domain.ChatRoom;
import com.ssafy.certi.repository.ChatRoomRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(tags = {"5. Chat Room"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomRepository chatRoomRepository;

    // 채팅 리스트 화면
    @GetMapping("/room")
    public String rooms() {
        return "/chat/room";
    }

    // 모든 채팅방 목록 반환
    @ApiOperation(value = "채팅방 목록 반환")
    @GetMapping("/rooms")
    @ResponseBody
    public List<ChatRoom> room() {
        return chatRoomRepository.findAll();
    }

    // 채팅방 생성
    @ApiOperation(value = "채팅방 생성", notes = "certificateCode 필요")
    @PostMapping("/createRoom")
    @ResponseBody
    public ChatRoom createRoom(@RequestParam String certificateCode) {
        return chatRoomRepository.save(ChatRoom.builder()
        .certificateCode(certificateCode)
        .build());
    }


    // 채팅방 입장 화면
    @ApiOperation(value = "채팅방 입장 화면")
    @GetMapping("/room/enter/{certificateCode}")
    public String roomDetail(Model model, @PathVariable String certificateCode) {
        model.addAttribute("certificateCode", certificateCode);
        return "/chat/enterRoom";
    }


    // 특정 채팅방 조회
    @ApiOperation(value = "특정 채팅방 조회", notes = "certificateCode로 조회. 성공시 certificateCode 반환")
    @GetMapping("/room/{certificateCode}")
    @ResponseBody
    public ResponseEntity<String> roomInfo(@PathVariable String certificateCode, @RequestBody Map<String, String> chatRoom) {
        try{
            chatRoomRepository.findByCertificateCode(certificateCode);

            return new ResponseEntity<>(chatRoom.get("certificateCode"), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.toString(), HttpStatus.BAD_REQUEST);
        }
    }
}

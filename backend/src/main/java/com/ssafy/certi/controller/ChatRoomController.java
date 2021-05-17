package com.ssafy.certi.controller;

import com.ssafy.certi.domain.Certificate;
import com.ssafy.certi.domain.Chat;
import com.ssafy.certi.domain.ChatRoom;
import com.ssafy.certi.domain.Schedule;
import com.ssafy.certi.repository.ChatRoomRepository;
import com.ssafy.certi.repository.CertificateRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(tags = {"5. Chat Room"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
@CrossOrigin("*")
public class ChatRoomController {

    @Autowired
    private ChatRoomRepository chatRoomRepository;
    @Autowired
    private CertificateRepository certificateRepository;

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
//    @ApiOperation(value = "채팅방 생성", notes = "certificateCode 필요")
//    @PostMapping("/createRoom")
//    @ResponseBody
//    public ChatRoom createRoom(@RequestParam String certificateCode) {
//        return chatRoomRepository.save(ChatRoom.builder()
//        .certificateCode(certificateCode)
//        .build());
//    }


    // 채팅방 입장 화면
    @ApiOperation(value = "채팅방 입장 화면")
    @GetMapping("/enter/{certificateCode}")
    public String roomDetail(Model model, @PathVariable String certificateCode) {
        model.addAttribute("certificateCode", certificateCode);
        return "/chat/enterRoom";
    }


    // 특정 채팅방 조회
    @ApiOperation(value = "특정 채팅방 조회", notes = "certificateCode로 조회. 성공시 certificateCode 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "잘못된 접근"),
            @ApiResponse(code = 500, message = "서버 에러")
    })
    @GetMapping("/search/{certificateClassificationCode}")
    @ResponseBody
    public ResponseEntity<List> roomInfo(@PathVariable String certificateClassificationCode) {
            try{
                // 자격증 이름을 대충 검색해도 전부 포함시켜서 나오도록 (Like 와이들카드)와 대소문자 구분 없이 하도록 하게끔 Jpa SQL Query를 짜줌.
                List<Certificate> result_sub=certificateRepository.findByCertificateClassificationCodeContainingIgnoreCase(certificateClassificationCode);

                // 배열 선언
                ArrayList list = new ArrayList();
                for (int i = 0; i < result_sub.size(); i++) {
                    String certi = result_sub.get(i).getCertificateCode().toString();
                    List<ChatRoom> chatroom = chatRoomRepository.findByCertificateCodeCertificateCode(certi);
                    for (int j = 0; j < chatroom.size(); j++) {
                        list.add(chatroom.get(j));
                    }
                }
                return new ResponseEntity<>(list, HttpStatus.OK);
            } catch (IllegalStateException e) {
                List<Certificate> box=null;
                return new ResponseEntity<>(box, HttpStatus.BAD_REQUEST);
            }
    }
}

package com.ssafy.certi.service;

import com.ssafy.certi.domain.Chat;
import com.ssafy.certi.domain.Room;
import com.ssafy.certi.repository.ChatRepository;
import com.ssafy.certi.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final RoomRepository roomRepository;
    private final ChatRepository chatRepository;



    //모든 채팅방 찾기
    public List<Room> findAllRoom(){
        return roomRepository.findAll();
    }
    /**
     * 특정 채팅방 찾기
     * @param certificateCode certificateCode
     */
    public Room findRoomByCertificateCode(String certificateCode){
        return roomRepository.findById(certificateCode).orElseThrow();
    }

    /**
     * 채팅방 만들기
     * @param certificateCode 방 코드
     */
    public Room createRoom(String certificateCode){
        return roomRepository.save(Room.createRoom(certificateCode));
    }


    /**
     * 채팅 생성
     * @param certificateCode 채팅방 id
     * @param messageSenderId 보낸이
     * @param message 내용
     */
    public Chat createChat(String certificateCode,int messageSenderId,String message){
        Room room=roomRepository.findById(certificateCode).orElseThrow();
        return chatRepository.save(Chat.createChat(certificateCode,messageSenderId,message));
    }

    /**
     * 채팅방 채팅내용 불러오기
     * @param certificateCode 채팅방 id
     */
    public List<Chat> findAllByCertificateCode(String certificateCode) {
        return chatRepository.findAllByCertificateCode(certificateCode);
    }

}

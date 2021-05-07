package com.ssafy.certi.service;

import com.ssafy.certi.dto.ChatRoomDto;
import com.ssafy.certi.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private ChatRoomRepository chatRoomRepository;

    @Transactional
    public String save(ChatRoomDto requestDto){
        return chatRoomRepository.save(requestDto.toEntity()).getCertificateCode();
    }

}

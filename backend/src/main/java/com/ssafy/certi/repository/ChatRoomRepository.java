package com.ssafy.certi.repository;

import com.ssafy.certi.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {

    ChatRoom findByCertificateCode(String certificateCode);
}
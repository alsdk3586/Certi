package com.ssafy.certi.repository;

import com.ssafy.certi.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    List<ChatRoom> findByCertificateCodeCertificateCode(String certificateclassificationcode);
    ChatRoom findByCertificateCode(String certificateCode);
}
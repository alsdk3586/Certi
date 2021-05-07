package com.ssafy.certi.repository;


import com.ssafy.certi.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom,String> {

}

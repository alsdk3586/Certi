package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Chat;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ChatRepository extends CrudRepository<Chat,String> {

    //채팅기록 읽어오기
    List<Chat> findAllByCertificateCode(String certificateCode);
}

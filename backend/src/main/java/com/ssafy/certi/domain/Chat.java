package com.ssafy.certi.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Chat {

    @Id
//    @OneToOne(mappedBy = "certificate_code", fetch = FetchType.EAGER)
    private String certificateCode;

    // 메시지 보낸 유저 식별번호
    @JsonProperty("message_sender_id")
    private int messageSenderId;

    // 보낸 메세지
    @JsonProperty("message")
    private String message;

    // ?
    @JsonProperty("message_reading")
    private int messageReading;

    // 메세지 전송 시각
    @JsonProperty("message_create")
    private LocalDateTime messageCreate;

    /**
     * 채팅 생성
     * @param certificateCode 채팅 방
     * @param messageSenderId 보낸이
     * @param message 내용
     * @return Chat Entity
     */
    public static Chat createChat(String certificateCode, int messageSenderId, String message) {
        return Chat.builder().certificateCode(certificateCode)
                .messageSenderId(messageSenderId)
                .message(message)
                .build();
    }

}

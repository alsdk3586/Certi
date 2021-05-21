package com.ssafy.certi.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int chatId;

//    @OneToOne(mappedBy = "certificate_code", fetch = FetchType.EAGER)
    private String certificateCode;

    // 메시지 보낸 유저
    @JsonProperty("message_sender_id")
    private String messageSenderId;

    // 보낸 메세지
    @JsonProperty("message")
    private String message;

    // 메세지 전송 시각
    @JsonProperty("message_create")
    private LocalDateTime messageCreate;
}

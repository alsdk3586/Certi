package com.ssafy.certi.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    private String certificateCode;
    private int messageSenderId;
    private String message;
    private int messageReading;
    private LocalDateTime messageCreate;
}

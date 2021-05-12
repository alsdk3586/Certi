package com.ssafy.certi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{

    //웹소켓 엔드포인트 정의 ws://localhost:8080/ws/chat
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
    }

    // 메시지 브로커 구성 (메시지를 브로드캐스팅)
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app"); // /pub
        registry.enableSimpleBroker("/sub", "/queue/", "/room/", "/topic/", "/user/");   // 메모리 기반 메시지 브로커가 해당 api 구독하고 있는 client에게 메세지 전달
        registry.setUserDestinationPrefix("/user");
    }
}
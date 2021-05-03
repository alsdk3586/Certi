package com.ssafy.certi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer{

    //웹소켓 엔드포인트 정의 ws://localhost:8080/ws
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry){
        registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS();
//        registry.addEndpoint("/ws").setAllowedOrigins("*").withSockJS();
    }

    // 메시지 브로커 구성 (메시지를 브로드캐스팅)
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
//        registry.enableSimpleBroker("/socket");
        registry.setApplicationDestinationPrefixes("/app");
        registry.enableSimpleBroker("/queue/", "/topic/", "/user/");   // Enables a simple in-memory broker
        registry.setUserDestinationPrefix("/user");
    }


}
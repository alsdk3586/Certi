package com.ssafy.certi.config;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DBConfig {

    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder.create()
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .url("jdbc:mysql://K4A407.p.ssafy.io:3306/certi?useSSL=false&autoReconnect=true&useUnicode=true&serverTimezone=Asia/Seoul&characterEncoding=UTF-8")
                .username("certi")
                .password("ssafy")
                .build();
    }
}

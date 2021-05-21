package com.ssafy.certi.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;

@Entity(name = "User")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    // 유저 식별번호
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    // 유저 이메일
    @JsonProperty("user_email")
    private String userEmail;

    // 유저 비밀번호
    @JsonProperty("user_password")
    private String userPassword;

    // 유저 닉네임
    @JsonProperty("user_nickname")
    private String userNickname;

    // 유저 탈퇴 flag
    @JsonProperty("user_flag")
    private int userFlag;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return userPassword;
    }

    @Override
    public String getUsername() {
        return userEmail;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}

package com.ssafy.certi.repository;

import com.ssafy.certi.domain.FavoriteList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteListRepository extends JpaRepository<FavoriteList, Long> {
    List<FavoriteList> findByUserIdUserId(Integer userid);
    List<FavoriteList> findByCertificateCodeCertificateCode(String certificatecode);
    void deleteByCertificateCodeCertificateCode(String certificatecode);
}

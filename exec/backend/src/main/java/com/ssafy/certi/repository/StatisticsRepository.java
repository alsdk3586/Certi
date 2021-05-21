package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatisticsRepository extends JpaRepository<Statistics, Long> {
    List<Statistics> findByCertificateCodeCertificateCode(String CertificateCode);
}

package com.ssafy.certi.repository;

import com.ssafy.certi.domain.AcceptanceRate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AcceptanceRateRepository extends JpaRepository<AcceptanceRate, Long> {
    List<AcceptanceRate> findByCertificateCodeCertificateCode(String CertificateCode);
}

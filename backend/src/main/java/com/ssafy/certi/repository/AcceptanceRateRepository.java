package com.ssafy.certi.repository;

import com.ssafy.certi.domain.AcceptanceRate;
import com.ssafy.certi.domain.Statistics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import javax.persistence.Id;
import java.util.List;

public interface AcceptanceRateRepository extends JpaRepository<AcceptanceRate, Long> {
    List<AcceptanceRate> findByCertificateCodeCertificateCode(String CertificateCode);
}

package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CertificateRepository extends JpaRepository<Certificate, String> {
    List<Certificate> findByCertificateClassificationCodeContainingIgnoreCase(String certificateclassificationcode);
    Certificate findByCertificateCode(String CertificateCode);
}

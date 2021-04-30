package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Certificate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CertificateRepository extends JpaRepository<Certificate, String> {

}

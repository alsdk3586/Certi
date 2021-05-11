package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findAll();
    List<Schedule> findByCertificateCodeCertificateCode(String certificatecode);
}

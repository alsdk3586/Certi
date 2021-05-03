package com.ssafy.certi.repository;

import com.ssafy.certi.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}

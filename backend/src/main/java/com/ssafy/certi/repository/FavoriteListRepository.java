package com.ssafy.certi.repository;

import com.ssafy.certi.domain.FavoriteList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FavoriteListRepository extends JpaRepository<FavoriteList, Long> {
}

package com.ssafy.certi.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Statistics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "statistic_id")
    private int statisticId;

    @ManyToOne
    @JoinColumn(name = "certificate_code")
    private Certificate certificateCode;

    @Column(name = "statistic_age")
    private String statisticAge;

    @Column(name = "statistic_gender")
    private String statisticGender;

    @Column(name = "statistic_get_number")
    private int statisticGetNumber;

    @Column(name = "total_number_men")
    private int totalNumberMen;

    @Column(name = "total_number_women")
    private int totalNumberWomen;
}

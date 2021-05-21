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
public class AcceptanceRate {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="acceptance_id")
    private int acceptanceId;

    @ManyToOne
    @JoinColumn(name = "certificate_code")
    private Certificate certificateCode;

    @Column(name="acceptance_levelofeducation")
    private String acceptanceLevelOfEducation;

    @Column(name="acceptance_rate_result")
    private double acceptanceRateResult;

    @Column(name="acceptance_rate_doc")
    private double acceptanceRateDoc;

    @Column(name="acceptance_rate_prac")
    private double acceptanceRatePrac;

    @Column(name = "acceptance_stat_date")
    private int acceptanceStatDate;
}

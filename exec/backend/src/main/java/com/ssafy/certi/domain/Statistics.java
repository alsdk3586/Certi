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

    @Column(name = "teen")
    private int teen;

    @Column(name = "twenty")
    private int twenty;

    @Column(name = "thirty")
    private int thirty;

    @Column(name = "fourty")
    private int fourty;

    @Column(name = "fifty")
    private int fifty;

    @Column(name = "sixty")
    private int sixty;

    @Column(name = "seventy")
    private int seventy;

    @Column(name = "statistic_man")
    private int man;

    @Column(name = "statistic_women")
    private int women;
}

package com.ssafy.certi.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.util.Date;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Schedule {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private int scheduleId;

    @ManyToOne
    @JoinColumn(name = "certificate_code")
    private Certificate certificateCode;

    @Column(name = "schedule_impl_year")
    private int scheduleImplYear;

    @Column(name = "schedule_impl_seq")
    private int scheduleImplSeq;

    @Column(name = "schedule_doc_reg_start_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date scheduleDocRegStartDt;

    @Column(name = "schedule_doc_reg_end_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date scheduleDocRegEndDt;

    @Column(name = "schedule_doc_exam_start_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date scheduleDocExamStartDt;

    @Column(name = "schedule_doc_exam_end_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date scheduleDocExamEndDt;

    @Column(name = "schedule_doc_pass_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date scheduleDocPassDt;

    @Column(name = "schedule_prac_reg_start_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date schedulePracRegStartDt;

    @Column(name = "schedule_prac_reg_end_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date schedulePracRegEndDt;

    @Column(name = "schedule_prac_exam_start_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date schedulePracExamStartDt;

    @Column(name = "schedule_prac_exam_end_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date schedulePracExamEndDt;

    @Column(name = "schedule_prac_pass_dt")
    @JsonFormat(pattern = "yyyy-MM-dd")
//    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date schedulePracPassDt;
}

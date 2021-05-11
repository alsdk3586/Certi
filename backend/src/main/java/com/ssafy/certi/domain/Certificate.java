package com.ssafy.certi.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Certificate {

    @Id
    @Column(name = "certificate_code")
    private String certificateCode;

    @Column(name = "certificate_name")
    private String certificateName;

    @Column(name = "certificate_classification_code")
    private String certificateClassificationCode;

    @Column(name = "certsificate_classification_name")
    private String certificateClassificationName;
}

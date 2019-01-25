package com.ua.sutty.springRestApi.domain;

import lombok.*;

import javax.persistence.*;

@Data
@AllArgsConstructor
//@RequiredArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
//    @NonNull
    private String name;

}

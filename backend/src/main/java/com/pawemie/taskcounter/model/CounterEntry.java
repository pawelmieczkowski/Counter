package com.pawemie.taskcounter.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.time.LocalDate;

@Getter
@Setter
@RequiredArgsConstructor
@Entity
@IdClass(CounterEntryId.class)
public class CounterEntry {
    @Id
    private LocalDate date;
    @Id
    private Long counterId;
    private Long valueChange;


}

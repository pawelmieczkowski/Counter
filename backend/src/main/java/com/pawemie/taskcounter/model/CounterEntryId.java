package com.pawemie.taskcounter.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
public class CounterEntryId implements Serializable {
    private LocalDate date;
    private Long counterId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CounterEntryId that = (CounterEntryId) o;
        return Objects.equals(date, that.date) && Objects.equals(counterId, that.counterId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(date, counterId);
    }
}

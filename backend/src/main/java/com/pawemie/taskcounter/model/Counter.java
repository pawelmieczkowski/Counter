package com.pawemie.taskcounter.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Setter
@Getter
@Entity
public class Counter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @Column(columnDefinition = "TEXT")
    private String description;
    private CounterType counterType;
    private Long count;
    private String color;
    private final LocalDateTime creationDate;
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "counter_id")
    private List<CounterEntry> counterEntries;

    public Counter() {
        this.count = 0L;
        this.creationDate = LocalDateTime.now();
    }

    public void addCounterEntry(CounterEntry counterEntry) {
        Optional<CounterEntry> existingEntry = counterEntries.stream()
                .filter(entry -> (entry.getCounterId()
                        .equals(counterEntry.getCounterId()))
                        && entry.getDate()
                        .equals(counterEntry.getDate()))
                .findAny();
        existingEntry.
                ifPresentOrElse(entry -> entry.setValueChange(entry.getValueChange() + 1),
                        () -> this.counterEntries.add(counterEntry));
    }


}

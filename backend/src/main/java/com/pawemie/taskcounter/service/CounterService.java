package com.pawemie.taskcounter.service;

import com.pawemie.taskcounter.model.Counter;
import com.pawemie.taskcounter.model.CounterEntry;
import com.pawemie.taskcounter.repository.CounterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CounterService {

    private final CounterRepository counterRepository;

    public Counter saveCounter(Counter counter) {
        return counterRepository.save(counter);
    }

    public Counter updateCounter(Long id) {
        Counter counter = counterRepository.getById(id);

        CounterEntry counterEntry = new CounterEntry();
        counterEntry.setDate(LocalDate.now());
        counterEntry.setCounterId(id);
        counterEntry.setValueChange(1L);
        counter.addCounterEntry(counterEntry);

        counter.setCount(counter.getCount() + 1);
        return counterRepository.save(counter);
    }

    public List<Counter> getAllCounters() {
        return counterRepository.findAll();
    }

    public void deleteCounter(Long id) {
        counterRepository.deleteById(id);
    }

    public Counter modifyCounter(Counter counter) {
        if (counter.getId() == null) {
            throw new IllegalArgumentException("id is missing");
        }
        Counter modifiedCounter = counterRepository.getById(counter.getId());

        if (counter.getName() != null) modifiedCounter.setName(counter.getName());
        if (counter.getDescription() != null) modifiedCounter.setDescription(counter.getDescription());
        if (counter.getColor() != null) modifiedCounter.setColor(counter.getColor());

        return counterRepository.save(modifiedCounter);
    }
}

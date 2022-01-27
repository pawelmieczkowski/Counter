package com.pawemie.taskcounter.repository;

import com.pawemie.taskcounter.model.Counter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CounterRepository extends JpaRepository<Counter, Long> {

    @Query("SELECT DISTINCT c FROM Counter c LEFT JOIN FETCH c.counterEntries")
    List<Counter> findAll();
}

package com.pawemie.taskcounter.controller;

import com.pawemie.taskcounter.model.Counter;
import com.pawemie.taskcounter.service.CounterService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/counters")
public class CounterController {

    private final CounterService counterService;

    @PostMapping("/")
    public Counter saveCounter(@RequestBody Counter counter) {
        return counterService.saveCounter(counter);
    }

    @PutMapping("/{id}")
public Counter updateCounter(@PathVariable Long id){
        return counterService.updateCounter(id);
    }

    @GetMapping("all")
    public List<Counter> getCounters() {
        return counterService.getAllCounters();
    }

}

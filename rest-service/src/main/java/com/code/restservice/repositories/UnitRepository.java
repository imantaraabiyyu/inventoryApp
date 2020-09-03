package com.code.restservice.repositories;

import com.code.restservice.entities.Unit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnitRepository extends JpaRepository<Unit, Integer> {
    public List<Unit> findByNameContaining(String name);

    public List<Unit> findByDescriptionContaining(String description);

    public List<Unit> findByNameAndDescriptionContaining(
        String name,
        String description
    );
}

package com.code.restservice.repositories;

import com.code.restservice.entities.Item;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository
    extends JpaRepository<Item, Integer>, ItemRepositoryCustom {
    public List<Item> findByNameContaining(String name);

    public List<Item> findByDescriptionContaining(String description);

    public List<Item> findByNameAndDescriptionContaining(
        String name,
        String description
    );
}

package com.code.restservice.services.impl;

import com.code.restservice.entities.Item;
import com.code.restservice.repositories.ItemRepository;
import com.code.restservice.services.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemServiceImpl
    extends CommonServiceImpl<Item, Integer>
    implements ItemService {
    @Autowired
    private ItemRepository repository;

    @Override
    protected JpaRepository<Item, Integer> getRepository() {
        return repository;
    }
}

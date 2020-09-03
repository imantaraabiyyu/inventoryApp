package com.code.restservice.services.impl;

import com.code.restservice.entities.Unit;
import com.code.restservice.repositories.UnitRepository;
import com.code.restservice.services.UnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UnitServiceImpl
    extends CommonServiceImpl<Unit, Integer>
    implements UnitService {
    @Autowired
    private UnitRepository repository;

    @Override
    protected JpaRepository<Unit, Integer> getRepository() {
        return repository;
    }
}

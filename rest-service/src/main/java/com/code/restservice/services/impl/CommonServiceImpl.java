package com.code.restservice.services.impl;

import com.code.restservice.exceptions.EntityNotFoundException;
import com.code.restservice.services.CommonService;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Transactional
@Service
public abstract class CommonServiceImpl<E, PK> implements CommonService<E, PK> {

    protected abstract JpaRepository<E, PK> getRepository();

    @Override
    public E save(E entity) {
        return getRepository().save(entity);
    }

    @Override
    public E removeById(PK id) {
        E entity = findById(id);
        getRepository().delete(entity);

        return entity;
    }

    @Override
    public E findById(PK id) {
        return getRepository()
            .findById(id)
            .orElseThrow(
                () -> {
                    return new EntityNotFoundException();
                }
            );
    }

    @Override
    public List<E> findAll() {
        return getRepository().findAll();
    }

    @Override
    public Page<E> findAll(
        E entity,
        Direction sort,
        Integer page,
        Integer size
    ) {
        Sort s = Sort.Direction.DESC.equals(sort)
            ? Sort.by("id").descending()
            : Sort.by("id");

        ExampleMatcher matcher = ExampleMatcher
            .matchingAll()
            .withIgnoreCase()
            .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);

        Page<E> data = getRepository()
            .findAll(
                Example.of(entity, matcher),
                PageRequest.of(page, size, s)
            );

        if (data.isEmpty()) {
            throw new EntityNotFoundException();
        }

        return data;
    }

    @Override
    public List<E> removeAll(PK[] ids) {
        List<E> items = new ArrayList<>();
        for (PK id : ids) {
            E item = findById(id);
            items.add(item);
        }
        getRepository().deleteAll(items);
        return items;
    }
}

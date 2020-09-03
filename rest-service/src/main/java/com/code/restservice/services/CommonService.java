package com.code.restservice.services;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

public interface CommonService<E, PK> {
    public E save(E entity);

    public E removeById(PK id);

    public E findById(PK id);

    public List<E> findAll();

    public Page<E> findAll(
        E entity,
        Sort.Direction sort,
        Integer page,
        Integer size
    );

    public List<E> removeAll(PK[] ids);
}

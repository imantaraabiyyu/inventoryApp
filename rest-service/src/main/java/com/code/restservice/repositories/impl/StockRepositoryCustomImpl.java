package com.code.restservice.repositories.impl;

import com.code.restservice.dto.StockSummary;
import com.code.restservice.entities.Stock;
import com.code.restservice.repositories.StockRepositoryCustom;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class StockRepositoryCustomImpl implements StockRepositoryCustom {
    @Autowired
    private EntityManager entityManager;

    @Override
    public List<StockSummary> StockSummary() {
        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<StockSummary> summary = builder.createQuery(
            StockSummary.class
        );
        Root<Stock> root = summary.from(Stock.class);

        summary
            .multiselect(
                root.get("item").get("name"),
                root.get("unit").get("name"),
                builder.sum(root.get("qty"))
            )
            .groupBy(root.get("item"), root.get("unit"));
        return entityManager.createQuery(summary).getResultList();
    }
}

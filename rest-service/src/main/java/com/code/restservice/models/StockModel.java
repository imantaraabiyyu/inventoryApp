package com.code.restservice.models;

import com.code.restservice.validation.annotations.MinLength;

public class StockModel {
    private Integer id;

    @MinLength(1)
    private Integer qty;

    private ItemModel item;

    private UnitModel unit;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getQty() {
        return this.qty;
    }

    public void setQty(Integer qty) {
        this.qty = qty;
    }

    public ItemModel getItem() {
        return this.item;
    }

    public void setItem(ItemModel item) {
        this.item = item;
    }

    public UnitModel getUnit() {
        return this.unit;
    }

    public void setUnit(UnitModel unit) {
        this.unit = unit;
    }
}

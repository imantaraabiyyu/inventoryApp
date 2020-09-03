package com.code.restservice.dto;

public class StockSummary {
    private String itemName;
    private Long qty;
    private String unitName;

    public StockSummary(String itemName, String unitName, Long qty) {
        this.itemName = itemName;
        this.qty = qty;
        this.unitName = unitName;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public Long getQty() {
        return qty;
    }

    public void setQty(Long qty) {
        this.qty = qty;
    }

    public String getUnitName() {
        return unitName;
    }

    public void setUnitName(String unitName) {
        this.unitName = unitName;
    }

    @Override
    public String toString() {
        return (
            "StockSummary [itemName=" +
            itemName +
            ", qty=" +
            qty +
            ", unitName=" +
            unitName +
            "]"
        );
    }
}

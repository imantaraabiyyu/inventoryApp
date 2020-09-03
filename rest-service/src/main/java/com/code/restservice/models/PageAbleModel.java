package com.code.restservice.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import java.util.List;

public class PageAbleModel<T> {
    private List<T> list;
    private long page;
    private long size;
    private long total;

    @JsonInclude(Include.NON_NULL)
    private String from;

    @JsonInclude(Include.NON_NULL)
    private String to;

    public PageAbleModel(
        List<T> list,
        long page,
        long size,
        long total,
        String from,
        String to
    ) {
        this.list = list;
        this.page = page;
        this.size = size;
        this.total = total;
        this.from = from;
        this.to = to;
    }

    public PageAbleModel(List<T> list, long page, long size, long total) {
        this.list = list;
        this.page = page;
        this.size = size;
        this.total = total;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public long getPage() {
        return page;
    }

    public void setPage(long page) {
        this.page = page;
    }

    public long getSize() {
        return size;
    }

    public void setSize(long size) {
        this.size = size;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }
}

package com.code.restservice.models;

import com.code.restservice.validation.annotations.MinLength;
import javax.validation.constraints.NotBlank;

public class UnitModel {
    private Integer id;

    @MinLength(1)
    @NotBlank(message = "{name.not.blank}")
    private String name;

    @MinLength(3)
    @NotBlank(message = "{description.not.blank}")
    private String description;

    private boolean isUsed;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setIsUsed(boolean isUsed) {
        this.isUsed = isUsed;
    }

    public boolean getisUsed() {
        return isUsed;
    }
}

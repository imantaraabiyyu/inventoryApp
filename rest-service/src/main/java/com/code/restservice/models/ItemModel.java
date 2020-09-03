package com.code.restservice.models;

import com.code.restservice.validation.annotations.MinLength;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.List;
import javax.validation.constraints.NotBlank;

@ApiModel(value = "Item", description = "Model for item")
public class ItemModel {
    @ApiModelProperty(value = "item ID")
    private Integer id;

    @MinLength(3)
    @NotBlank(message = "{name.not.blank}")
    private String name;

    @MinLength(3)
    @NotBlank(message = "{description.not.blank}")
    private String description;

    private boolean isUsed;

    @JsonInclude(Include.NON_NULL)
    private List<ItemImageModel> images;

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

    public List<ItemImageModel> getImages() {
        return images;
    }

    public void setImages(List<ItemImageModel> images) {
        this.images = images;
    }

    public void setIsUsed(boolean isUsed) {
        this.isUsed = isUsed;
    }

    public boolean getisUsed() {
        return isUsed;
    }
}

package com.code.restservice.models;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

public class ItemImageModel {
    private String fileName;
    private String url;
    private String type;
    private Long size;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public static ItemImageModel form(Integer id, Path path)
        throws IOException {
        String fileName = path.getFileName().toString();
        String url = ServletUriComponentsBuilder
            .fromCurrentContextPath()
            .path("/items/" + id + "/images/")
            .path(fileName)
            .toUriString();
        ItemImageModel itemImage = new ItemImageModel();
        itemImage.setFileName(fileName);
        itemImage.setUrl(url);
        itemImage.setType(Files.probeContentType(path));
        itemImage.setSize(Files.size(path));

        return itemImage;
    }
}

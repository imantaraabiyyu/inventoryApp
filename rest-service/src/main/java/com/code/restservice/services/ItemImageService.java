package com.code.restservice.services;

import com.code.restservice.entities.Item;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface ItemImageService {
    public Resource load(Item item, String fileName) throws IOException;

    public boolean delete(Item item, String fileName) throws IOException;

    public Path save(Item item, MultipartFile file) throws IOException;

    public List<Path> findAll(Item item) throws IOException;
}

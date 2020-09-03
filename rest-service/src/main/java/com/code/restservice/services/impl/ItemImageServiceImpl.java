package com.code.restservice.services.impl;

import com.code.restservice.config.ApplicationProperties;
import com.code.restservice.entities.Item;
import com.code.restservice.exceptions.FileNotFoundException;
import com.code.restservice.services.ItemImageService;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ItemImageServiceImpl implements ItemImageService {
    private Path parentDir;

    @Autowired
    private ApplicationProperties properties;

    @PostConstruct
    public void init() throws IOException {
        parentDir =
            Paths
                .get(properties.getDataDir(), "/images/item")
                .toAbsolutePath()
                .normalize();

        Files.createDirectories(parentDir);
    }

    @Override
    public Path save(Item item, MultipartFile file) throws IOException {
        Integer id = item.getId();
        Path dir = parentDir.resolve(id.toString());
        Files.createDirectories(dir);

        Path target = dir.resolve(file.getOriginalFilename());
        Files.copy(
            file.getInputStream(),
            target,
            StandardCopyOption.REPLACE_EXISTING
        );

        return target;
    }

    @Override
    public List<Path> findAll(Item item) throws IOException {
        Integer id = item.getId();
        Path dir = parentDir.resolve(id.toString());

        return Files.isDirectory(dir)
            ? Files.list(dir).collect(Collectors.toList())
            : Collections.emptyList();
    }

    @Override
    public Resource load(Item item, String fileName) throws IOException {
        Integer id = item.getId();
        Path target = parentDir.resolve(id.toString()).resolve(fileName);
        Resource resource = new UrlResource(target.toUri());

        if (!target.toFile().exists()) {
            throw new FileNotFoundException();
        }

        return resource;
    }

    @Override
    public boolean delete(Item item, String fileName) throws IOException {
        Integer id = item.getId();
        Path target = parentDir.resolve(id.toString()).resolve(fileName);

        return Files.deleteIfExists(target);
    }
}

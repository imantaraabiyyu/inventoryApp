package com.code.restservice.controllers;

import com.code.restservice.entities.Item;
import com.code.restservice.models.ItemImageModel;
import com.code.restservice.models.ResponseModel;
import com.code.restservice.services.ItemImageService;
import com.code.restservice.services.ItemService;
import com.code.restservice.validation.annotations.ValidImage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.io.IOException;
import java.net.URLConnection;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/items/{id}/images")
@RestController
@Validated
@Api(
    value = "Item Image",
    tags = { "item image" },
    description = "Controller for item image"
)
public class ItemImageController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemImageService service;

    @ApiOperation(
        value = "upload images",
        produces = "json",
        tags = { "item images" }
    )
    @ApiResponses(
        {
            @ApiResponse(
                code = 200,
                message = "OK",
                response = ResponseModel.class
            ),
            @ApiResponse(code = 404, message = "Entity Not Found")
        }
    )
    @PostMapping
    public ResponseModel<List<ItemImageModel>> upload(
        @PathVariable Integer id,
        @RequestParam @ValidImage @ApiParam(
            name = "files",
            type = ".jpg/.jpeg/.png",
            value = "use this param to attach your files.",
            required = true
        ) MultipartFile[] files
    )
        throws IOException {
        Item entity = itemService.findById(id);
        List<ItemImageModel> data = new ArrayList<>();

        for (MultipartFile file : files) {
            Path path = service.save(entity, file);
            ItemImageModel itemImageData = ItemImageModel.form(id, path);
            data.add(itemImageData);
        }

        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Find Images By Id",
        produces = "json",
        tags = { "item images" }
    )
    @ApiResponses(
        {
            @ApiResponse(
                code = 200,
                message = "OK",
                response = ResponseModel.class
            ),
            @ApiResponse(code = 404, message = "Entity Not Found")
        }
    )
    @GetMapping
    public ResponseModel<List<ItemImageModel>> findAll(
        @PathVariable Integer id
    )
        throws IOException {
        Item entity = itemService.findById(id);
        List<ItemImageModel> data = new ArrayList<>();
        List<Path> paths = service.findAll(entity);

        for (Path path : paths) {
            ItemImageModel itemImageData = ItemImageModel.form(id, path);
            data.add(itemImageData);
        }

        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Download",
        produces = "file",
        tags = { "item images" }
    )
    @ApiResponses(
        {
            @ApiResponse(
                code = 200,
                message = "OK",
                response = ResponseModel.class
            ),
            @ApiResponse(
                code = 404,
                message = "Entity Not Found/File Not Found"
            )
        }
    )
    @GetMapping("/{filename}")
    public ResponseEntity<Resource> download(
        @PathVariable Integer id,
        @PathVariable String filename
    )
        throws IOException {
        Item entity = itemService.findById(id);
        Resource resource = service.load(entity, filename);

        String mediaType = URLConnection.guessContentTypeFromName(
            resource.getFilename()
        );
        return ResponseEntity
            .ok()
            .contentType(MediaType.parseMediaType(mediaType))
            .header(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=\"" + resource.getFilename() + "\""
            )
            .body(resource);
    }

    @DeleteMapping("/{filename}")
    public ResponseModel<Boolean> delete(
        @PathVariable Integer id,
        @PathVariable String filename
    )
        throws IOException {
        Item entity = itemService.findById(id);
        Boolean data = service.delete(entity, filename);
        return ResponseModel.success(data);
    }
}

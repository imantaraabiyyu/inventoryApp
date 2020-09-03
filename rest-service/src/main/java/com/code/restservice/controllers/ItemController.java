package com.code.restservice.controllers;

import com.code.restservice.entities.Item;
import com.code.restservice.models.ItemImageModel;
import com.code.restservice.models.ItemModel;
import com.code.restservice.models.PageAbleModel;
import com.code.restservice.models.ResponseModel;
import com.code.restservice.services.ItemImageService;
import com.code.restservice.services.ItemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.io.IOException;
import java.lang.reflect.Type;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://domain2.com", maxAge = 3600)
@RequestMapping("/items")
@RestController
@Validated
@Api(value = "Item", tags = { "item" }, description = "Controller for item")
public class ItemController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private ItemImageService itemImageService;

    @ApiOperation(value = "Find All Item", tags = { "item" })
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
    @GetMapping(produces = "application/json")
    public ResponseModel<PageAbleModel<ItemModel>> findAll(
        @RequestParam(required = false) @ApiParam(
            name = "name",
            type = "String",
            value = "Use this field to find records containing this parameter.",
            example = "Coffee",
            required = false
        ) String name,
        @RequestParam(required = false) @ApiParam(
            name = "description",
            type = "String",
            value = "Use this field to find records containing this parameter.",
            example = "tasty",
            required = false
        ) String description,
        @RequestParam(defaultValue = "asc") @ApiParam(
            name = "sort",
            type = "String",
            value = "Use this field to set order by of data you want to show {defaultValue = asc} .",
            example = "1",
            required = false
        ) String sort,
        @RequestParam(defaultValue = "0") @ApiParam(
            name = "page",
            type = "Integer",
            value = "Use this field to set which you want show, this parameter start from 0 {defaultValue = 0}.",
            example = "1",
            required = false
        ) Integer page,
        @RequestParam(defaultValue = "10") @Max(100) @ApiParam(
            name = "size",
            type = "Integer",
            value = "Use this field to set how much data you want to show {defaultValue = 10} maximum is 100.",
            example = "5",
            required = false
        ) Integer size
    )
        throws IOException {
        Item entity = new Item(name, description);
        Sort.Direction direction = sort != null
            ? Sort.Direction.valueOf(sort.toUpperCase())
            : null;

        Page<Item> pageitems = itemService.findAll(
            entity,
            direction,
            page,
            size
        );
        List<Item> items = pageitems.toList();

        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<ItemModel>>() {}.getType();

        List<ItemModel> itemModels = modelMapper.map(items, type);
        for (ItemModel itemModel : itemModels) {
            Item item = itemService.findById(itemModel.getId());
            List<ItemImageModel> images = new ArrayList<>();
            List<Path> paths = itemImageService.findAll(item);
            for (Path path : paths) {
                ItemImageModel itemImageData = ItemImageModel.form(
                    itemModel.getId(),
                    path
                );
                images.add(itemImageData);
            }

            itemModel.setImages(images);
        }
        PageAbleModel<ItemModel> data = new PageAbleModel<>(
            itemModels,
            pageitems.getNumber(),
            pageitems.getSize(),
            pageitems.getTotalElements()
        );
        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Find Item By Id",
        produces = "json",
        tags = { "item" }
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
    @GetMapping(path = "/{id}", produces = "application/json")
    public ResponseModel<ItemModel> findById(@PathVariable Integer id)
        throws IOException {
        Item item = itemService.findById(id);

        ModelMapper modelMapper = new ModelMapper();
        ItemModel data = modelMapper.map(item, ItemModel.class);
        Item itemData = itemService.findById(data.getId());

        List<ItemImageModel> images = new ArrayList<>();
        List<Path> paths = itemImageService.findAll(itemData);
        for (Path path : paths) {
            ItemImageModel itemImageData = ItemImageModel.form(
                data.getId(),
                path
            );
            images.add(itemImageData);
        }

        data.setImages(images);

        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Add Item",
        produces = "json",
        consumes = "json",
        tags = { "item" }
    )
    @ApiResponses(
        {
            @ApiResponse(
                code = 201,
                message = "Created",
                response = ResponseModel.class
            ),
            @ApiResponse(code = 400, message = "Illegal Argument")
        }
    )
    @PostMapping(produces = "application/json", consumes = "application/json")
    public ResponseModel<ItemModel> add(@RequestBody @Valid ItemModel model) {
        Item addedItem = itemService.save(
            new Item(model.getName(), model.getDescription())
        );

        ModelMapper modelMapper = new ModelMapper();
        ItemModel data = modelMapper.map(addedItem, ItemModel.class);

        return ResponseModel.successAdd(data);
    }

    @ApiOperation(
        value = "Edit Item",
        produces = "json",
        consumes = "json",
        tags = { "item" }
    )
    @ApiResponses(
        {
            @ApiResponse(
                code = 200,
                message = "OK",
                response = ResponseModel.class
            ),
            @ApiResponse(code = 400, message = "Illegal Argument")
        }
    )
    @PutMapping(produces = "application/json", consumes = "application/json")
    public ResponseModel<ItemModel> edit(@RequestBody @Valid ItemModel model) {
        model.setId(model.getId());
        ModelMapper modelMapper = new ModelMapper();
        Item entity = itemService.findById(model.getId());
        modelMapper.map(model, entity);

        Item editedItem = itemService.save(entity);
        ItemModel data = modelMapper.map(editedItem, ItemModel.class);
        return ResponseModel.success(data);
    }

    @ApiOperation(value = "Delete Item", produces = "json", tags = { "item" })
    @ApiResponses(
        {
            @ApiResponse(
                code = 200,
                message = "Created",
                response = ResponseModel.class
            ),
            @ApiResponse(code = 404, message = "Entity Not Found")
        }
    )
    @DeleteMapping(path = "/{id}", produces = "application/json")
    public ResponseModel<ItemModel> delete(@PathVariable Integer id) {
        Item deletedItem = itemService.removeById(id);

        ModelMapper modelMapper = new ModelMapper();
        ItemModel data = modelMapper.map(deletedItem, ItemModel.class);

        return ResponseModel.success(data);
    }

    @DeleteMapping(produces = "application/json")
    public ResponseModel<List<ItemModel>> delete(@RequestParam Integer[] ids) {
        List<Item> deletedItems = itemService.removeAll(ids);
        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<ItemModel>>() {}.getType();
        List<ItemModel> data = modelMapper.map(deletedItems, type);

        return ResponseModel.success(data);
    }
}

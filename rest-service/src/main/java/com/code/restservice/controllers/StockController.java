package com.code.restservice.controllers;

import com.code.restservice.dto.StockSummary;
import com.code.restservice.entities.Item;
import com.code.restservice.entities.Stock;
import com.code.restservice.entities.Unit;
import com.code.restservice.models.PageAbleModel;
import com.code.restservice.models.ResponseModel;
import com.code.restservice.models.StockModel;
import com.code.restservice.models.StockRequestModel;
import com.code.restservice.services.ItemService;
import com.code.restservice.services.StockService;
import com.code.restservice.services.UnitService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.lang.reflect.Type;
import java.util.List;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/stocks")
@RestController
@Validated
@Api(value = "Stock", tags = { "stock" }, description = "Controller for stock")
public class StockController {
    @Autowired
    private ItemService itemService;

    @Autowired
    private UnitService unitService;

    @Autowired
    private StockService stockService;

    @ApiOperation(value = "Find All Stock", tags = { "stock" })
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
    public ResponseModel<PageAbleModel<StockModel>> findAll(
        @RequestParam(required = false) @ApiParam(
            name = "itemName",
            type = "String",
            value = "Use this field to find records containing this parameter.",
            example = "Coffee",
            required = false
        ) String itemName,
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
    ) {
        Item item = new Item(itemName, null);
        Stock entity = new Stock(null, item, null);
        Sort.Direction direction = sort != null
            ? Sort.Direction.valueOf(sort.toUpperCase())
            : null;

        Page<Stock> pageStocks = stockService.findAll(
            entity,
            direction,
            page,
            size
        );
        List<Stock> stocks = pageStocks.toList();

        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<StockModel>>() {}.getType();

        List<StockModel> stockModels = modelMapper.map(stocks, type);
        PageAbleModel<StockModel> data = new PageAbleModel<>(
            stockModels,
            pageStocks.getNumber(),
            pageStocks.getSize(),
            pageStocks.getTotalElements()
        );
        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Find Stock By Id",
        produces = "json",
        tags = { "stock" }
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
    public ResponseModel<StockModel> findById(@PathVariable Integer id) {
        Stock stock = stockService.findById(id);

        ModelMapper modelMapper = new ModelMapper();
        StockModel data = modelMapper.map(stock, StockModel.class);

        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Stock Summary",
        produces = "json",
        tags = { "stock" }
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
    @GetMapping(path = "/summary", produces = "application/json")
    public ResponseModel<List<StockSummary>> summary() {
        List<StockSummary> data = stockService.StockSummary();
        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Add Stock",
        produces = "json",
        consumes = "json",
        tags = { "stock" }
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
    public ResponseModel<StockModel> add(
        @RequestBody @Valid StockRequestModel model
    ) {
        Integer qty = model.getQty();
        Item item = itemService.findById(model.getItemId());
        Unit unit = unitService.findById(model.getUnitId());
        Stock addedStock = stockService.save(new Stock(qty, item, unit));

        ModelMapper modelMapper = new ModelMapper();
        StockModel data = modelMapper.map(addedStock, StockModel.class);

        return ResponseModel.successAdd(data);
    }

    @ApiOperation(
        value = "Edit Stock",
        produces = "json",
        consumes = "json",
        tags = { "stock" }
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
    public ResponseModel<StockModel> edit(
        @RequestBody @Valid StockRequestModel model
    ) {
        model.setId(model.getId());
        ModelMapper modelMapper = new ModelMapper();
        Stock entity = stockService.findById(model.getId());
        entity.setItem(itemService.findById(model.getItemId()));
        entity.setUnit(unitService.findById(model.getUnitId()));
        modelMapper.map(model, entity);

        Stock editedStock = stockService.save(entity);
        StockModel data = modelMapper.map(editedStock, StockModel.class);
        return ResponseModel.success(data);
    }

    @ApiOperation(value = "Delete Stock", produces = "json", tags = { "stock" })
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
    public ResponseModel<StockModel> delete(@PathVariable Integer id) {
        Stock deletedStock = stockService.removeById(id);

        ModelMapper modelMapper = new ModelMapper();
        StockModel data = modelMapper.map(deletedStock, StockModel.class);

        return ResponseModel.success(data);
    }

    @DeleteMapping(produces = "application/json")
    public ResponseModel<List<StockModel>> delete(@RequestParam Integer[] ids) {
        List<Stock> deletedStocks = stockService.removeAll(ids);
        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<StockModel>>() {}.getType();
        List<StockModel> data = modelMapper.map(deletedStocks, type);

        return ResponseModel.success(data);
    }
}

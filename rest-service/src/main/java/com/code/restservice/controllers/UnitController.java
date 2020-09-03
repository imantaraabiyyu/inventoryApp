package com.code.restservice.controllers;

import com.code.restservice.entities.Unit;
import com.code.restservice.models.PageAbleModel;
import com.code.restservice.models.ResponseModel;
import com.code.restservice.models.UnitModel;
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

@RequestMapping("/units")
@RestController
@Validated
@Api(value = "Unit", tags = { "unit" }, description = "Controller for unit")
public class UnitController {
    @Autowired
    private UnitService unitService;

    @ApiOperation(value = "Find All Unit", tags = { "unit" })
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
    public ResponseModel<PageAbleModel<UnitModel>> findAll(
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
    ) {
        Unit entity = new Unit(name, description);
        Sort.Direction direction = sort != null
            ? Sort.Direction.valueOf(sort.toUpperCase())
            : null;

        Page<Unit> pageUnits = unitService.findAll(
            entity,
            direction,
            page,
            size
        );
        List<Unit> Units = pageUnits.toList();

        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<UnitModel>>() {}.getType();

        List<UnitModel> UnitModels = modelMapper.map(Units, type);
        PageAbleModel<UnitModel> data = new PageAbleModel<>(
            UnitModels,
            pageUnits.getNumber(),
            pageUnits.getSize(),
            pageUnits.getTotalElements()
        );
        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Find Unit By Id",
        produces = "json",
        tags = { "unit" }
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
    public ResponseModel<UnitModel> findById(@PathVariable Integer id) {
        Unit Unit = unitService.findById(id);

        ModelMapper modelMapper = new ModelMapper();
        UnitModel data = modelMapper.map(Unit, UnitModel.class);

        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Add Unit",
        produces = "json",
        consumes = "json",
        tags = { "unit" }
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
    public ResponseModel<UnitModel> add(@RequestBody @Valid UnitModel model) {
        Unit addedUnit = unitService.save(
            new Unit(model.getName(), model.getDescription())
        );

        ModelMapper modelMapper = new ModelMapper();
        UnitModel data = modelMapper.map(addedUnit, UnitModel.class);

        return ResponseModel.successAdd(data);
    }

    @ApiOperation(
        value = "Edit Unit",
        produces = "json",
        consumes = "json",
        tags = { "unit" }
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
    public ResponseModel<UnitModel> edit(@RequestBody @Valid UnitModel model) {
        model.setId(model.getId());
        ModelMapper modelMapper = new ModelMapper();
        Unit entity = unitService.findById(model.getId());
        modelMapper.map(model, entity);

        Unit editedUnit = unitService.save(entity);
        UnitModel data = modelMapper.map(editedUnit, UnitModel.class);
        return ResponseModel.success(data);
    }

    @ApiOperation(value = "Delete Unit", produces = "json", tags = { "unit" })
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
    public ResponseModel<UnitModel> delete(@PathVariable Integer id) {
        Unit deletedUnit = unitService.removeById(id);

        ModelMapper modelMapper = new ModelMapper();
        UnitModel data = modelMapper.map(deletedUnit, UnitModel.class);

        return ResponseModel.success(data);
    }

    @DeleteMapping(produces = "application/json")
    public ResponseModel<List<UnitModel>> delete(@RequestParam Integer[] ids) {
        List<Unit> deletedUnits = unitService.removeAll(ids);
        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<UnitModel>>() {}.getType();
        List<UnitModel> data = modelMapper.map(deletedUnits, type);

        return ResponseModel.success(data);
    }
}

package com.code.restservice.controllers;

import com.code.restservice.dto.TransactionSummary;
import com.code.restservice.entities.Transaction;
import com.code.restservice.entities.TransactionType;
import com.code.restservice.models.PageAbleModel;
import com.code.restservice.models.ResponseModel;
import com.code.restservice.models.TransactionModel;
import com.code.restservice.models.TransactionSummaryModel;
import com.code.restservice.services.TransactionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import java.lang.reflect.Type;
import java.time.Month;
import java.time.Year;
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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/transactions")
@RestController
@Validated
@Api(
    value = "Transaction",
    tags = { "transaction" },
    description = "Controller for transaction"
)
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @ApiOperation(value = "Find All Transaction", tags = { "transaction" })
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
    public ResponseModel<PageAbleModel<TransactionModel>> findAll(
        @RequestParam(required = false, defaultValue = "4") @ApiParam(
            name = "Transaction Type",
            type = "Enum/Integer",
            value = "Use this field to find records containing this parameter, this enum start from purchase(0),sell(1),and payday(2).",
            example = "1",
            required = false
        ) Integer type,
        @RequestParam(required = false) @ApiParam(
            name = "from",
            type = "String",
            value = "Use this field to find records containing this parameter.",
            example = "2020-03-01",
            required = false
        ) String from,
        @RequestParam(required = false) @ApiParam(
            name = "to",
            type = "String",
            value = "Use this field to find records containing this parameter.",
            example = "2020-03-31",
            required = false
        ) String to,
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
        TransactionType getType = TransactionType.toEnum(type);

        Transaction entity = new Transaction(null, getType, null);
        Sort.Direction direction = sort != null
            ? Sort.Direction.valueOf(sort.toUpperCase())
            : null;

        Page<Transaction> pageTransaction = from != null && to != null
            ? transactionService.findFiltered(
                type,
                from,
                to,
                direction,
                page,
                size
            )
            : transactionService.findAll(entity, direction, page, size);
        List<Transaction> transactions = pageTransaction.toList();

        ModelMapper modelMapper = new ModelMapper();
        Type typed = new TypeToken<List<TransactionModel>>() {}.getType();

        List<TransactionModel> transactionModels = modelMapper.map(
            transactions,
            typed
        );
        PageAbleModel<TransactionModel> data = new PageAbleModel<>(
            transactionModels,
            pageTransaction.getNumber(),
            pageTransaction.getSize(),
            pageTransaction.getTotalElements(),
            from,
            to
        );
        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Find Transaction By Id",
        produces = "json",
        tags = { "transaction" }
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
    public ResponseModel<TransactionModel> findById(@PathVariable Integer id) {
        Transaction transaction = transactionService.findById(id);

        ModelMapper modelMapper = new ModelMapper();
        TransactionModel data = modelMapper.map(
            transaction,
            TransactionModel.class
        );

        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Transaction Summary",
        produces = "json",
        tags = { "transaction" }
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
    public ResponseModel<TransactionSummaryModel> summary(
        @RequestParam(required = false) @ApiParam(
            name = "year",
            type = "Integer",
            value = "Use this field to set year of summary you want to show.",
            example = "2020",
            required = false
        ) Integer year,
        @RequestParam(required = false) @ApiParam(
            name = "month",
            type = "Integer",
            value = "Use this field to set month of summary you want to show.",
            example = "3",
            required = false
        ) Integer month,
        @RequestParam(required = false) @ApiParam(
            name = "date",
            type = "Integer",
            value = "Use this field to set date of summary you want to show.",
            example = "4",
            required = false
        ) Integer date
    ) {
        TransactionSummaryModel transactions = transactionService.summary(
            year != null ? Year.of(year) : Year.now(),
            month != null ? Month.of(month) : null,
            date != null ? date : null
        );

        return ResponseModel.success(transactions);
    }

    @GetMapping(path = "/annual", produces = "application/json")
    public ResponseModel<List<List<Long>>> annual(
        @RequestParam(required = false) @ApiParam(
            name = "year",
            type = "Integer",
            value = "Use this field to set year of summary you want to show.",
            example = "2020",
            required = false
        ) Integer year
    ) {
        List<List<Long>> data = new ArrayList<>();
        List<Long> type0 = new ArrayList<>();
        List<Long> type1 = new ArrayList<>();
        List<Long> type2 = new ArrayList<>();
        for (int i = 1; i <= 12; i++) {
            List<TransactionSummary> monthly = transactionService.annual(
                Year.of(year),
                Month.of(i)
            );

            for (TransactionSummary transactionSummary : monthly) {
                if (transactionSummary.getType() == TransactionType.PURCHASE) {
                    type0.add(transactionSummary.getAmount());
                } else if (
                    transactionSummary.getType() == TransactionType.SELL
                ) {
                    type1.add(transactionSummary.getAmount());
                } else {
                    type2.add(transactionSummary.getAmount());
                }
            }
            if (
                !monthly
                    .stream()
                    .anyMatch(
                        trans -> trans.getType() == TransactionType.PURCHASE
                    )
            ) {
                type0.add(0l);
            }
            if (
                !monthly
                    .stream()
                    .anyMatch(trans -> trans.getType() == TransactionType.SELL)
            ) {
                type1.add(0l);
            }
            if (
                !monthly
                    .stream()
                    .anyMatch(
                        trans -> trans.getType() == TransactionType.PAYDAY
                    )
            ) {
                type2.add(0l);
            }
        }

        data.add(type0);
        data.add(type1);
        data.add(type2);
        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Add Transaction",
        produces = "json",
        consumes = "json",
        tags = { "transaction" }
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
    public ResponseModel<TransactionModel> add(
        @RequestBody @Valid TransactionModel model
    ) {
        Transaction addedTransaction = transactionService.save(
            new Transaction(
                model.getAmount(),
                model.getType(),
                model.getDescription()
            )
        );

        ModelMapper modelMapper = new ModelMapper();
        TransactionModel data = modelMapper.map(
            addedTransaction,
            TransactionModel.class
        );

        return ResponseModel.successAdd(data);
    }

    @ApiOperation(
        value = "Edit Transaction",
        produces = "json",
        consumes = "json",
        tags = { "transaction" }
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
    public ResponseModel<TransactionModel> edit(
        @RequestBody @Valid TransactionModel model
    ) {
        model.setId(model.getId());
        ModelMapper modelMapper = new ModelMapper();
        Transaction entity = transactionService.findById(model.getId());
        modelMapper.map(model, entity);

        Transaction editedTransaction = transactionService.save(entity);
        TransactionModel data = modelMapper.map(
            editedTransaction,
            TransactionModel.class
        );
        return ResponseModel.success(data);
    }

    @ApiOperation(
        value = "Delete Transaction",
        produces = "json",
        tags = { "transaction" }
    )
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
    public ResponseModel<TransactionModel> delete(@PathVariable Integer id) {
        Transaction deletedTransaction = transactionService.removeById(id);

        ModelMapper modelMapper = new ModelMapper();
        TransactionModel data = modelMapper.map(
            deletedTransaction,
            TransactionModel.class
        );

        return ResponseModel.success(data);
    }

    @DeleteMapping(produces = "application/json")
    public ResponseModel<List<TransactionModel>> delete(
        @RequestParam Integer[] ids
    ) {
        List<Transaction> deletedTransactions = transactionService.removeAll(
            ids
        );
        ModelMapper modelMapper = new ModelMapper();
        Type type = new TypeToken<List<TransactionModel>>() {}.getType();
        List<TransactionModel> data = modelMapper.map(
            deletedTransactions,
            type
        );

        return ResponseModel.success(data);
    }
}

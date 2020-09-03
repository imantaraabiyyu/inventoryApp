package com.code.restservice.validation.annotations;

import com.code.restservice.entities.TransactionType;
import com.code.restservice.exceptions.IllegalArgumentException;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class TypeAttributeConverter
    implements AttributeConverter<TransactionType, Integer> {

    @Override
    public Integer convertToDatabaseColumn(TransactionType attribute) {
        if (attribute == null) return null;

        switch (attribute) {
            case PURCHASE:
                return 0;
            case SELL:
                return 1;
            case PAYDAY:
                return 2;
            default:
                throw new IllegalArgumentException();
        }
    }

    @Override
    public TransactionType convertToEntityAttribute(Integer dbData) {
        if (dbData == null) return null;

        switch (dbData) {
            case 0:
                return TransactionType.PURCHASE;
            case 1:
                return TransactionType.SELL;
            case 2:
                return TransactionType.PAYDAY;
            default:
                throw new IllegalArgumentException();
        }
    }
}

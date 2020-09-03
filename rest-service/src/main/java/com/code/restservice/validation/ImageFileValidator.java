package com.code.restservice.validation;

import com.code.restservice.validation.annotations.ValidImage;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import org.springframework.web.multipart.MultipartFile;

public class ImageFileValidator
    implements ConstraintValidator<ValidImage, MultipartFile[]> {

    @Override
    public void initialize(ValidImage constraintAnnotation) {}

    @Override
    public boolean isValid(
        MultipartFile[] files,
        ConstraintValidatorContext context
    ) {
        boolean result = true;
        for (MultipartFile file : files) {
            String contentType = file.getContentType();

            if (!isSupportedContentType(contentType)) {
                return false;
            }
        }

        return result;
    }

    private boolean isSupportedContentType(String contentType) {
        return (
            contentType.equals("image/png") ||
            contentType.equals("image/jpg") ||
            contentType.equals("image/jpeg")
        );
    }
}

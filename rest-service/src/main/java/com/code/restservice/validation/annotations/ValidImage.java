package com.code.restservice.validation.annotations;

import com.code.restservice.validation.ImageFileValidator;
import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import javax.validation.Constraint;
import javax.validation.Payload;

@Target({ ElementType.PARAMETER, ElementType.FIELD, ElementType.METHOD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = ImageFileValidator.class)
@Documented
public @interface ValidImage {
    String message() default "{valid.image.message}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

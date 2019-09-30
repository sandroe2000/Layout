package br.com.sdvs.builder.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NO_CONTENT)
public class NotContextException extends RuntimeException {
    public NotContextException() {
        super();
    }

    public NotContextException(String message) {
        super(message);
    }
}
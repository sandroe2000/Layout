package br.com.sdvs.builder.service;

import org.springframework.stereotype.Service;

@Service
public interface FileService {

    public void createFile(String fileName, String content);
}

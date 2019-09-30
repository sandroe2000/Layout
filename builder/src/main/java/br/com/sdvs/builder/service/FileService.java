package br.com.sdvs.builder.service;

import br.com.sdvs.builder.model.File;
import org.springframework.stereotype.Service;

@Service
public interface FileService {

    public boolean createFile(File file);
}

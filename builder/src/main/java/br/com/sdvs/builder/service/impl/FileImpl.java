package br.com.sdvs.builder.service.impl;

import br.com.sdvs.builder.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Service
public class FileImpl implements FileService {

    @Value("${app.base.path}")
    private String path;

    @Value("${app.base.front}")
    private String frontPath;

    @Value("${app.base.constants}")
    private String constantsPath;

    private String name;
    private String content;

    @Override
    public boolean createFile(br.com.sdvs.builder.model.File newFile) {

        BufferedWriter output = null;
        boolean isCreated = false;
        this.name = newFile.getName();
        this.content = newFile.getContent();

        try {
            File file = new File(path.concat(name));
            output = new BufferedWriter(new FileWriter(file));
            output.write(content);
            output.close();
            isCreated = true;
        } catch (IOException ex){
            ex.printStackTrace();
        }

        return isCreated;
    }
}


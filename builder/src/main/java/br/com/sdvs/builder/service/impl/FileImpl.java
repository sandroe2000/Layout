package br.com.sdvs.builder.service.impl;

import br.com.sdvs.builder.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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
    public boolean createFile(br.com.sdvs.builder.model.File file) {

        boolean isCreated = false;
        this.name = file.getName();
        this.content = file.getContent();

        try{
            //File newFile = new File(path.concat(name));
            FileWriter fw=new FileWriter(path.concat(name));
            fw.write(content);
            fw.close();
            isCreated = true;
        }catch(IOException ex){
            System.out.println(ex);
        }catch(Exception ex){
            System.out.println(ex);
        }

        return isCreated;
    }
}


package br.com.sdvs.builder.service.impl;

import br.com.sdvs.builder.service.FileService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

@Service
public class FileImpl implements FileService {

    @Value("${app.base.front}")
    private String frontPath;

    @Value("${app.base.constants}")
    private String constantsPath;

    private String fileName;
    private String content;

    @Override
    public void createFile(String fileName, String content) {
        this.fileName = fileName;
        this.content = content;
        try{
            File file = new File(constantsPath.concat(fileName));
            FileWriter fw=new FileWriter(constantsPath.concat(fileName));
            fw.write(content);
            fw.close();
        }catch(IOException ex){
            System.out.println(ex);
        }catch(Exception ex){
            System.out.println(ex);
        }
    }
}


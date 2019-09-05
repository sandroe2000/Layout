package br.com.sdvs.builder.controller;

import br.com.sdvs.builder.model.File;
import br.com.sdvs.builder.repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("files")
public class FileController {

    @Autowired
    private FileRepository repository;

    public FileController(){}

    @GetMapping(value="containers")
    public ResponseEntity<List<File>> findAllFiles(){
        List<File> entitys = repository.findByDisabledIsNull();
        return new ResponseEntity<>(entitys, HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<List<File>> createFile(){
        List<File> entitys = repository.findByDisabledIsNull();
        return new ResponseEntity<>(entitys, HttpStatus.OK);
    }
}

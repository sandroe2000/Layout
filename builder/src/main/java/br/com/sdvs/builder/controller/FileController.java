package br.com.sdvs.builder.controller;

import br.com.sdvs.builder.model.File;
import br.com.sdvs.builder.repository.FileRepository;
import br.com.sdvs.builder.service.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("files")
public class FileController {

    @Autowired
    private FileRepository repository;

    @Autowired
    private FileService service;

    public FileController(){}

    @GetMapping()
    public ResponseEntity<List<File>> findAllFiles(){
        List<File> files = repository.findByDisabledIsNull();
        return new ResponseEntity<>(files, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> createFile(@RequestBody File file, HttpServletRequest request){
        boolean isCreated = service.createFile(file);
        return new ResponseEntity<>(isCreated, HttpStatus.OK);
    }
}

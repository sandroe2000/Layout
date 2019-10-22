package br.com.sdvs.builder.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.sdvs.builder.model.Folder;
import br.com.sdvs.builder.service.FolderSevice;

@RestController
@RequestMapping("folders")
public class FolderRestController {

    @Autowired
    FolderSevice folderSevice;

    @GetMapping(value = "/{id}")
    public ResponseEntity<Folder> findById(@PathVariable("id") Long id) {
        return folderSevice.findById(id);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    ResponseEntity<Folder> editFolder(@RequestBody Folder editFolder, @PathVariable("id") Long id) {
        return folderSevice.editFolder(editFolder, id);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    Folder newFolder(@RequestBody Folder newFolder) {
        return folderSevice.newFolder(newFolder);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Folder> delete(@PathVariable("id") long id) {
        return folderSevice.delete(id);
       }
}

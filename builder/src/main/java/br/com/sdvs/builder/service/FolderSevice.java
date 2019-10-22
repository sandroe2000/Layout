package br.com.sdvs.builder.service;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.sdvs.builder.model.Folder;

@Service
public interface FolderSevice{

    ResponseEntity<Folder> findById(Long id);
    Folder newFolder(Folder folder);
    ResponseEntity<Folder> editFolder(Folder folder, Long id);
    ResponseEntity<Folder> delete(Long id);
}
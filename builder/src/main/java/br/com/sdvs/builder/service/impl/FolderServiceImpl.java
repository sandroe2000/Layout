package br.com.sdvs.builder.service.impl;

import java.util.Date;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import br.com.sdvs.builder.exception.NotContextException;
import br.com.sdvs.builder.model.File;
import br.com.sdvs.builder.model.Folder;
import br.com.sdvs.builder.repository.FileRepository;
import br.com.sdvs.builder.repository.FolderRepository;
import br.com.sdvs.builder.service.FolderSevice;

@Service
public class FolderServiceImpl implements FolderSevice {

    @Autowired
    private FolderRepository folderRepository;

    @Autowired
    private FileRepository fileRepository;

    @Override
    public ResponseEntity<Folder> findById(Long id) {
        
        Folder folder = null;
        Set<Folder> folders = null;
        Set<File> files = null;

        Optional<Folder> optionalFolder = folderRepository.findByIdAndDisabledIsNull(id);
        folder = optionalFolder.get(); 

        if(folder != null){            
            folders = folderRepository.findByParent(id);
            files = fileRepository.findByParent(id);
        }        
        if(!folders.isEmpty()) { folder.setFolders(folders); } 
        if(!files.isEmpty()) { folder.setFiles(files); }

        return new ResponseEntity<>(folder, HttpStatus.OK);
    }

    @Override
    public Folder newFolder(Folder newFolder) {
        return folderRepository.save(newFolder);
    }

    @Override
    public ResponseEntity<Folder> editFolder(Folder entity, Long id) {
        return folderRepository.findById(id)
                .map(record -> {
                    record.setName(entity.getName());
                    record.setVisible(entity.isVisible());
                    record.setCreated(entity.getCreated());
                    record.setModified(entity.getModified());                    
                    record.setParent(entity.getParent());
                    record.setFolders(entity.getFolders());
                    record.setFiles(entity.getFiles());
                    Folder updated = folderRepository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElseThrow(() -> new NotContextException(String.format("Folder [id: %d] não encontrado!", id)));
    }

    @Override
    public ResponseEntity<Folder> delete(Long id) {
        return folderRepository.findById(id)
                .map(record -> {
                    record.setDisabled(new Date());
                    Folder updated = folderRepository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElseThrow(() -> new NotContextException(String.format("Folder [id: %d] não encontrado!", id)));
    }
}
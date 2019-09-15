package br.com.sdvs.builder.repository;

import br.com.sdvs.builder.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findByDisabledIsNull();
}
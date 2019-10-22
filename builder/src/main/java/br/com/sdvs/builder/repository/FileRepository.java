package br.com.sdvs.builder.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.sdvs.builder.model.File;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

    List<File> findByDisabledIsNull();

    @Query("SELECT f FROM File f WHERE f.disabled IS NULL AND f.parent.id LIKE ?1")
    Set<File> findByParent(Long parent);
}
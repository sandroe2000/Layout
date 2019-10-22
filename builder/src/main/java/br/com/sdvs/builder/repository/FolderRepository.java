package br.com.sdvs.builder.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.com.sdvs.builder.model.Folder;

@Repository
public interface FolderRepository extends JpaRepository<Folder, Long> {
    
    @Query("SELECT f FROM Folder f WHERE f.disabled IS NULL AND f.parent.id LIKE ?1")
    Set<Folder> findByParent(Long parent);

	Optional<Folder> findByIdAndDisabledIsNull(Long id);
}
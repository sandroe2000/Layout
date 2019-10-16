package br.com.sdvs.builder.controller;

import br.com.sdvs.builder.exception.NotContextException;
import br.com.sdvs.builder.model.Endpoint;
import br.com.sdvs.builder.repository.EndpointRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("endpoints")
public class EndpointRestController {

    @Autowired
    private EndpointRepository repository;

    @GetMapping()
    public List<Endpoint> findByDisabledIsNull(){
        return repository.findByDisabledIsNull()
                .orElseThrow(() -> new NotContextException(String.format("Nenhum endipoint foi encontrado!")));
    }

    @GetMapping(value = "pageable")
    public Page<Endpoint> listSearchJpa(
            @RequestParam("description") String description,
            @PageableDefault(page = 0, size = 5, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return repository.findPageable(description.toUpperCase().concat("%"), pageable)
                .orElseThrow(() -> new NotContextException(String.format("Nenhum endipoint foi encontrado!")));
    }

    @GetMapping(value = "/{id}")
    public Endpoint findById(@PathVariable("id") Long id){
        return repository.findById(id)
                .orElseThrow(() -> new NotContextException(String.format("Endipoint [id: %d] não encontrado!", id)));
    }

    @GetMapping(value = "/search")
    public Endpoint findOneByDescription(@RequestParam("description") String description) throws NotContextException {
        return repository.findOneByDescription(description.toUpperCase().concat("%"))
                .orElseThrow(() -> new NotContextException(String.format("Endipoint [description: %s] não encontrado!", description) ));
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public Endpoint create(@RequestBody Endpoint entity){
        return repository.save(entity);
    }

    @PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Endpoint> update(@PathVariable("id") Long id,
                                           @RequestBody Endpoint entity) {
        return repository.findById(id)
                .map(record -> {
                    record.setDescription(entity.getDescription());
                    record.setFields(entity.getFields());
                    record.setUri(entity.getUri());
                    record.setDisabled(entity.getDisabled());
                    Endpoint updated = repository.save(record);
                    return ResponseEntity.ok().body(updated);
                }).orElseThrow(() -> new NotContextException(String.format("Endipoint [id: %d] não encontrado!", id)));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") long id) {
        return repository.findById(id)
                .map(record -> {
                    repository.deleteById(id);
                    return ResponseEntity.ok().build();
                }).orElseThrow(() -> new NotContextException(String.format("Endipoint [id: %d] não encontrado!", id)));
    }
}
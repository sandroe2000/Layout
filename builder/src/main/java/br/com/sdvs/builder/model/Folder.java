package br.com.sdvs.builder.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Entity
public @Data
class Folder implements Serializable {

    private static final long serialVersionUID = -886315072953158617L;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "Nome é um campo requerido")
    private String name;

    @Column(nullable = false)
    private boolean visible;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date created;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date modified;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy", locale = "pt-BR", timezone = "Brazil/East")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    private Date disabled;

    @JsonIgnoreProperties({"parent", "folders", "files"})
    @ManyToOne(cascade={CascadeType.ALL})
    @JoinColumn(name="parent")
    private Folder parent;
    
    @JsonIgnoreProperties({"parent", "folders", "files"})
	@OneToMany(fetch=FetchType.EAGER, cascade={CascadeType.ALL})
    private Set<Folder> folders = new HashSet<Folder>();

    @JsonIgnoreProperties({"parent", "folders", "files"})
    @OneToMany(fetch=FetchType.EAGER, cascade={CascadeType.ALL})
    private Set<File> files = new HashSet<File>();
    
}

;
'use strict';

function listDOM (node, func) {
    func(node); 
    node = node.firstChild;
    while(node) {
        listDOM(node, func);
        node = node.nextSibling;
    }
}

function setEventToDOM(node){
    setPrincipalEvent(node);
    setRowEvent(node);
    setColEvent(node);
    setLabelEvent(node); 
    setNavTabEvent(node);
    setFormEvent(node);
    setFormGroupEvent(node);
}

function setPrincipalEvent(node){
    if(node.hasAttribute && node.classList.contains("edit")){
        pushContainer(node);         
        return;
    }
}

function setRowEvent(node){
    if(node.hasAttribute && node.classList.contains("row")){

        node.addEventListener('mouseover', function(event){

            //SE UM DRAG JÁ ESTIVER INICIADO, CANCELA
            if(drakeMenu.dragging) return false;

            setDrakeDom(event, node);
            event.preventDefault(); 
            event.stopPropagation();
        }, false);

        pushContainer(node);         
        return;
    }
}

function setColEvent(node){
    if(node.hasAttribute && node.classList.contains("col")){
        
        node.addEventListener('mouseover', function(event){

            //SE UM DRAG JÁ ESTIVER INICIADO, CANCELA
            if(drakeMenu.dragging) return false;

            setDrakeDom(event, node);
            event.preventDefault(); 
            event.stopPropagation();
        }, false);

        pushContainer(node);
        return;
    }
}

function setLabelEvent(node){
    if(node.tagName && node.tagName=='LABEL'){
        node.addEventListener('click', isLabel, false);
        return;
    }
}

function setNavTabEvent(node){
    
    if(node.hasAttribute && node.classList.contains("tab-item")){

        node.addEventListener('mouseover', function(event){

            //SE UM DRAG JÁ ESTIVER INICIADO, CANCELA
            if(drakeMenu.dragging) return false;

            setDrakeDom(event, node);
            event.preventDefault(); 
            event.stopPropagation();
        }, false);
    }
    
    if(node.hasAttribute && node.classList.contains("tab-pane")){
        pushContainer(node);
        return;
    }
}

function setFormEvent(node){
    if(node.tagName && node.tagName=='FORM'){
        pushContainer(node);
        return;
    }
}

function setFormGroupEvent(node){
    if(node.hasAttribute && node.classList.contains("form-group")){
        pushContainer(node);
        return;
    }
}

document.querySelector('#btnToggleVisualCode').addEventListener('click', function(event){
    
    var action = $(this).data('originalTitle');
    
    if(action=='Code'){
        $(this).data('original-title', 'View');
        $(this).attr('title', 'View');
        $(this).contents().last()[0].textContent = ' View';
        $(this).find('i').removeClass('fa-code').addClass('fa-eye');
    }else{
        $(this).data('original-title', 'Code');
        $(this).attr('title', 'Code');
        $(this).contents().last()[0].textContent = ' Code';
        $(this).find('i').removeClass('fa-eye').addClass('fa-code');
    }

    toggleEditor();
});

window.document.addEventListener('keydown', function(event){

    if(event.ctrlKey && event.keyCode == 13){
        beautify();
    }
});

addListenerSelecorAll(document.querySelectorAll('.action-btn'), 'mouseover', dragFromMenu);

;
'use strict';

function listDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        listDOM(node, func);
        node = node.nextSibling;
    }
}

function setEventToDOM(node) {
    setRowEvent(node);
    setColEvent(node); 
    setFormEvent(node);
    setFormGroupEvent(node);
    setPanelEvent(node);
    setHilight(node);
}

function setPanelEvent(node){
    if (node.hasAttribute && node.classList.contains("panel-body")) {
        removeActiveClass(node);
        node.addEventListener('mouseover', function(event) {
            setDrakeDom(event, node);
            event.preventDefault();
            event.stopPropagation();
        }, false);
        pushContainer(node);
        return;
    }
}

function setRowEvent(node) {
    
    if (node.hasAttribute && node.classList.contains("row")) {    
        removeActiveClass(node);
        node.addEventListener('mouseover', function(event) {
            setDrakeDom(event, node);
            event.preventDefault();
            event.stopPropagation();
        }, false);
        pushContainer(node);
        return;
    }
}

function setColEvent(node) {
    if (node.hasAttribute && node.classList.contains("col")) {
        removeActiveClass(node);
        node.addEventListener('mouseover', function(event) {
            setDrakeDom(event, node);
            event.preventDefault();
            event.stopPropagation();
        }, false);
        pushContainer(node);
        return;
    }
}

function setNavTabEvent(node) {
    if (node.hasAttribute && node.classList.contains("tab-item")) {
        removeActiveClass(node);
        node.addEventListener('mouseover', function(event) {
            setDrakeDom(event, node);
            event.preventDefault();
            event.stopPropagation();
        }, false);
    }

    if (node.hasAttribute && node.classList.contains("tab-pane")) {
        pushContainer(node);
        return;
    }
}

function setFormEvent(node) {
    if (node.tagName && node.tagName == 'FORM') {
        removeActiveClass(node);
        pushContainer(node);
        return;
    }
}

function setFormGroupEvent(node) {
    if (node.hasAttribute && node.classList.contains("form-group")) {
        removeActiveClass(node);
        pushContainer(node);
        return;
    }
}

function removeActiveClass(node){
    if(node.hasAttribute('class')){
        node.classList.remove('active');
    }
}

function setHilight(node) {

    if(node.nodeType==3 || node.classList.contains('edit')) return false;

    node.addEventListener('mouseover', function(event) {
        this.classList.toggle('hilight');
        event.stopPropagation();
    }, false);

    node.addEventListener('mouseout', function(event) {
        this.classList.toggle('hilight');
        event.stopPropagation();
    }, false);
}

function setSnakBar(msg) {
    var snackbar = document.querySelector("#snackbar");
    snackbar.innerHTML = msg;
    snackbar.classList.toggle("show");
    setTimeout(function() {
        snackbar.classList.toggle("show");
    }, 500);
}

var isResizing = false,
    lastDownX = 0;

$(function() {
    var container = $('body'),
        left = $('main'),
        right = $('section'),
        handle = $('#drag');

    handle.on('mousedown', function(e) {
        isResizing = true;
        lastDownX = e.clientX;
    });

    $(document).on('mousemove', function(e) {
        // we don't want to do anything if we aren't resizing.
        if (!isResizing){
            return;
        }
        var offsetRight = container.width() - (e.clientX - container.offset().left);
        left.css('right', offsetRight);
        right.css('width', offsetRight);
    }).on('mouseup', function(e) {
        // stop resizing
        isResizing = false;
    });
    /*
    document.querySelector('#loadLastAction').addEventListener('click', function(event){
        currentContentNode = 1;
        undoRedo('REDO');
    }, false);
    */
})
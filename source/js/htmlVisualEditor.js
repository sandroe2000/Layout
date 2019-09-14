'use strict';

$('#btnTextEditor').on('click', function(event){
    window.location.href = '/textEditorSource.html?fileId=0';
});

$('#menuTextEditor').on('change', function(event){
    window.location.href=$(this).val();
});

let singleColTemplate = `<div class="row">
                            <div class="col-md-6" id="col_1">
                                <label>Email address</label>
                                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6" id="col_2">
                                <label>Example select</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12" id="col_3">
                                <label>Example multiple select</label>
                                <select multiple class="form-control" id="exampleFormControlSelect2">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12" id="col_4">
                                <label>Example textarea</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                        </div>`;

function loadContent(code){
    let edit = document.querySelector('.edit');
    edit.innerHTML = code;
    validDOM(edit, setRow);
    validDOM(edit, setCol);
}

function validDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        listDOM(node, func);
        node = node.nextSibling;
    }
}

function setCol(node) {    
    if (node.hasAttribute && (node.classList.contains("col-md-6") || node.classList.contains("col-md-12")) ){        
        //$(node).click(function(event){
        //    if((event.target.classList.contains("col-md-6") || event.target.classList.contains("col-md-12"))){
        //        $(this).toggleClass('hilight');
        //        event.stopPropagation();
        //    }
        //});   

        $(node).on('contextmenu', function(event) {

            if(!event.target.classList.contains("col-md-6") && !event.target.classList.contains("col-md-12")) return false;

            var top = event.pageY - 10;
            var left = event.pageX - 90;

            $("#context-menu").attr('idCol', event.target.id);
            $("#context-menu").css({
                display: "block",
                top: top,
                left: left
            }).addClass("show");            
            return false; 
          }).on("click", function() {
            $("#context-menu").removeClass("show").hide();
          });

        return;
    }
}

$("#context-menu a").on("click", function() {
    $(this).parent().removeClass("show").hide();
});

function setRow(node) {    
    if (node.hasAttribute && node.classList.contains("row")) {    
        drakeMenu.containers.push(node);          
        //$(node).click(function(event){
        //    if(event.target.classList.contains("row")){
        //        $(this).toggleClass('hilight');
        //        event.stopPropagation();
        //    }
        //});   
        return;
    }
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.childNodes; 
  }

$(document).ready(function(){
    loadContent(singleColTemplate);
});

window.addEventListener('keydown', function(event) {
    if (event.keyCode == 46) { removeNode(); }
}, false);

function removeNode(){

    $.confirm({
        title: 'Confirmação!',
        content: 'Deseja remover este item?',
        draggable: true,
        buttons: {
            confirm: function () {
                $('.active').remove();
            },
            cancel: function () {
                //$.alert('Canceled!');
            }
        }
    });
}

function toggleCol(){
    let id = "#"+$("#context-menu").attr('idCol');
    $(id).toggleClass('col-md-12 col-md-6');
    $(id).addClass('hilight');
}

$('#sideBarForm').click(function(event){
    $('.sideBarForm').toggleClass('hide');
});

$('#sideBarLayout').click(function(event){
    $('.sideBarLayout').toggleClass('hide');
});

$('#sideBarComponents').click(function(event){
    $('.sideBarComponents').toggleClass('hide');
});

$('#chkRowBorders').change(function(event){
    $('div.main-content.container-fluid.edit div.row').toggleClass('showBorder');
});

$('#chkColBorders').change(function(event){
    $('div.main-content.container-fluid.edit [class*="col-md-"]').toggleClass('showBorder');
});

let footerBreadcrumb = document.querySelector('div.main-footer > ol.breadcrumb');
let mainContent = document.querySelector('.main-content.container-fluid.edit');

content.addEventListener('click', setBreadcrumb, false);

function setBreadcrumb(event) {

    cleanBreadcrumb();
    listDOM(mainContent, removeClicked);
    addBreadcrumb(event.target);
    if (event.target !== mainContent) {
        event.target.classList.add('active');
    }
    //nodeShowProperties(event.target);
}

function cleanBreadcrumb() {
    footerBreadcrumb.innerHTML = "";
}

function addBreadcrumb(node) {

    if (!node) return false;
    var el = node;
    var clicked = node;

    while (el.parentNode) {
        var li = document.createElement('li');
            li.setAttribute('class', 'breadcrumb-item');
        var a = document.createElement('a');
        if (el === clicked) a.setAttribute('class', 'active');
        a.setAttribute('href', 'javascript:void(0);');
        a.setAttribute('onclick', 'clickOnBreadcrumb(this)');
        var txt = el.nodeName.toLowerCase();
        if (el.getAttribute('id')) txt += "#" + el.getAttribute('id');
        if (el.getAttribute('class')) {
            var cls = el.getAttribute('class').split(' ');
            for (var i = 0; i < cls.length; i++) {
                if (cls[i] !== 'active') txt += "." + cls[i];
            }
        }
        var txtNode = document.createTextNode(txt);
        a.appendChild(txtNode);
        li.appendChild(a);
        if (el === content) return false;
        footerBreadcrumb.insertBefore(li, footerBreadcrumb.childNodes[0]);
        el = el.parentNode;
    }
}

function clickOnBreadcrumb(el) {
    document.querySelector(el.lastChild.textContent).click();
}

function removeClicked(node) {
    if (node.hasAttribute && node.classList.contains('active')) {
        node.classList.remove('active');
    }
    if (node.hasAttribute && node.classList.contains('node-selected')) {
        node.classList.remove('node-selected');
    }
}

function listDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        listDOM(node, func);
        node = node.nextSibling;
    }
}
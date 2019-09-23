;
'use strict';

$(document).ready(function(){

});

$('#btnTextEditor').on('click', function(event){
    window.location.href = '/textEditorSource.html?fileId=0';
});

$('#menuTextEditor').on('change', function(event){
    window.location.href=$(this).val();
});

$('#sideBarForm').click(function(event){
    $('.sideBarForm').toggleClass('hide');
});

$('#sideBarLayout').click(function(event){
    $('.sideBarLayout').toggleClass('hide');
});

$('#sideBarComponents').click(function(event){
    $('.sideBarComponents').toggleClass('hide');
});

$('#closeRightmenu').click(function(event){
    $('main').toggleClass('data-active');
    $('data').toggleClass('data-on');
    $(this).toggleClass('mdi-last-page mdi-first-page');
});

$('.modal').on('show.bs.modal', function (event) {
    debugger;
    let button = $(event.relatedTarget);
    let modal = $(this);
    let clazz = $(button).children().attr('class') || $(button).attr('class');
    let template = `<i class="${clazz}"></i> ${$(button).text().trim()}`;
    modal.find('.modal-title').html(template);
});

$('div.modal-footer > button.btn.btn-primary').on('click', function(event){
   
    //--TODO

    $('#modalCreateFolder').modal('hide');
});
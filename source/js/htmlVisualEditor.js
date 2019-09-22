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
});

'use strict';

$('#btnTextEditor').on('click', function(event){
    window.location.href = '/textEditor.html?fileId=0';
});

$('#menuTextEditor').on('change', function(event){
    window.location.href=$(this).val();
});
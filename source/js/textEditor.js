'use strict';

let editor = null;

$(document).ready(function() {

    let fileUrl = '/textEditor.html';
    fetch(fileUrl)
        .then(function(response) {
            return response.text();
        })
        .then(function(data) {

            editor = monaco.editor.create(document.querySelector('#editor'), {
                model: monaco.editor.createModel(data, getModelId(fileUrl))
            });
            window.onresize = function () {
                if (editor) {
                    editor.layout();
                }
            };
            if(editor) monaco.editor.setTheme('vs');
            return "OK";
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation[loading Monaco-Editor]: ' + error.message);
        });
});

function getModelId(file){    
    let fileExt = file.split('.').pop();    
    if(fileExt=='js') {
        return 'javascript';
    }
    return fileExt;
}

$('#btnVisualEditor').on('click', function(event){
    window.location.href = '/htmlVisualEditor.html?fileId=0';
});
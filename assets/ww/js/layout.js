;
'use strict';

var layout = {
    design: true,
    code: false,
    preview: false
};

var totalCols = 12;
//var confirmRemoveMessage = document.querySelector('#confirmRemoveMessage');
//var node = document.querySelector('#layoutBtnGroup').children;
//var souce = document.querySelector("#codeContainer");

//if (getConfirmRemoveMessage()) {
//   confirmRemoveMessage.checked = true;
//}

//document.querySelector('#layoutBtnGroup').addEventListener('click', toggleLayout, false);
/*
function toggleLayout(event) {

    for (var i = 0; i < node.length; i++) {
        node[i].classList.remove('btn-active');
    }

    switch (event.target.getAttribute('id')) {
        case 'btnLayoutDesign':
            setLayoutDesign(event);
            event.target.classList.add('btn-active');

            if (content.style.display == 'none') {
                content.style.display = 'block';
                souce.style.display = 'none';

                var editorBody = document.createElement("div");
                editorBody.setAttribute("id", "0001");
                editorBody.innerHTML = editor.getValue();
                content.innerHTML = editor.getValue();
                listDOM(content, setEventToDOM);
            }

            break;
        case 'btnLayoutCode':
            setLayoutCode(event);
            event.target.classList.add('btn-active');
            break;
        case 'btnLayoutPreview':
            setLayoutPreview(event);

            if (content.style.display == 'none') {
                content.style.display = 'block';
                souce.style.display = 'none';
                var editorBody = document.createElement("div");
                editorBody.setAttribute("id", "0001");
                editorBody.innerHTML = editor.getValue();
                content.innerHTML = editor.getValue();
                listDOM(content, setEventToDOM);
            }

            break;
    }
}

function setLayoutDesign(event) {

    var head = document.getElementsByTagName("head")[0];

    if (!document.getElementById('designStyle')) {
        var fileCss = document.createElement("link");
        fileCss.setAttribute("rel", "stylesheet");
        fileCss.setAttribute("id", "designStyle");
        fileCss.setAttribute("href", "css/design.css");
        head.appendChild(fileCss);
    }
    domHasChanged();
}

function setLayoutCode(event) {

    if (souce.style.display == 'none') {

        content.style.display = 'none';
        souce.style.display = 'block';

        editor.setValue(content.innerHTML);
        for (var i = 0; i < editor.lineCount(); i++) {
            editor.indentLine(i);
        }
        setTimeout(function() { beautify(); }, 100);
    }
    domHasChanged();
}
function setLayoutPreview(event) {
    event.stopPropagation();
    event.preventDefault();
    var head = document.getElementsByTagName("head")[0];
    if (document.getElementById('designStyle')) {
        head.removeChild(document.getElementById('designStyle'));
    }
    domHasChanged();
}

document.querySelector('#btnShowHide24cols').addEventListener('click', toggleColumnsInUse, false);
*/

function toggleColumnsInUse(event) {

    var head = document.getElementsByTagName("head")[0];
    /*if (!document.getElementById('design24Cols')) {
        var fileCss = document.createElement("link");
        fileCss.setAttribute("rel", "stylesheet");
        fileCss.setAttribute("id", "design24Cols");
        fileCss.setAttribute("href", "css/24-columns.css");
        head.appendChild(fileCss);
        totalCols = 24;
        $('.opt-24cols').css('display', 'block');
    } else {
        head.removeChild(document.getElementById('design24Cols'));
        totalCols = 12;
        $('.opt-24cols').css('display', 'none');
    }*/

    //head.removeChild(document.getElementById('design24Cols'));
    totalCols = 12;
    $('.opt-24cols').css('display', 'none');

    var ruler = document.querySelector('.main-ruler.container-fluid').childNodes[1];
    ruler.innerHTML = "";

    for (var i = 0; i < totalCols; i++) {

        var colRule = document.createElement('div');
        colRule.setAttribute('class', 'col-md-1');
        colRule.appendChild(document.createTextNode(i + 1));

        ruler.appendChild(colRule);
    }

    //document.querySelector('#btnShowHide24cols').lastChild.textContent = ' '.concat(totalCols);
}

(function() {
    toggleColumnsInUse();
})();
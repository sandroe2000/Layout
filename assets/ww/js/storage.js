;
'use strict';

(function() {

    if (typeof(Storage) == "undefined") return false;

    confirmRemoveMessage.addEventListener('click', function(event) {

        if (confirmRemoveMessage.checked) {
            localStorage.setItem("confirmRemoveMessage", confirmRemoveMessage.value);
        } else {
            localStorage.setItem("confirmRemoveMessage", "");
        }

    }, false);

    document.querySelector("#clearClipboard").addEventListener('click', cleanVersionContentNode);

})();

function cleanVersionContentNode() {
    localStorage.setItem("versionContentNode", "");
}

function setVersionContentNode() {

    if (typeof(Storage) == "undefined") return false;

    var versionContentNode = [];

    if (getVersionContentNode()) {
        versionContentNode = getVersionContentNode();
    }

    var clone = content.cloneNode(true);

    //NÃO GRAVA CONTEÚDO IGUAL AO ÚLTIMO NÓ
    if(versionContentNode[0]==clone.outerHTML.replace('hilight', '').replace('active', '').replace(/\n/g, '')) return false;

    if (versionContentNode.length == 0) {
        versionContentNode.unshift('<div class="main-content container-fluid edit "></div>');
    }

    if (versionContentNode.length < maxLen) {
        versionContentNode.unshift(clone.outerHTML.replace('hilight', '').replace('active', '').replace(/\n/g, ''));
    } else {
        versionContentNode.pop();
        versionContentNode.unshift(clone.outerHTML.replace('hilight', '').replace('active', '').replace(/\n/g, ''));
    }

    localStorage.setItem("versionContentNode", JSON.stringify(versionContentNode));
}

function getConfirmRemoveMessage() {
    return localStorage.getItem("confirmRemoveMessage");
}

function getVersionContentNode() {
    if (localStorage.getItem("versionContentNode")) {
        return JSON.parse(localStorage.getItem("versionContentNode"));
    }
    return null;
}
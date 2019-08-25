;
'use strict';

var breadcrumb, content, treeview;

var currentNodeInEdit = null;
var currentCopyedNode = null;
var maxLen = 30;
var currentContentNode = 0;

function loadObjectInspector(){

    //breadcrumb = document.querySelector('.breadcrumb');
    content = document.querySelector('.main-content.container-fluid.edit');
    //treeview = document.querySelector('#treeview');

    //content.addEventListener('click', setBreadcrumb, false);

    //$('label').on('click', setBreadcrumb);

    $(".mb-control-yes").on("click", function() {
        removeCurrentNode();
        $(this).parents(".message-box").removeClass("open");
        return true;
    });

    $(".mb-control-close").on("click", function() {
        $(this).parents(".message-box").removeClass("open");
        return false;
    });
    /*
    treeview.addEventListener('click', function(event) {
        if (!event.target.lastChild) return false;
        var node = document.querySelector(event.target.lastChild.textContent);
        setDomSelectNode(node);
    }, false);
    */
}

//document.querySelector('#btnRefreshTreeview ').addEventListener('click', domHasChanged, false);

window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.keyCode == 13) { beautify(); }
    if (event.keyCode == 46 && layout.design) { confirmRemoveNode(); }
    if (event.ctrlKey && event.keyCode == 67) { copySelectdNode(); }
    if (event.ctrlKey && event.keyCode == 86) { pastSelectdNode(); }

    if (event.ctrlKey && event.keyCode == 90) { undoRedo('UNDO'); }
    if (event.ctrlKey && event.keyCode == 89) { undoRedo('REDO'); }
}, false);

function undoRedo(action) {

    var versionContentNode = getVersionContentNode();
    var i;

    if (content.style.display == 'none') return false;
    if (currentContentNode < 0) return false;

    i = currentContentNode;
    if (action == 'UNDO') i++;
    if (action == 'REDO') i--;

    if (!versionContentNode || i > versionContentNode.length) return false;
    if (!versionContentNode[i]) return false

    var template = document.createElement('div');
    template.innerHTML = versionContentNode[i];
    var nodes = template.firstChild;

    content.parentNode.replaceChild(nodes, content);

    currentContentNode = i;
    loadObjectInspector();
    listDOM(content, setEventToDOM);
    pushContainer(document.querySelector('.edit'));
}

function copySelectdNode() {
    if (!isCopyAcceptable()) return false;
    var template = document.createElement('div');
    template.innerHTML = currentNodeInEdit.outerHTML.replace('hilight', '');
    listDOM(template, replaceNodeId);
    currentCopyedNode = template.firstChild;
    setSnakBar('Copied!');
}

function isCopyAcceptable() {
    if (!currentNodeInEdit) return false;
    if (currentNodeInEdit == content) return false;
    return true;
}

function pastSelectdNode() {
    if (!isPastAcceptable()) return false;
    currentNodeInEdit.appendChild(currentCopyedNode);
    listDOM(currentCopyedNode, setEventToDOM);
    domHasChanged();
}

function isPastAcceptable() {
    if (!currentCopyedNode || !currentNodeInEdit) return false;
    if (currentCopyedNode == currentNodeInEdit) return false;
    if (currentNodeInEdit.classList.contains('edit') && !currentCopyedNode.classList.contains('row')) return false;
    if (currentNodeInEdit.classList.contains('row') && !currentCopyedNode.classList.contains('col')) return false;
    return true;
}

function replaceNodeId(node) {

    if (!node.hasAttribute || !node.hasAttribute('id')) return false;

    var prefixId = "";
    var id = node.getAttribute('id');
    if (id.indexOf('row') > -1) prefixId = 'row';
    if (id.indexOf('col') > -1) prefixId = 'col';
    if (id.indexOf('lbl') > -1) prefixId = 'lbl';
    if (id.indexOf('inp') > -1) prefixId = 'inp';

    node.setAttribute('id', prefixId.concat(getId()));
}

/*document.querySelector('#layoutBtnGroupObjectInspector').addEventListener('click', function(event) {

    event.preventDefault();
    event.stopPropagation();

    var elementPropertiesWraper = document.querySelector('#elementPropertiesWraper');
    var elementDataWraper = document.querySelector('#elementDataWraper');

    if (event.target.classList && !event.target.classList.contains('btn-active')) {

        var list = event.target.parentNode.children;

        for (var i = 0; i < list.length; i++) {
            list[i].classList.toggle('btn-active');
        }

        if (event.target.getAttribute('id') == 'btnLayoutProperties') {
            elementPropertiesWraper.style.display = 'block';
            elementDataWraper.style.display = 'none';
        }

        if (event.target.getAttribute('id') == 'btnLayoutData') {
            elementPropertiesWraper.style.display = 'none';
            elementDataWraper.style.display = 'block';
        }
    }

}, false);*/
/*
function clickOnBreadcrumb(el) {
    document.querySelector(el.lastChild.textContent).click();
}

function clickOnTreeView(el) {
    document.querySelector(el.lastChild.textContent).click();
}

function setBreadcrumb(event) {

    cleanBreadcrumb();
    listDOM(content, removeClicked);
    setTreeViewSelected(event.target);
    addBreadcrumb(event.target);
    if (event.target !== content) event.target.classList.add('active');
    nodeShowProperties(event.target);
}

function cleanBreadcrumb() {
    breadcrumb.innerHTML = "";
}

function addBreadcrumb(node) {

    if (!node) return false;
    var el = node;
    var clicked = node;

    while (el.parentNode) {
        var li = document.createElement('li');
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
        breadcrumb.insertBefore(li, breadcrumb.childNodes[0]);
        el = el.parentNode;
    }
}
*/
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

function buildDomTree() {
    var data = [];

    function walk(nodes, data) {
        if (!nodes) {
            return;
        }
        $.each(nodes, function(id, node) {
            var id = "",
                cls = "";
            if (node.hasAttribute('id')) {
                id = '#' + node.getAttribute('id');
            }
            if (node.hasAttribute('class')) {
                var clazz = node.getAttribute('class').split(' ');
                for (var i = 0; i < clazz.length; i++) {
                    if (clazz[i] !== 'active') cls += "." + clazz[i];
                }
            }

            var obj = {
                id: id,
                text: node.nodeName.toLowerCase() + id + cls
            };
            if (node.childElementCount > 0) {
                obj.nodes = [];
                walk(node.children, obj.nodes);
            }
            data.push(obj);
        });
    }
    walk($('.main-content.container-fluid')[0].children, data);
    return data;
}
/*
var $tree;
var $treeOptions;
$(function() {
    $treeOptions = {
        bootstrap2: false,
        showTags: true,
        levels: 5,
        data: buildDomTree(),
        onhoverColor: "#434857"
    };
    $tree = $('#treeview').treeview($treeOptions);
});

function setTreeViewSelected(node) {

    var el = node;
    var txt = el.nodeName.toLowerCase();
    if (el.getAttribute('id')) txt += "#" + el.getAttribute('id');
    if (el.getAttribute('class')) {
        var cls = el.getAttribute('class').split(' ');
        for (var i = 0; i < cls.length; i++) {
            if (cls[i] !== 'active') txt += "." + cls[i];
        }
    }

    var $node = $("li:contains('" + txt + "')");
    if ($node.length) $node.click();
}
*/
function setDomSelectNode(node) {

    if (!node) return false;
    breadcrumb.innerHTML = "";
    listDOM(content, removeClicked);
    addBreadcrumb(node);
    if (node !== content) node.classList.add('active');
    nodeShowProperties(node);
}

/* MESSAGE BOX */
function confirmRemoveNode() {

    if (!getConfirmRemoveMessage()) {
        removeCurrentNode();
        return false;
    }

    var box = $('#message-box-alert');

    if (box.length > 0) {

        box.toggleClass("open");

        var sound = box.data("sound");

        if (sound === 'alert') {
            playAudio('alert');
        }

        if (sound === 'fail') {
            playAudio('fail');
        }

    }

    $('.mb-control-yes').focus();

    return false;
}

/* END MESSAGE BOX */

/* PLAY SOUND FUNCTION */
function playAudio(file) {
    if (file === 'alert')
        document.getElementById('audio-alert').play();

    if (file === 'fail')
        document.getElementById('audio-fail').play();
}
/* END PLAY SOUND FUNCTION */

function removeCurrentNode() {
    if (currentNodeInEdit !== content) {
        currentNodeInEdit.parentNode.removeChild(currentNodeInEdit);
        domHasChanged();
        cleanBreadcrumb();
        //setSnakBar('Removed!');
    }
}

function domHasChanged() {
    $tree = $('#treeview').treeview({
        bootstrap2: false,
        showTags: true,
        levels: 5,
        data: buildDomTree(),
        onhoverColor: "#434857"
    });
    setVersionContentNode();
    if (currentNodeInEdit) currentNodeInEdit.click();
}

(function(){
    loadObjectInspector();
})();
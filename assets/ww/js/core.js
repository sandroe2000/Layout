;
'use strict';

var id = 1;
var drakeMenu;
var drakeDom = null;

function setDrakeDom(event, node) {

    if (drakeDom) drakeDom.destroy();
    drakeDom = dragula([node.parentNode], {}).on('drop', function(el, container) {
        setTimeout(function() {
            if (drakeDom) drakeDom.destroy();
        }, 100);
    }).on('cancel', function(el, container) {
        setTimeout(function() {
            if (drakeDom) drakeDom.destroy();
        }, 100);
    });
}

function getId() {
    return id++;
}

function createTabAndPane(clazz) {

    var i = getId();

    // TAB ////////////////////////////////////////
    var item = document.createElement("li");
    item.setAttribute("role", "presentation");
    item.setAttribute("class", "tab-item");
    if (clazz) item.classList.add(clazz);

    var a = document.createElement("a");
    a.setAttribute("href", "#tab" + i);
    a.setAttribute("aria-controls", "tab" + i);
    a.setAttribute("role", "tab");
    a.setAttribute("data-toggle", "tab");

    var text = document.createTextNode("Tab" + i);

    // PANE ////////////////////////////////////////
    var tabPane = document.createElement("div");
    tabPane.setAttribute("id", "tab" + i);
    tabPane.setAttribute("role", "tabpanel");
    tabPane.setAttribute("class", "tab-pane");
    if (clazz) tabPane.classList.add(clazz);

    a.appendChild(text);
    item.appendChild(a);

    var retorno = {
        tab: item,
        pane: tabPane
    };

    return retorno;
}

function getNavTab() {

    var div = document.createElement("div");
    div.classList.add("nav-tab-wrapper");

    var navTab = document.createElement("ul");
    navTab.setAttribute("id", "navTab" + getId());
    navTab.setAttribute("role", "tablist");
    navTab.setAttribute("class", "nav nav-tabs");

    // TAB_CONTENT ////////////////////////////////////////
    var tabContent = document.createElement("div");
    tabContent.classList.add("tab-content");

    // TAB_PANE_1 ////////////////////////////////////////
    var tab1 = createTabAndPane('active');
    var item1 = tab1.tab;
    var tabPane1 = tab1.pane;

    // TAB_PANE_2 ////////////////////////////////////////
    var tab2 = createTabAndPane(null);
    var item2 = tab2.tab;
    var tabPane2 = tab2.pane;

    // APPEND ELEMENTS ////////////////////////////////////////  
    navTab.appendChild(document.createTextNode("\n"));
    navTab.appendChild(item1);
    navTab.appendChild(document.createTextNode("\n"));
    navTab.appendChild(item2);
    navTab.appendChild(document.createTextNode("\n"));

    tabContent.appendChild(document.createTextNode("\n"));
    tabContent.appendChild(tabPane1);
    tabContent.appendChild(document.createTextNode("\n"));
    tabContent.appendChild(tabPane2);
    tabContent.appendChild(document.createTextNode("\n"));

    div.appendChild(document.createTextNode("\n"));
    div.appendChild(navTab);
    div.appendChild(document.createTextNode("\n"));
    div.appendChild(tabContent);
    div.appendChild(document.createTextNode("\n"));

    return div;
}

function getRow() {
    var row = document.createElement("div");
    row.setAttribute("id", "row" + getId());
    row.setAttribute("class", "row");
    return row;
}

function getColumn() {
    var column = document.createElement("div");
    column.setAttribute("id", "col" + getId());
    column.setAttribute("class", "col-md-6 col");
    return column;
}

function getLabel() {
    var label = document.createElement("label");
    label.setAttribute("id", "lbl" + getId());
    var text = document.createTextNode("Label");
    label.appendChild(text);
    return label;
}

function getInput(type) {

    var el;

    //For input type: text, password, date, number 
    var input = document.createElement("Input");
    input.setAttribute("id", "inp" + getId());
    input.setAttribute("type", type);
    input.setAttribute("class", "form-control");
    el = input;

    //For input type: checkbox, radio
    if (type == 'checkbox' || type == 'radio') {

        input.setAttribute("class", type);
        var label = getLabel();
        label.insertBefore(input, label.childNodes[0]);

        var div = document.createElement("div");
        div.setAttribute('id', type.substring(0, 3).concat(getId()));
        div.setAttribute('class', type);
        div.appendChild(label);

        el = div;
    }

    return el;
}

function getTextarea() {
    var textarea = document.createElement("textarea");
    textarea.setAttribute("id", "txtArea" + getId());
    textarea.setAttribute("class", "form-control");
    return textarea;
}

function getForm() {
    var frm = document.createElement("form");
    frm.setAttribute("id", "frm" + getId());
    return frm;
}

function getFormGroup() {
    var frmGrp = document.createElement("div");
    frmGrp.setAttribute("id", "grp" + getId());
    frmGrp.setAttribute("class", "form-group");
    return frmGrp;
}

function getSideMenuSnippet(code) {
    //TODO - RECUPERAR SNIPPET DO DB
    //var snippet = window.atob(code); ///DECODE BASE 64
    //return code.toDomElement();
    listDOM(code.toDomElement(), setEventToDOM);
}

function getButton() {
    var btn = document.createElement("button");
    btn.setAttribute("id", "btn" + getId());
    btn.setAttribute("type", "button");
    btn.setAttribute("class", "btn btn-default");
    var text = document.createTextNode("Button");
    btn.appendChild(text);
    return btn;
}

function getSelect() {
    var sel = document.createElement("select");
    sel.setAttribute("id", "sel" + getId());
    sel.setAttribute("class", "form-control");
    var opt = document.createElement("option");
    opt.setAttribute("value", "");
    var text = document.createTextNode("Selecione uma Opção");
    opt.appendChild(text);
    sel.appendChild(opt);
    return sel;
}

function getPanel() {

    var panelHeading = document.createElement('div');
    panelHeading.setAttribute('class', 'panel-heading');
    panelHeading.appendChild(document.createTextNode('Panel Heading'));

    var panelBody = document.createElement('div');
    panelBody.setAttribute('class', 'panel-body');

    var panel = document.createElement('div');
    panel.setAttribute('class', 'panel panel-default');

    panel.appendChild(panelHeading);
    panel.appendChild(panelBody);
    return panel;
}

function setElementDrag(el) {

    var title = el.getAttribute("title");
    var code = el.getAttribute("data-code");
    var node;

    switch (title) {
        case 'Label':
            node = getLabel();
            break;
        case 'Input Text':
            node = getInput('text');
            break;
        case 'Input E-mail':
            node = getInput('email');
            break;
        case 'Input Password':
            node = getInput('password');
            break;
        case 'Input Date':
            node = getInput('date');
            break;
        case 'Input Number':
            node = getInput('number');
            break;
        case 'Input Checkbox':
            node = getInput('checkbox');
            break;
        case 'Input Radio':
            node = getInput('radio');
            break;
        case 'Column':
            node = getColumn();
            break;
        case 'Row':
            node = getRow();
            break;
        case 'Textarea':
            node = getTextarea();
            break;
        case 'Snippet':
            node = getSideMenuSnippet(code);
            break;
        case 'Nav Tab':
            node = getNavTab();
            break;
        case 'Form':
            node = getForm();
            break;
        case 'Form Group':
            node = getFormGroup();
            break;
        case 'Select':
            node = getSelect();
            break;
        case 'Button':
            node = getButton();
            break;
        case 'Panel':
            node = getPanel();
            break;
        default:
            return false;
    }

    if (el.parentNode) {
        el.parentNode.replaceChild(node, el);
        //node.parentNode.insertBefore(document.createTextNode("\n"), node);
        //node.parentNode.appendChild(document.createTextNode("\n"));
        listDOM(node, setEventToDOM);
        //domHasChanged();
    }
}

function dragFromMenu() {

    drakeMenu = dragula({
        copy: function(el, source) {
            return isCopy(el);
        },
        accepts: function(el, target) {
            return isAcceptable(el, target);
        },
        copySortSource: true
    }).on('over', function(el, container, source) {
        if (container != source) {
            if (container) container.classList.toggle("drag-over");
        }
    }).on('out', function(el, container, source) {
        if (container) container.classList.remove("drag-over");
    }).on('drop', function(el, container) {
        if (container) container.classList.remove('draging');
        if (container) container.classList.toggle("drag-over");
        setElementDrag(el);
    });

    //START DRAG HERE
    pushContainer(document.querySelector('aside'));
    pushContainer(document.querySelector('.edit'));

}

function isCopy(el) {
    if (el.classList.contains('btn-aside-menu')) return true;
    if (el.classList.contains('snippet-item')) return true;
    return false;
}

function isAcceptable(el, target) {
    
    if (target.classList.contains('edit') || target.classList.contains('panel-body')) {
        if (el.getAttribute("title") == "Row") return true;
        if (el.getAttribute("title") == "Snippet") return true;
        if (el.getAttribute("title") == "Nav Tab") return true;
        if (el.getAttribute("title") == "Form") return true;
    }

    if (target.classList.contains('tab-pane')) {
        if (el.getAttribute("title") == "Line") return true;
        if (el.getAttribute("title") == "Snippet") return true;
    }

    if (target.nodeName == 'FORM') {
        if (el.getAttribute("title") == "Form Group") return true;
        if (el.getAttribute("title") == "Input Checkbox") return true;
        if (el.getAttribute("title") == "Input Radio") return true;
        if (el.getAttribute("title") == "Button") return true;
    }

    if (target.classList.contains('form-group')) {
        if (el.getAttribute("title") == "Label") return true;
        if (el.getAttribute("title") == "Column") return true;
        if (el.getAttribute("title") == "Textarea") return true;
        if (el.getAttribute("title") == "Input Text") return true;
        if (el.getAttribute("title") == "Input E-mail") return true;
        if (el.getAttribute("title") == "Input Password") return true;
        if (el.getAttribute("title") == "Input Date") return true;
        if (el.getAttribute("title") == "Input Number") return true;
        if (el.getAttribute("title") == "Input Checkbox") return true;
        if (el.getAttribute("title") == "Input Radio") return true;
        if (el.getAttribute("title") == "Select") return true;
        if (el.getAttribute("title") == "Select") return true;
        if (el.getAttribute("title") == "Button") return true;
    }

    if (target.classList.contains('row')) {
        if (el.classList.contains('col-md-6')) return true;
        if (el.getAttribute("title") == "Column") return true;
    }

    if (target.classList.contains('col')) {
        if (el.getAttribute("title") == "Column") return false;

        return true;
    }

    return false;
}

function pushContainer(el) {
    drakeMenu.containers.push(el);
}

String.prototype.toDomElement = function() {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = this;
    return wrapper;
};

(function() {
    dragFromMenu();
})();
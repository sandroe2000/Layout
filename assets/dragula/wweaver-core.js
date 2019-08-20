;
'use strict';

var id = 1;
var drakeMenu = null;
var drakeDom = null;
var set_drag_in_progress = false;
var beautify_in_progress = false;

var editor = CodeMirror.fromTextArea(
	document.getElementById("source"),
	{
		lineNumbers: true,
        mode: "text/html",
        matchTags: {bothTags: true}
	}
);

function unpacker_filter(source) {
    var trailing_comments = '',
        comment = '',
        unpacked = '',
        found = false;

    // cut trailing comments
    do {
        found = false;
        if (/^\s*\/\*/.test(source)) {
            found = true;
            comment = source.substr(0, source.indexOf('*/') + 2);
            source = source.substr(comment.length).replace(/^\s+/, '');
            trailing_comments += comment + "\n";
        } else if (/^\s*\/\//.test(source)) {
            found = true;
            comment = source.match(/^\s*\/\/.*/)[0];
            source = source.substr(comment.length).replace(/^\s+/, '');
            trailing_comments += comment + "\n";
        }
    } while (found);

    var unpackers = [P_A_C_K_E_R, Urlencoded, JavascriptObfuscator/*, MyObfuscate*/];
    for (var i = 0; i < unpackers.length; i++) {
        if (unpackers[i].detect(source)) {
            unpacked = unpackers[i].unpack(source);
            if (unpacked != source) {
                source = unpacker_filter(unpacked);
            }
        }
    }

    return trailing_comments + source;
}

function beautify() {
    if (beautify_in_progress) return;

    //store_settings_to_cookie();

    beautify_in_progress = true;

    var source = editor ? editor.getValue() : $('#source').val(),
        output,
        opts = {};

    opts.indent_size = 2;
    opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
    opts.max_preserve_newlines = 0;
    opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
    opts.keep_array_indentation = $('#keep-array-indentation').prop('checked');
    opts.break_chained_methods = $('#break-chained-methods').prop('checked');
    opts.indent_scripts = $('#indent-scripts').val();
    opts.brace_style = $('#brace-style').val() + ($('#brace-preserve-inline').prop('checked') ? ",preserve-inline" : "");
    opts.space_before_conditional = $('#space-before-conditional').prop('checked');
    opts.unescape_strings = $('#unescape-strings').prop('checked');
    opts.jslint_happy = $('#jslint-happy').prop('checked');
    opts.end_with_newline = $('#end-with-newline').prop('checked');
    opts.wrap_line_length = $('#wrap-line-length').val();
    opts.indent_inner_html = $('#indent-inner-html').prop('checked');
    opts.comma_first = $('#comma-first').prop('checked');
    opts.e4x = $('#e4x').prop('checked');

    if (looks_like_html(source)) {
        output = html_beautify(source, opts);
    } else {
        if ($('#detect-packers').prop('checked')) {
            source = unpacker_filter(source);
        }
        output = js_beautify(source, opts);
    }
    if (editor) {
        editor.setValue(output);
    } else {
        $('#source').val(output);
    }

    beautify_in_progress = false;
}

function looks_like_html(source) {
    // <foo> - looks like html
    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    return trimmed && (trimmed.substring(0, 1) === '<');
}

editor.setSize('100%', document.querySelector("main").offsetHeight);
editor.refresh();

function toggleEditor() {

    var main = document.querySelector("#mainContainer");
    var souce = document.querySelector("#codeContainer");

    main.classList.toggle("hide");
    souce.classList.toggle("show");

    removeAttributeSelecorAll( document.querySelectorAll(".col"), "style" );

    if (!main.classList.contains("hide")) {
        var editorBody = document.createElement("div");
            editorBody.setAttribute("id", "0001");
            editorBody.innerHTML = editor.getValue();
        main.innerHTML = editor.getValue();
        listDOM(main, setEventToDOM);
    } else {
        editor.setValue(main.innerHTML);
        for (var i = 0; i < editor.lineCount(); i++) {
            editor.indentLine(i);
        }
        setTimeout(function(){beautify();},100);
    }
}

function printLog(node){
    var tag = "";
    var id = "";
    var clss = "";
    var txt = "";

    if(node.tagName){
        tag = node.tagName;
    }
    if(node.hasAttribute && node.hasAttribute("id")){
        id = node.getAttribute("id")
    }
    if(node.hasAttribute && node.hasAttribute("class")){
        clss = node.getAttribute("class")
    }
    if(node.nodeType === Node.TEXT_NODE){

        if(node.textContent.indexOf('\n') >= 0){
            return;
        }else{
            txt = node.textContent;
        }
    }
    console.log( tag +" | "+ id +" | "+ clss+" | "+ txt );
}

function getId(){
    return id++;
}

function menuTooltip() {   
    $('[data-toggle="tooltip"]').tooltip();
}

function createTabAndPane(clazz){

    var i = getId();

    // TAB ////////////////////////////////////////
    var item = document.createElement("li");
        item.setAttribute("role", "presentation");
        item.classList.add("tab-item");
        if(clazz) item.classList.add(clazz);        

    var a = document.createElement("a");
        a.setAttribute("href", "#tab"+i);
        a.setAttribute("aria-controls", "tab"+i);
        a.setAttribute("role", "tab");
        a.setAttribute("data-toggle", "tab");

    var text = document.createTextNode("Tab"+i);

    // PANE ////////////////////////////////////////
    var tabPane = document.createElement("div");
        tabPane.setAttribute("id", "tab"+i);
        tabPane.setAttribute("role", "tabpanel");
        tabPane.classList.add("tab-pane"); 
        if(clazz) tabPane.classList.add(clazz); 

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
        navTab.setAttribute("id", "navTab"+getId());
        navTab.setAttribute("role", "tablist");
        navTab.classList.add("nav");
        navTab.classList.add("nav-tabs");
        navTab.classList.add("hilight");

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
    row.setAttribute("id", "row"+getId());
    row.classList.add("row");
    return row;
}

function getColumn() {
    var column = document.createElement("div");
    column.setAttribute("id", "col"+getId());
    column.classList.add("col-md-2");
    column.classList.add("col");
    return column;
}

function getLabel() {
    var label = document.createElement("label");
        label.setAttribute("id", "lbl"+getId());
        //label.setAttribute("contenteditable", true);
    var text = document.createTextNode("Label");
    label.appendChild(text);
    return label;
}

function getInput(type) {

    var el;

    //For input type: text, password, date, number 
    var input = document.createElement("Input");
        input.setAttribute("id", "inp"+getId());
        input.setAttribute("type", type);
        input.classList.add("form-control");
    el = input;
    
    //For input type: checkbox, radio
    if(type=='checkbox' || type=='radio') {

        input.classList.remove("form-control");
        var label = getLabel();
            label.insertBefore(input, label.childNodes[0]);

        var div = document.createElement("div");
            div.classList.add(type);    
            div.appendChild(label);
            
        el = div;
    }

    //For input type: range
    if(type=='range') {
        input.classList.remove("form-control");
        input.setAttribute('size', 10);
        input.setAttribute('min', 1);
        input.setAttribute('max', 10);
        input.setAttribute('value', 2);              
        el = input;
    }
    return el;
}

function getTextarea() {
    var textarea = document.createElement("textarea");
    textarea.setAttribute("id", "txtArea"+getId());
    textarea.classList.add("form-control");
    return textarea;
}

function getForm() {
    var frm = document.createElement("form");
        frm.setAttribute("id", "frm"+getId());
    return frm;
}

function getFormGroup() {
    var frmGrp = document.createElement("div");
        frmGrp.setAttribute("id", "frmGrp"+getId());
        frmGrp.classList.add("form-group");
    return frmGrp;
}

function getSideMenuSnippet(code){
    //TODO - RECUPERAR SNIPPET DO DB
    var snippet = window.atob(code);///DECODE BASE 64
    return snippet.toDomElement();
}

function getButton(){
    var btn = document.createElement("button");
        btn.setAttribute("id", "btn"+getId());
        btn.setAttribute("type", "button");
        btn.classList.add("btn");
        btn.classList.add("btn-default");
    var text = document.createTextNode("Button");
    btn.appendChild(text);
    return btn;
}

function getSelect(){
    var sel = document.createElement("select");
        sel.setAttribute("id", "sel"+getId());
        sel.classList.add("form-control");
    var opt = document.createElement("option");
        opt.setAttribute("value", "");
    var text = document.createTextNode("Selecione uma Opção");
        opt.appendChild(text);
        sel.appendChild(opt);
    return sel;
}

function setElementDrag(el) {

    var title = el.getAttribute("data-original-title");
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
        case 'Input Range':
            node = getInput('range');
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
        case 'Line':
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
        default:
            return false;
    }

    if(el.parentNode){
        el.parentNode.replaceChild(node, el);
        node.parentNode.insertBefore(document.createTextNode("\n"), node);
        listDOM(node, setEventToDOM);
    }
}

function isLabel(event){
    event.stopPropagation();
    this.focus();
}

function dragFromMenu() {

    if(set_drag_in_progress) return false;
    set_drag_in_progress = true;

    if(drakeDom) drakeDom.destroy();
    if(drakeMenu) drakeMenu.destroy();

    drakeMenu = dragula({
        copy: function(el, source) {
            return isCopy(el);
        },
        accepts: function(el, target) {
            return isAcceptable(el, target);
        }
        //,removeOnSpill: true
    }).on('over', function (el, container, source) {
        if(container != source){
           if(container) container.classList.toggle("drag-over");
        }
    }).on('out', function (el, container, source) {
        if(container) container.classList.remove("drag-over");
    }).on('drop', function(el, container) {
        if(container) container.classList.remove('draging');
        setElementDrag(el);
    });

    //START DRAG HERE
    pushContainer(document.querySelector('.sub-menu'));
    //pushContainer(document.querySelector('.edit'));
    listDOM (document.querySelector('.edit'), setEventToDOM);
    
    set_drag_in_progress = false;
}

function setDrakeDom(event, node){

    if(drakeDom) drakeDom.destroy();
    if(drakeMenu) drakeMenu.destroy();

    drakeDom = dragula([node.parentNode])
        .on('drop', function(el, container) {
            setTimeout(function(){
                if(drakeDom) drakeDom.destroy();
                dragFromMenu();
            },100);
        }).on('cancel', function(el, container) {
            setTimeout(function(){
                if(drakeDom) drakeDom.destroy();
                dragFromMenu();
            },100);
        });
}

function isCopy(el){
    if (el.classList.contains('action-btn')) return true;
    if (el.classList.contains('snippet-item')) return true;
    return false;
}

function isAcceptable(el, target){

    if (target.classList.contains('edit')) {
        if(el.getAttribute("data-original-title")=="Line") return true;
        if(el.getAttribute("data-original-title")=="Snippet") return true;
        if(el.getAttribute("data-original-title")=="Form") return true;
    }

    if (target.classList.contains('tab-pane')) {
        if(el.getAttribute("data-original-title")=="Line") return true;
        if(el.getAttribute("data-original-title")=="Snippet") return true;
    }

    if (target.nodeName=='FORM') {
        if(el.getAttribute("data-original-title")=="Form Group")  return true;
        if(el.getAttribute("data-original-title")=="Input Checkbox")  return true;
        if(el.getAttribute("data-original-title")=="Input Radio")  return true;
        if(el.getAttribute("data-original-title")=="Button")  return true;
    }

    if (target.classList.contains('form-group')) {
        if(el.getAttribute("data-original-title")=="Label")  return true;
        if(el.getAttribute("data-original-title")=="Column")  return true;
        if(el.getAttribute("data-original-title")=="Input Text")  return true;
        if(el.getAttribute("data-original-title")=="Input E-mail")  return true;
        if(el.getAttribute("data-original-title")=="Input Password")  return true;
        if(el.getAttribute("data-original-title")=="Input Date")  return true;
        if(el.getAttribute("data-original-title")=="Input Number")  return true;
        if(el.getAttribute("data-original-title")=="Input Checkbox")  return true;
        if(el.getAttribute("data-original-title")=="Input Radio")  return true;
        if(el.getAttribute("data-original-title")=="Select")  return true;
        if(el.getAttribute("data-original-title")=="Select")  return true;
        if(el.getAttribute("data-original-title")=="Button")  return true;
    }

    if (target.classList.contains('row')) {
        if(el.getAttribute("data-original-title")=="Column")  return true;
    }

    if (target.classList.contains('col')) {
        if(el.getAttribute("data-original-title")=="Column")  return false;
       
        return true;
    }

    return false;
}

function pushContainer(el) {
    drakeMenu.containers.push(el);
}
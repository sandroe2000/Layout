;
'use strict';

let inputArr = ['text', 'password', 'number', 'email', 'tel', 'url', 'search', 'date', 'datetime', 'datetime-local', 'time', 'month', 'week'];

let numberTemplate = `<div class="form-row mb-2">
                        <div class="col-4 text-right">
                            <label class="mb-2" for="idInput">Min:</label>
                        </div>
                        <div class="col-8">
                            <input id="min" type="number" class="form-control" value="0" />
                        </div>
                    </div>
                    <div class="form-row mb-2">
                        <div class="col-4 text-right">
                            <label class="mb-2" for="idInput">Max:</label>
                        </div>
                        <div class="col-8">
                            <input id="min" type="number" class="form-control" value="0" />
                        </div>
                    </div>`;

let rowsTemplate = `<div class="form-row mb-2">
                        <div class="col-4 text-right">
                            <label class="mb-2" for="idInput">Rows:</label>
                        </div>
                        <div class="col-8">
                            <input id="txtRows" type="number" class="form-control" value="0" min="3" max="30" />
                        </div>
                    </div>`;

let labelTemplate = `<div class="form-row mb-2">
                        <div class="col-12">
                            <label class="mb-2" for="idInput">Label:</label>
                            <input id="labelInput" type="text" class="form-control" />
                        </div>
                    </div>`;

let orientationTemplate = `<div class="form-row mb-2">
                                <div class="col-12">
                                    <div class="custom-control custom-radio">
                                        <input type="radio" id="vertical" name="orientation" class="custom-control-input" checked />
                                    <label class="custom-control-label" for="vertical">Vertical</label>
                                </div>
                                    <div class="custom-control custom-radio">
                                        <input type="radio" id="horizontal" name="orientation" class="custom-control-input" />
                                        <label class="custom-control-label" for="horizontal">Horizontal</label>
                                    </div>
                                </div>
                            </div>`;

let idTemplate = `<div class="form-row mb-2">
                    <div class="col-12">
                        <label class="mb-2" for="idInput">Id:</label>
                        <input id="elementId" type="text" class="form-control" />
                    </div>
                </div>`;

let placeholderTemplate = `<div class="form-row mb-2">
                                <div class="col-12">
                                    <label class="mb-2" for="placeholder">Placeholder:</label>
                                    <input id="placeholder" type="text" class="form-control" />
                                </div>
                            </div>`;

let marginTemplate = `<div class="form-row mb-2">
                        <div class="col-6">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i class="mdi mdi-arrow-upward" style="font-size:20px"></i></div>
                                </div>
                                <input id="mt" type="number" class="form-control" value="0" min="0" max="4" />
                            </div>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i class="mdi mdi-arrow-downward" style="font-size:20px"></i></div>
                                </div>
                                <input id="mb" type="number" class="form-control" value="0" min="0" max="4" />
                            </div>                                
                        </div>
                        <div class="col-6">
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i class="mdi mdi-arrow-back" style="font-size:20px"></i></div>
                                </div>
                                <input id="ml" type="number" class="form-control" value="0" min="0" max="4" />
                            </div>
                            <div class="input-group mb-2">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><i class="mdi mdi-arrow-forward" style="font-size:20px"></i></div>
                                </div>
                                <input id="mr" type="number" class="form-control" value="0" min="0" max="4" />
                            </div>
                        </div>
                    </div>`;

let btnTemplate = `<div class="form-row">                        
                        <div class="col-12">
                            <div class="custom-control custom-switch">
                                <input id="outline" type="checkbox" class="custom-control-input" />
                                <label for="outline" class="custom-control-label mr-2">Outline</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">                        
                        <div class="col-6">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="light" name="colors" class="custom-control-input" checked />
                                <label class="custom-control-label" for="light">Light</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="secondary" name="colors" class="custom-control-input" />
                                <label class="custom-control-label" for="secondary">Secondary</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-6">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="success" name="colors" class="custom-control-input" />
                                <label class="custom-control-label" for="success">Success</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="danger" name="colors" class="custom-control-input" />
                                <label class="custom-control-label" for="danger">Danger</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="col-6">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="warning" name="colors" class="custom-control-input" />
                                <label class="custom-control-label" for="warning">Warning</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="info" name="colors" class="custom-control-input" />
                                <label class="custom-control-label" for="info">Info</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-row mb-2">
                        <div class="col-6">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="primary" name="colors" class="custom-control-input" />
                                <label class="custom-control-label" for="primary">Primary</label>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="custom-control custom-radio">
                                <input type="radio" id="dark" name="colors" class="custom-control-input" />
                                <label class="custom-control-label" for="dark">Dark</label>
                            </div>
                        </div>
                    </div>`;

function setContextmenu() {

    document.querySelector('.main-content.container-fluid.edit').addEventListener('contextmenu', function(event) {
        createContexMenu(event);
        event.preventDefault();
    });

    document.querySelector('.main-content.container-fluid.edit').addEventListener("click", function (event) {
        $("#context-menu").hide('fast');
        $("#context-menu").html('');
        showMenuButton(event);
        showMenuInput(event);
    });
}

function showMenuButton(event){
    if (!event.target.classList.contains("btn")) return false;
    let clicked = event.target.id;
    let btn = `<form style="margin:10px">
            <h5>button</h5>
            <hr />
            ${idTemplate}
            ${labelTemplate}
            ${btnTemplate}
            ${marginTemplate}
        </form>`;    
    $('data').html(btn);
    $('data').attr('clickedId', clicked);    
    loadClicked('data', clicked);
    changeClick('data', clicked);
}

function showMenuInput(event){
    if (inputArr.indexOf(event.target.type) < 0) return false;
    let clicked = event.target.id;
    let input = `<form style="margin:10px">
            <h5>Input ${event.target.type}</h5>
            <hr />
            ${idTemplate}
            ${placeholderTemplate}
            ${marginTemplate}
        </form>`;    
    $('data').html(input);
    $('data').attr('clickedId', clicked);    
    loadClicked('data', clicked);
    changeClick('data', clicked);
}

function createContexMenu(event){
    
    let template = '';
    let col = `<a class="dropdown-item" href="#" onclick="changeColSize();">
            <i class="mdi mdi-compare-arrows"></i> <span style="position:absolute;margin:5px 10px">Switch Column Size</span>
            </a>
            <a class="dropdown-item" href="#" onclick="changeColAlign();">
            <i class="mdi mdi-compare-arrows"></i> <span style="position:absolute;margin:5px 10px">Switch Column Align</span>
            </a>`;

    let input = `<form style="margin:10px">
                    <h5>Input ${event.target.type}</h5>
                    <hr />
                    ${idTemplate}
                    ${placeholderTemplate}
                    ${marginTemplate}
                </form>`;
    let textarea = `<form style="margin:10px">
                    <h5>Textarea</h5>
                    <hr />
                    ${idTemplate}
                    ${rowsTemplate}
                    ${marginTemplate}
                </form>`;
    let checkOrRadio = `<form style="margin:10px">
                    <h5>Input ${event.target.type || 'checkbox'}</h5>
                    <hr />
                    ${idTemplate}
                    ${labelTemplate}
                    ${orientationTemplate}
                    ${marginTemplate}
                </form>`;
    let number = `<form style="margin:10px">
                    <h5>Input ${event.target.type}</h5>
                    <hr />
                    ${idTemplate}
                    ${numberTemplate}
                    ${marginTemplate}
                </form>`;
    let btn = `<form style="margin:10px">
                    <h5>button</h5>
                    <hr />
                    ${idTemplate}
                    ${labelTemplate}
                    ${btnTemplate}
                    ${marginTemplate}
                </form>`;

    if (event.target.type == 'textarea') {
        template = textarea;
    }
    if (inputArr.indexOf(event.target.type) >= 0) {
        template = input;
    }
    if (event.target.classList.contains("custom-control-label")) {
        template = checkOrRadio;
    }
    if (event.target.type == 'radio') {
        template = checkOrRadio;
    }
    if (event.target.type == 'number') {
        template = number;
    }
    if (event.target.classList.contains("col-md-6") || event.target.classList.contains("col-md-12")) {
        template = col;
    }
    if (event.target.classList.contains("btn")) {
        template = btn;            
    }
    if (!template) {
        $("#context-menu").hide('fast', changeOnClose);
        return false;
    }

    $('data').html('');

    let top = event.pageY + 5;
    let left = event.pageX + 5;
    
    $("#context-menu").attr('clickedId', event.target.id);
    $("#context-menu").css({
        display: "block",
        top: top,
        left: left
    });

    $("#context-menu").show('fast');
    $("#context-menu").html(template);

    //-- elemento html que iniciou o contexmenu
    let clicked = $("#context-menu").attr('clickedId');

    loadClicked('#context-menu', clicked);
    changeClick('#context-menu',clicked);

    return false;
}

function changeClick(container, clicked){
    
    //--CHANGE LABEL
    $('#labelInput').change(function(event){
        $(`#${clicked}`).text( $('#labelInput').val() );
    });

    //--PLACEHOLDER
    $('#placeholder').val($(`#${clicked}`).val());
    $('#placeholder').change(function(event){
        $(`#${clicked}`).attr('placeholder', $('#placeholder').val());
    });

    //-- MARGIN CHANGE
    $('#mt').change(function(event){ 
        if(findClass(container, 'mt-')){           
            document.querySelector(`#${clicked}`).classList.remove(findClass(container, 'mt-'));
        }
        document.querySelector(`#${clicked}`).classList.add(`${'mt-'}${event.target.value}`);            
    });
    $('#mr').change(function(event){ 
        if(findClass(container,  'mr-')){           
            document.querySelector(`#${clicked}`).classList.remove(findClass(container, 'mr-'));
        }
        document.querySelector(`#${clicked}`).classList.add(`${'mr-'}${event.target.value}`);            
    });
    $('#mb').change(function(event){ 
        if(findClass(container,  'mb-')){           
            document.querySelector(`#${clicked}`).classList.remove(findClass(container, 'mb-'));
        }
        document.querySelector(`#${clicked}`).classList.add(`${'mb-'}${event.target.value}`);            
    });
    $('#ml').change(function(event){ 
        if(findClass(container, 'ml-')){           
            document.querySelector(`#${clicked}`).classList.remove(findClass(container, 'ml-'));
        }
        document.querySelector(`#${clicked}`).classList.add(`${'ml-'}${event.target.value}`);            
    });

    //--OUTLINE CHANGE
    $('#outline').click(function(event){
        $('input[name="colors"]:checked').click();
    });

    //--COLOR CHANGE
    $('input[name="colors"]').click(function(event){
        
        let prefix = 'btn-';
        let find = 'btn-';
        
        if($('#outline').prop('checked')==true){
            prefix = 'btn-outline-';
        }

        if(findClass(container, find)){
            document.querySelector(`#${clicked}`).classList.remove(findClass(container, find));
            document.querySelector(`#${clicked}`).classList.add(`${prefix}${event.target.id}`);
            //$("#context-menu").find('h5').html(`button ${prefix}${event.target.id}`);
        }
    });

    //-- CHANGE CHECKBOX/RADIO ORIENTATION
    $('#vertical').click(function(event){
        //debugger;
        if($('#vertical').prop('checked')==true){
            let div = document.querySelector(`#${clicked}`).parentElement
            if(div.classList.contains('custom-control-inline')){
                div.classList.remove('custom-control-inline');
            }
        }
    });
    $('#horizontal').click(function(event){
        //debugger;
        let div = document.querySelector(`#${clicked}`).parentElement
        if($('#horizontal').prop('checked')==true){
            if(!div.classList.contains('custom-control-inline')){
                div.classList.add('custom-control-inline');
            }
        }
    });
}

function loadClicked(container, clicked){
    //--CARREGA ID
    $('#elementId').val($(`#${clicked}`).attr('id'));

    //--CARREGA LABEL
    $('#labelInput').val($(`#${clicked}`).text());

    //CARREGA MARGIN
    if(findClass(container, 'mt-')){ 
        $('#mt').val(findClass(container, 'mt-').replace('mt-', ''));
    }
    if(findClass(container, 'mr-')){ 
        $('#mr').val(findClass(container, 'mr-').replace('mr-', ''));
    }
    if(findClass(container, 'mb-')){ 
        $('#mb').val(findClass(container, 'mb-').replace('mb-', ''));
    }
    if(findClass(container, 'ml-')){ 
        $('#ml').val(findClass(container, 'ml-').replace('ml-', ''));
    }

    //--CARREGA OUTLINE
    if(findClass(container, 'btn-outline-')){
        $('#outline').attr('checked', true);
    }

    //-- CARREGA BTN COLOR   
    let btnClassId = '';
    let isBtn = findClass(container, 'btn-')
    if(isBtn){
        btnClassId = isBtn.replace('btn-', '').replace('outline-', '');
        $(`#${btnClassId}`).attr('checked', true);
    }

    //-- CARREGA TEXTAREA ROWS
    $('#txtRows').val($(`#${clicked}`).attr('rows'));
    
    //-- CHANGE TEXTAREA ROWS
    $('#txtRows').change(function(event){
        $(`#${clicked}`).attr('rows', $('#txtRows').val());
    });
}

function changeColSize() {
    let clicked = $("#context-menu").attr('clickedId');
    $(`#${clicked}`).toggleClass('col-md-6 col-md-12');
    //domHasChanged();
}

function changeOnClose(){
    //CHANGE ID
    if($('#elementId').val() != ''){
        let clicked = $("#context-menu").attr('clickedId');
        $(`#${clicked}`).attr('id', $('#elementId').val());            
    }
}

function changeColAlign(){
    let clicked = $("#context-menu").attr('clickedId');
    $(`#${clicked}`).toggleClass('text-right text-left'); 
}

function findClass(container, partial){
    let clicked = $(container).attr('clickedId');
    let obj = document.querySelector(`#${clicked}`);
    let ret = "";

    for(let i=0; i<obj.classList.length; i++){
        if(obj.classList.item(i).indexOf(partial)>=0){
            ret = obj.classList.item(i);
        }
    }
    return ret;
}
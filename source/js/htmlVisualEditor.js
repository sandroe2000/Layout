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

let contador = 1;
let row = `<div class="form-row" id="${contador}">
                <div class="col-md-4 mt-2">
                    <input type="text" class="form-control form-control-sm" id="label" />
                </div>
                <div class="col-md-3 mt-2">
                    <select class="form-control form-control-sm" id="type">
                        <option disabled>Single value</option>
                        <option>Text</option>
                        <option>Text(Mult lines)</option>
                        <option>File</option>
                        <option>CheckBox</option>
                        <option>Currency</option>
                        <option>Date</option>
                        <option>Date and Time</option>
                        <option>Dropdown</option>
                        <option>Email</option>
                        <option>Location</option>
                        <option>Number(Integer)</option>
                        <option>Number(Decimal)</option>
                        <option>Phone</option>
                        <option>Time</option>
                        <option>User reference</option>
                        <option disabled>Complex types</option>
                        <option>Data reference</option>
                        <option>Field group</option>
                        <option>Field group(Repeating)</option>
                    </select>
                </div>
                <div class="col-md-3 mt-2">
                    <select class="form-control form-control-sm" id="type">
                        <option>Optional</option>
                        <option>Required</option>
                    </select>
                </div>
                <div>
                    <button class="btn btn-light btn-sm mt-2" type="button">
                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                    </button>
                    <button class="btn btn-light btn-sm mt-2" type="button" onclick="removeRow(this)">
                        <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </div>
            </div>`;

$('.modal').on('show.bs.modal', function (event) {
    
    let button = $(event.relatedTarget);
    let modal = $(this);
    let clazz = $(button).children().attr('class') || $(button).attr('class');
    let titleTemplate = `<i class="${clazz}"></i> ${$(button).text().trim()}`;
    let bodytemplate = `<div class="row">
                            <div class="col-md-12 fieldsContainer"></div>
                        </div>`;
    modal.find('.modal-title').html(titleTemplate);
    modal.find('.modal-body form').html(bodytemplate);

    $('#addField').on('click', function(event){
        $('.fieldsContainer').append(row);
    });
    
    $('#menuToggle').on('click', function(event){
        $('.main-menu').toggleClass('left-to-right');
        $(this).find('i').toggleClass('mdi-last-page mdi-first-page');
    });

    $('#addField').trigger('click');
});

function removeRow(btn){ 
    $(btn).parents('.form-row').remove();
}

$('div.modal-footer > button.btn.btn-primary').on('click', function(event){
   
    //--TODO

    $('#modalCreateFolder').modal('hide');
});
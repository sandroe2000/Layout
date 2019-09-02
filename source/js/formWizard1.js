'use strict';

// Toolbar extra buttons
let btnFinish = $('<button></button>').text('Save').addClass('btn btn-info').on('click', function(){ 
  alert('Finish Clicked'); 
});

let btnCancel = $('<button></button>').text('Cancel').addClass('btn btn-danger').on('click', function(){ 
  $('#smartwizard').smartWizard("reset"); 
});

$('#smartwizard').smartWizard({
  theme:'arrows',
  toolbarSettings: {
    toolbarButtonPosition: 'start',
    toolbarExtraButtons: [btnFinish, btnCancel]
  }
});

let contador = 1;
let row = `<div class="row mb-1 mt-1" id="${contador}">
    <div class="col-md-3 mt-2">
        <input type="text" class="form-control form-control-lg" id="label" />
    </div>
    <div class="col-md-3 mt-2">
        <select class="form-control form-control-lg" id="type">
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
        <select class="form-control form-control-lg" id="type">
            <option>Optional</option>
            <option>Required</option>
        </select>
    </div>
    <div style="margin-top: 5px;">
        <button class="btn btn-light btn-sm" type="button">
            <i class="mdi mdi-more-horiz"></i>
        </button>
        <button class="btn btn-light btn-sm" type="button">
            <i class="mdi mdi-delete-forever"></i>
        </button>
    </div>
</div>`;

$('#addField').on('click', function(event){
    $('.fieldsContainer a').before(row);
});

$('#menuToggle').on('click', function(event){
    $('.main-menu').toggleClass('left-to-right');
    $(this).find('i').toggleClass('mdi-last-page mdi-first-page');
});

function deleteRow(id){
    console.log(`${id} foi removido!`);
}

(function(){
    let $remove = $('#msgContainer').confirmRemove({pressDell:true});

    $('.row').on('click', '.mdi.mdi-delete-forever', function(){
        $remove.confirm(this.closest('.row'), deleteRow);
    });

    $('#addField').trigger('click');
})();
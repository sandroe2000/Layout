'use strict';

/*
window.addEventListener('keydown', function(event) {
    if (event.keyCode == 46 && layout.design) { confirmRemoveNode(); }
}, false);

$('.row').on('click', 'i.fa.fa-trash-o', function(event){
    
    $(this).closest('.row').remove();
});
*/

$('#addField').on('click', function(event){
    
    let row = `<div class="row mb-2">
        <div class="col-md-3">
            <input type="text" class="form-control" id="label" />
        </div>
        <div class="col-md-3">
            <select class="form-control" id="type">
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
        <div class="col-md-3">
            <select class="form-control" id="type">
                <option>Optional</option>
                <option>Required</option>
            </select>
        </div>
        <div style="margin-top: 5px;">
            <i class="fa fa-cog mr-2" data-toggle="dropdown" aria-hidden="true" style="font-size: 22px"></i>
            <div class="dropdown-menu">
                <button class="dropdown-item" type="button">New Folder</button>
                <button class="dropdown-item" type="button">New File</button>
            </div>
            <i class="fa fa-trash-o mr-2" aria-hidden="true" style="font-size: 22px"></i>
        </div>
    </div>`;
    $('.fieldsContainer a').before(row);
});

(function(){
    setTemplateMsgBox('#msgContainer', '.fa.fa-trash-o', '.row');
})();
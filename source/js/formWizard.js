'use strict';

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
            </select>
        </div>
        <div class="col-md-3">
            <i class="fa fa-cog mr-2" data-toggle="dropdown" aria-hidden="true" style="font-size: 22px"></i>
            <div class="dropdown-menu">
                <button class="dropdown-item" type="button">
                    <i class="fa fa-folder-open-o" aria-hidden="true"></i> New Folder
                </button>
                <button class="dropdown-item" type="button">
                    <i class="fa fa-file-o" aria-hidden="true"></i> New File
                </button>
            </div>
            <i class="fa fa-trash-o mr-2" aria-hidden="true" style="font-size: 22px"></i>
        </div>
    </div>`;
    $('.fieldsContainer a').before(row);
});

$('.main-app').on('click', '.fa.fa-trash-o', function(event){
   event.target.closest('.row').remove();
});
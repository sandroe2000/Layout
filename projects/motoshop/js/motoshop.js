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
        toolbarButtonPosition: 'end',
        toolbarExtraButtons: [btnFinish, btnCancel]
    }
});
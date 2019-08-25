;
'use strict';

var inputCol = document.querySelector('#inputCol');
var inputOffSet = document.querySelector('#inputOffSet');
var inputValign = document.querySelector('#inputValign');

function nodeShowProperties(el) {

    if (!el) return false;

    var hasChange = false;

    currentNodeInEdit = el;
    inputCol.value = "";
    inputOffSet.value = "";
    inputValign.value = "";

    if (el.hasAttribute('class')) {
        el.getAttribute('class')
            .split(' ')
            .filter(function(str, index) {
                if (str.match(/col-md-\d/g)) {
                    inputCol.value = str;
                    hasChange = true;
                }

                if (str.match(/col-md-offset-\d/g)) {
                    inputOffSet.value = str;
                    hasChange = true;
                }

                if (str.match(/radio-inline|checkbox-inline/g)) {
                    inputValign.value = 'H';
                    hasChange = true;
                } else if (str.match(/radio|checkbox/g)) {
                    inputValign.value = 'V';
                    hasChange = true;
                }
            });
    }


}

function replaceClassInNode(regexPattern, newClass) {

    var el = currentNodeInEdit;

    if (el.hasAttribute('class')) {
        el.getAttribute('class')
            .split(' ')
            .filter(function(str, index) {
                if (str.match(regexPattern)) {
                    el.classList.remove(str);
                }
            });
        el.classList.add(newClass);
    }
    domHasChanged();
}

inputCol.addEventListener('change', function(event) {
    replaceClassInNode(/col-md-\d/g, this.value);
}, false);

inputOffSet.addEventListener('change', function(event) {
    replaceClassInNode(/col-md-offset-\d/g, this.value);
}, false);

inputValign.addEventListener('change', function(event) {
    var type = currentNodeInEdit.children[0].children[0].getAttribute('type')
    if (!this.value) return false;
    //var pattern = '/' + type + '/g'
    replaceClassInNode(new RegExp(type), type + (this.value == 'H' ? '-inline' : ''));
}, false);
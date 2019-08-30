let templateMsgBox = `<!-- START PRELOADS -->
<audio id="audio-alert" src="source/audio/alert.mp3" preload="auto"></audio>
<audio id="audio-fail" src="source/audio/fail.mp3" preload="auto"></audio>
<!-- END PRELOADS -->

<!-- MESSAGE BOX-->
<div class="message-box animated fadeIn" data-sound="alert" id="message-box-alert">
    <div class="mb-container">
        <div class="mb-middle">
            <div class="mb-title">Are you sure you want to delete?</div>
            <div class="mb-content">
                <p>Press No if you do not want to delete. Press Yes to remove current element.</p>
            </div>
            <div class="mb-footer">
                <div class="pull-right">
                    <button class="btn btn-success btn-lg mb-control-yes">Yes</a>
                    <button class="btn btn-secondary btn-lg mb-control-close" style="margin-left:15px">No</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- END MESSAGE BOX-->`;

/* MESSAGE BOX */
function setTemplateMsgBox(container, button, obj){
    
    if(!document.querySelector(container).hasChildNodes()){
        $(container).append(templateMsgBox);
    }

    $(obj).on('click', button, function(event){
        event.preventDefault();
        event.stopPropagation();
        confirmRemove( event.target.closest(obj) );
    });

    $(".mb-control-yes").on("click", function() {
        removeCurrentNode();
        $(this).parents(".message-box").removeClass("open");
        return true;
    });
    
    $(".mb-control-close").on("click", function() {
        $(this).parents(".message-box").removeClass("open");
        return false;
    });
}

let currentNode = null;

function removeCurrentNode(){
    $(currentNode).remove();
}

function confirmRemove(el) {

    currentNode = el;

    var box = $('#message-box-alert');

    if (box.length > 0) {
        
        box.toggleClass("open");
        
        let sound = box.data("sound");

        if (sound === 'alert') {
            playAudio('alert');
        }

        if (sound === 'fail') {
            playAudio('fail');
        }
    }

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
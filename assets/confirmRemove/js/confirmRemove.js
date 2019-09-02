(function($){
    $.fn.confirmRemove = function(options) {

        let settings = $.extend({
            trigger: "", 
            objToRemove: null,
            title: "Are you sure you want to delete?",
            subTitle: "Press No if you do not want to delete. Press Yes to remove current element.",
            btnYes: "Yes",
            btnNo: "No",
            pressDell: false
        }, options );

        let templateMsgBox = `<!-- START PRELOADS -->
            <audio id="audio-alert" src="source/audio/alert.mp3" preload="auto"></audio>
            <audio id="audio-fail" src="source/audio/fail.mp3" preload="auto"></audio>
            <!-- END PRELOADS -->

            <!-- MESSAGE BOX-->
            <div class="message-box animated fadeIn" data-sound="alert" id="message-box-alert">
                <div class="mb-container">
                    <div class="mb-middle">
                        <div class="mb-title">${settings.title}</div>
                        <div class="mb-content">
                            <p>${settings.subTitle}</p>
                        </div>
                        <div class="mb-footer">
                            <div class="pull-right">
                                <button class="btn btn-primary btn-lg mb-control-yes mt-1" style="margin-right:15px">${settings.btnYes}</a>
                                <button class="btn btn-primary btn-lg mb-control-close mt-1">${settings.btnNo}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- END MESSAGE BOX-->`;
 
        if(!this[0].hasChildNodes()){
            this[0].innerHTML = templateMsgBox;
        }

        let confirmRemove = {

            callBack: null,

            objToRemove: null,

            removeCurrentNode: function(){
                $(confirmRemove.objToRemove).remove();
                confirmRemove.callBack(confirmRemove.objToRemove.id);
            },

            confirm: function(el, callBack) {
                confirmRemove.callBack = callBack;
                confirmRemove.objToRemove = el;        
                let box = $('#message-box-alert');        
                if (box.length > 0) {                
                    box.toggleClass("open"); 
                    $(".mb-control-yes").focus();               
                    let sound = box.data("sound");        
                    if (sound === 'alert') {
                        confirmRemove.playAudio('alert');
                    }        
                    if (sound === 'fail') {
                        confirmRemove.playAudio('fail');
                    }
                }        
            },

            playAudio: function(file) {
                if (file === 'alert'){
                    document.getElementById('audio-alert').play();
                }        
                if (file === 'fail'){
                    document.getElementById('audio-fail').play();
                }
            } 
        };

        window.addEventListener('keydown', function(event) {
            if (event.keyCode == 46 && settings.pressDell) { 
                if(!document.body.contains(confirmRemove.objToRemove)){ 
                    alert('Primeiro selecione um objeto para exclusão!');
                    return false;
                }
                confirmRemove.confirm(confirmRemove.objToRemove); 
            }
            if (event.keyCode == 27) { 
                if( $(".mb-control-close").parents(".message-box").hasClass("open") ){ 
                    $(".mb-control-close").trigger('click');
                }
            }
        }, false);
        
        if(settings.trigger && settings.objToRemove){
            $(settings.objToRemove).on('click', settings.trigger, function(event){
                event.preventDefault();
                event.stopPropagation();
                confirmRemove.confirm( event.target.closest(settings.objToRemove) );
            });
        }
    
        $(".mb-control-yes").on("click", function() {
            confirmRemove.removeCurrentNode();
            $(".mb-control-yes").parents(".message-box").removeClass("open");
            return true;
        });
        
        $(".mb-control-close").on("click", function() {
            $(".mb-control-close").parents(".message-box").removeClass("open");
            return false;
        });

        return confirmRemove;    
    }; 
 
})(jQuery);
;
'use strict';

function setContextmenu(){
    
    $('.main-content.container-fluid.edit').on('contextmenu', function(event) {
        debugger;
        let template = '';

        let LabelTemplate = `<div class="form-row mb-2">
                                <div class="col-4 text-right">
                                    <label class="mb-2" for="idInput">Label:</label>
                                </div>
                                <div class="col-8">
                                    <input id="LabelInput" type="text" class="form-control" />
                                </div>
                            </div>`;

        let orientationTemplate = `<div class="form-row mb-2">
                                      <div class="col-4 text-right">
                                          <label class="mb-2" for="idInput">Orientation:</label>
                                      </div>
                                      <div class="col-8">
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="vertical" name="orientation" class="custom-control-input" />
                                          <label class="custom-control-label" for="vertical">Vertical</label>
                                        </div>
                                        <div class="custom-control custom-radio">
                                          <input type="radio" id="horizontal" name="orientation" class="custom-control-input" checked />
                                          <label class="custom-control-label" for="horizontal">Horizontal</label>
                                        </div>
                                      </div>
                                  </div>`;

        let idTemplate = `<div class="form-row mb-2">
                            <div class="col-4 text-right">
                              <label class="mb-2" for="idInput">Id:</label>
                            </div>
                            <div class="col-8">
                              <input id="idInput" type="text" class="form-control" />
                            </div>
                          </div>`;

        let placeholderTemplate = `<div class="form-row mb-2">
                                      <div class="col-4 text-right">
                                        <label class="mb-2" for="idInput">Placeholder:</label>
                                      </div>
                                      <div class="col-8">
                                        <input id="idInput" type="text" class="form-control" />
                                      </div>
                                  </div>`;

        let marginTemplate = `<div class="form-row mb-2">
                                <div class="col-4 text-right">
                                    <label class="mb-2" for="idInput">Margin:</label>
                                </div>
                                <div class="col-4">
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
                                <div class="col-4">
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
        
        
        let col = `<a class="dropdown-item" href="#" onclick="changeColSize();">
                    <i class="mdi mdi-compare-arrows"></i> <span style="position:absolute;margin:5px 10px">Switch Column Size</span>
                  </a>`;        
        let input = `<form style="margin:10px">
                        ${idTemplate}
                        ${placeholderTemplate}
                        ${marginTemplate}
                    </form>`;
        let check = `<form style="margin:10px">
                        ${idTemplate}
                        ${LabelTemplate}
                        ${orientationTemplate}
                        ${marginTemplate}
                    </form>`;

        if(event.target.classList.contains("form-control")){
            template = input;
        }
        if(event.target.classList.contains("custom-control-label")){
            template = check;
        }
        if(event.target.classList.contains("col-md-6") || event.target.classList.contains("col-md-12")){
            template = col;
        }
        if(!template){
            return false;
        }

        $("#context-menu").html(template);

        let top = event.pageY + 5;
        let left = event.pageX + 5;

        $("#context-menu").attr('idCol', event.target.id);
        $("#context-menu").css({
            display: "block",
            top: top,
            left: left
        });
        $("#context-menu").addClass("show");            
        return false; 

    });
    $('.main-content.container-fluid.edit').on("click", function() {
        $("#context-menu").removeClass("show").hide();
    });
}

function changeColSize(){
    let col = $("#context-menu").attr('idCol');
    $(`#${col}`).toggleClass('col-md-6 col-md-12');
    domHasChanged();
}

$("#context-menu a").click(function() {
    $(this).parent().removeClass("show").hide();
});

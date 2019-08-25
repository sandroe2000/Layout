var beautify_in_progress = false;
var editor = CodeMirror.fromTextArea(
    document.getElementById("source"), {
        lineNumbers: true,
        mode: "text/html",
        matchTags: { bothTags: true }
    }
);

function unpacker_filter(source) {
    var trailing_comments = '',
        comment = '',
        unpacked = '',
        found = false;

    // cut trailing comments
    do {
        found = false;
        if (/^\s*\/\*/.test(source)) {
            found = true;
            comment = source.substr(0, source.indexOf('*/') + 2);
            source = source.substr(comment.length).replace(/^\s+/, '');
            trailing_comments += comment + "\n";
        } else if (/^\s*\/\//.test(source)) {
            found = true;
            comment = source.match(/^\s*\/\/.*/)[0];
            source = source.substr(comment.length).replace(/^\s+/, '');
            trailing_comments += comment + "\n";
        }
    } while (found);

    var unpackers = [P_A_C_K_E_R, Urlencoded, JavascriptObfuscator /*, MyObfuscate*/ ];
    for (var i = 0; i < unpackers.length; i++) {
        if (unpackers[i].detect(source)) {
            unpacked = unpackers[i].unpack(source);
            if (unpacked != source) {
                source = unpacker_filter(unpacked);
            }
        }
    }

    return trailing_comments + source;
}

function beautify() {
    if (beautify_in_progress) return;

    beautify_in_progress = true;

    var source = editor ? editor.getValue() : $('#source').val(),
        output,
        opts = {};

    opts.indent_size = 2;
    opts.indent_char = opts.indent_size == 1 ? '\t' : ' ';
    opts.max_preserve_newlines = 0;
    opts.preserve_newlines = opts.max_preserve_newlines !== "-1";
    opts.keep_array_indentation = $('#keep-array-indentation').prop('checked');
    opts.break_chained_methods = $('#break-chained-methods').prop('checked');
    opts.indent_scripts = $('#indent-scripts').val();
    opts.brace_style = $('#brace-style').val() + ($('#brace-preserve-inline').prop('checked') ? ",preserve-inline" : "");
    opts.space_before_conditional = $('#space-before-conditional').prop('checked');
    opts.unescape_strings = $('#unescape-strings').prop('checked');
    opts.jslint_happy = $('#jslint-happy').prop('checked');
    opts.end_with_newline = $('#end-with-newline').prop('checked');
    opts.wrap_line_length = $('#wrap-line-length').val();
    opts.indent_inner_html = $('#indent-inner-html').prop('checked');
    opts.comma_first = $('#comma-first').prop('checked');
    opts.e4x = $('#e4x').prop('checked');

    if (looks_like_html(source)) {
        output = html_beautify(source, opts);
    } else {
        if ($('#detect-packers').prop('checked')) {
            source = unpacker_filter(source);
        }
        output = js_beautify(source, opts);
    }
    if (editor) {
        editor.setValue(output);
    } else {
        $('#source').val(output);
    }

    beautify_in_progress = false;
}

function looks_like_html(source) {
    // <foo> - looks like html
    var trimmed = source.replace(/^[ \t\n\r]+/, '');
    return trimmed && (trimmed.substring(0, 1) === '<');
}

editor.setSize('100%', document.querySelector("main").offsetHeight);
editor.refresh();
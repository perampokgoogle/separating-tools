
$(function () {

    $('#box1').focus();

    $("#box1").keyup(function () {

        process(false);
    });


    $("#box1").on('paste', function () {

        setTimeout(function () {
            process(true);
        }, 1);
    });


    function process(pasted) {

        $('#social').show();

        var input = $('#box1').val();  // do not trim this because we are looking out for spaces in text to speech for example

        if (typeof convert === 'function') { 
            $('#box2').val(convert(input, pasted));
        }

        var lineCount = input.split(/\r\n|\r|\n/).length;

        $('#text-stats').html('Lines: ' + lineCount);

    }
});

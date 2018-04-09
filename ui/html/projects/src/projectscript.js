var editing = false;
var projectJSON;
$(document).ready(function() {
    
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll > 0) {
            $('#nav').css('border-bottom','1px solid rgb(223, 225, 226)')
        } else {
            $('#nav').css('border-bottom','1px solid rgb(255, 255, 255)')
        }

    });



    $('.block').on('paste', function(e) {

        var pasteData = e.originalEvent.clipboardData.getData('text');
        
        e.innerHTML = "test";
        console.log(pasteData);
      
    });


    var backgroundImageURL = "https://static1.squarespace.com/static/583e2b56e6f2e18631f012e9/t/592dc2a215cf7d5499dfb1f5/1496171195467/";
    $('#photo').attr('style','background-image: url('+backgroundImageURL+');');



});


function toggleEditing() {

    console.log("pressed");

    if (editing) {
        $('.block').each(function() {
            $(this).removeAttr('contenteditable');
        });
        $('#editButton').attr('editing','false');
        $('#editButton').html('EDIT PROJECT');
        editing = false;

    } else {
        $('.block').each(function() {
            $(this).attr('contenteditable','true');
        });
        $('#editButton').attr('editing','true');
        $('#editButton').html('SAVE PROJECT');
        editing = true;

    }

}
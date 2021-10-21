$(document).ready(function () {
    let sideselected = 'right'
    $('.button-container').click(function (e) { 
        e.preventDefault(); 
        if(sideselected === 'left'){
            $('.button-selection').css('left', '-1px');
            $('.button-selection').css('border-radius', '0 5px 5px 0');
            $('#login').css('left', '0px');
            $('#register').css('left', '1000px');
            
            sideselected = 'right'
        } else{
            sideselected = 'left'
            $('.button-selection').css('left', '50%');
            $('.button-selection').css('border-radius', '5px 0 0 5px');
            $('#login').css('left', '-1000px');
            $('#register').css('left', '0px');            

        }
    });
});

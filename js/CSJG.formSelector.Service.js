$(document).ready(function () {
    let sideselected = 'left'
    $('.button-container').click(function (e) { 
        e.preventDefault(); 
        console.log($('.button-selection').css('left'))
        if(sideselected === 'left'){
            $('.button-selection').css('left', '0px');
            $('.button-selection').css('border-radius', '0 5px 5px 0');
            sideselected = 'right'
        } else{
            sideselected = 'left'
            $('.button-selection').css('left', '50%');
            $('.button-selection').css('border-radius', '5px 0 0 5px');
        }
    });
});


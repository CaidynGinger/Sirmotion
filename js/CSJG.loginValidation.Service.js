$(document).ready(function() {
    VerifyUser()
    logOutUser()
});

function VerifyUser() {
    if (sessionStorage.getItem('userName')) {
        console.log("logged")
    } else {
        window.location.href = '../CSJG.index.html'
    }
}


function logOutUser() {
    $('#signOut').click(function(e) {
        e.preventDefault();
        sessionStorage.removeItem('userName');
        VerifyUser()
    });
}
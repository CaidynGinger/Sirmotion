$(document).ready(function () {
    url = "http://owmakerspace.co.za/users/data.json"
    $('.login-btn').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation ();
        searchedUsers = 0
        var userName = $('#loginUsername').val();
        var password = $('#loginPassword').val();

        $.getJSON(url, function (json) {
            console.log(json.users);
            json.users.every(user => {
                searchedUsers ++
                if (user.username === userName && user.password === password) {
                    if (user.account === 'active') {
                        sessionStorage.setItem('userName', userName)
                        console.log('logged in')
                        enableLogInSession()
                        return false
                    } else {
                        $('.message').css('background-color', 'orange');
                        $('.message').text('Your Account has been suspended! Contact Support');
                        return false
                    }
                } else if(searchedUsers >= json.users.length){
                    $('.message').css('background-color', 'tomato');
                    $('.message').text('Your Email or Password Does Not match');
                    return false
                }
                else {
                    return true
                }
            })
        });
    });
});

function enableLogInSession(){
    window.location.href = 'pages/JVDW.homepage.html' 
}
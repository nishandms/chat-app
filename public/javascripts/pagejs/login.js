console.log("here")

$('#create-user').click(function (event) {
    event.preventDefault();
    $('#sign-in').hide();
    $('#sign-up').css('display', 'flex');
 })
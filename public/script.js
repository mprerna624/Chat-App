// Client Side Logic

const socket = io();

$('#chat-box').hide();

$('#send-btn').on('click', () => {
    const msgText = $('#inp').val();

    if(!msgText) {
        return;
    } 
    else {
        socket.emit('send-msg', {msg: msgText}); //custom event triggerred
    }
    $('#inp').val("")
});


socket.on('received-msg', (data) => {
    // console.log(data);
    $('#chat').append(`<li class="border mb-2 p-2 rounded-pill">
                <span class="fw-bold">${data.username}:</span> ${data.msg}
            </li>`)
});


$('#login-btn').on('click', () => {
    const username = $('#username').val();

    socket.emit('login', { username: username })

    $('#chat-box').show();
    $('#login').hide();

})
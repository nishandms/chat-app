let fromUserId;
let toUserId;
const isMobile = window.innerWidth <= 767 ? true : false;
const socket = io(window.location.origin, {
    transports: ['websocket'],
  });

$(document).ready(function() {
    initEvents();
    getUserDetails()
    getFrnds();
});
  
function initEvents() {
    $('#input-field').on('keypress', function (e) {
        if (e.which === 13) {
            sendMessage();
        }
    });

    socket.on("message", (data) => {
        console.log(data);
        if (data.fromId != toUserId) return;
        const recivedMsge = getMsgPanel(data, 'received');
        $('#field').append(recivedMsge);
        scrollDown();
    });

    $("#send-btn").click(() => {
        sendMessage();
    });

    window.addEventListener('popstate', function (event) {
        if (isMobile) {
            history.pushState(null, null, location.href); // Push it back again 
            switchUi('chat'); 
        }
    });
}

function sendMessage() {
    let msge = $("#input-field").val();
    let time = getTime();
    let sendData = {
        fromId: fromUserId,
        toId: toUserId,
        message: msge,
        time: time
    }
    const sendMsgeEle = getMsgPanel(sendData, 'sent')
    socket.emit('send', sendData);
    $("#input-field").val("");
    $('#field').append(sendMsgeEle);
    scrollDown();
}

function getTime() {
    return Date.now();
}

function getFrnds() {
    $.ajax({
        url: "/rest/get-frnds",
        method: "GET"
    }).done(response => {
        console.log(response)
        if (response) {
            $("#chat-list-parent").html("");
            response.forEach(chat => {
                $("#chat-list-parent").append(getFrndPanel(chat))
            })
        }
    })
}

function getUserDetails() {
    $.ajax({
        url: "/rest/get-user-details",
        method: "GET"
    }).done(data => {
        fromUserId = data._id;
        socket.emit('join', fromUserId);
        console.log(data)
    })
}

function getFrndPanel(data) {
    return `<li class="chat-item" onclick="loadChat('${data._id}',this)">
          <img src="/images/bg-2.jpg" class="avatar" />
          <div class="frnd-panel">
            <strong class="frnd-name">${data['name']}</strong>
            <p class="msg">where are you</p>
            <span class="time">23 mins</span>
          </div>
        </li>`;
}

function getMsgPanel(msge, direction) {
    return `<div class="message-panel ${direction}">
        <div class="message">${msge.message}</div>
        <span class="message-time">12:30</span>
    </div>`;
}

function loadChat(id, event) {
    $("#field").html('');
    $(".chat-item").removeClass("active");
    $(event).addClass('active');
    if(isMobile)  switchUi('chat');
    toUserId = id;
}

function switchUi(panel) {
    if (panel == 'chat') {
        $('.chat-window').css('display', 'flex');
        $('.sidebar').css('display', 'none');
    } else {
        $('.chat-window').css('display', 'none');
        $('.sidebar').css('display', 'flex')
    }
}

function scrollDown() {
    $('#field').scrollTop($('#field')[0].scrollHeight);
}


'use strict';

$(function(){

    // ======================================================================

    const io = ws('');
    const client = io.channel('online').connect(console.log);
    const impMessage = $("#message");

    var room;
    var objMsg = { room: null, message: null, type: null };

    // ======================================================================

    client.on('messageToMe', drawMessagesToMe);
    client.on('message', drawMessages);
    client.on('firtMessages', drawFirstMessages);

    // ======================================================================

    function drawFirstMessages(message){
        $("#bodyMessage").empty();
        $.each(message, function(index, msg) {
            let code =
                `<div class="direct-chat-msg"><br>
                  <div class="direct-chat-info clearfix">
                    <span class="direct-chat-name pull-left" style="margin-left: 5rem;">Alexander Pierce</span>
                    <span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
                  </div>
                  <img class="direct-chat-img" src="/dist/img/user2-160x160.jpg" alt="message user image">
                  <div class="direct-chat-text">
                    ${ msg.message }
                  </div>
                </div>`;
            $("#bodyMessage").append(code);
        });
    }

    function drawMessages(message){
        if ($("body").find('.direct-chat-msg').length == 0){ $("#bodyMessage").empty(); }
        let code =
            `<div class="direct-chat-msg"><br>
              <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-left" style="margin-left: 5rem;">Alexander Pierce</span>
                <span class="direct-chat-timestamp pull-right">23 Jan 2:00 pm</span>
              </div>
              <img class="direct-chat-img" src="/dist/img/user2-160x160.jpg" alt="message user image">
              <div class="direct-chat-text">
                ${ message.message }
              </div>
            </div>`;
        $("#bodyMessage").append(code);
    }

    function drawMessagesToMe(message){
        if ($("body").find('.direct-chat-msg').length == 0){ $("#bodyMessage").empty(); }
        let code =
            `<div class="direct-chat-msg right"><br>
              <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-right" style="margin-right: 5rem;">Sarah Bullock</span>
                <span class="direct-chat-timestamp pull-left">23 Jan 2:05 pm</span>
              </div>
              <img class="direct-chat-img" src="/dist/img/user3-128x128.jpg" alt="message user image">
              <div class="direct-chat-text">
                  ${ message.message }
              </div>
            </div>`;
        $("#bodyMessage").append(code);
    }

    // ======================================================================

    $("#sendMsg").click(function(event) {
        if (impMessage.val()){
            objMsg.room = room;
            objMsg.type = "message";
            objMsg.message = impMessage.val();
            client.emit('message', objMsg);
            impMessage.val("");
        }
    });

    $("#formMessage").on('submit', function(event) {
        event.preventDefault();
        $("#sendMsg").trigger('click');
    });

    $("#showModalBtn").click(function(event) {
        document.location.href = "#";
    });

    $("body").on('click', '.room', function(event) {
        room = $(this).data('rm');
        client.joinRoom(room, {}, function(err, join){
            if (err){
                console.log(err);
            }
            if (join){
                objMsg.type = "getFirstMessages";
                objMsg.room = room;
                client.emit('message', objMsg);
            }
        });
    });

    // ======================================================================

});

'use strict';

$(function(){

    // $('#messages-container').animate({
    //     scrollTop: $('#messages-container').get(0).scrollHeight}, 2000);

    // ======================================================================

    const io = ws('');
    const client = io.channel('online').connect(console.log);
    const Room = io.channel('online_room').connect(console.log);
    const impMessage = $("#message");
    const onlineContainer = $("#roombox");

    var room = "miroom";
    var objMsg = { room: null, message: null, type: null };
    var datoFinded;
    var myinfo;

    // ======================================================================
    // Funcionamiento de online

    client.on('presence:state', function(state){
        onlineContainer.empty()
        state.map(function (user){
            let users = `<li style="cursor:pointer;" class="room">
              <a class="users-list-name" href="#">${user.payload[0].meta.nickname}</a>
            </li>`
            onlineContainer.append(users)
        })
        // onlineContainer.innerHTML = users.join('');

    })


    // ======================================================================

    datoFinded = initFinder();

    client.emit('getmyinfo', {});
    client.on('messageToMe', drawMessagesToMe);
    client.on('message', drawMessages);
    client.on('firtMessages', drawFirstMessages);
    client.on('onGetmyinfo', function(res){ myinfo = res; });
    Room.on('onMakeusersroom', addedPartnersRoom);

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
                <span class="direct-chat-name pull-left" style="margin-left: 5rem;">
                    ${ message.user.nickname }
                </span>
                <span class="direct-chat-timestamp pull-right">${ message.time }</span>
              </div>
              <img class="direct-chat-img" src="/dist/img/${ message.user.image }" alt="message user image">
              <div class="direct-chat-text">
                ${ message.message.message }
              </div>
            </div>`;
        $("#bodyMessage").append(code);
    }

    function drawMessagesToMe(message){
        if ($("body").find('.direct-chat-msg').length == 0){ $("#bodyMessage").empty(); }
        let code =
            `<div class="direct-chat-msg right"><br>
              <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-right" style="margin-right: 5rem;">
                    ${ message.user.nickname }
                </span>
                <span class="direct-chat-timestamp pull-left">${ message.time }</span>
              </div>
              <img class="direct-chat-img" src="/dist/img/${ message.user.image }" alt="message user image">
              <div class="direct-chat-text">
                  ${ message.message.message }
              </div>
            </div>`;
        $("#bodyMessage").append(code);
    }

    function initFinder(){
        var dato = $('body').find("#searchuser").selectize({
            valueField: 'nickname',
            labelField: 'nickname',
            searchField: 'nickname',
            create: false,
            render: {
                option: function(item, escape) {
                    let theUsername = escape(item.nickname);
                    return `<div class="findedObj ${ escape(item.nickname) }">
                        <img src="/dist/img/${ escape(item.image) }" class="img-responsive img-circle" id="" style="width:5%;"/>
                        <label class="name">${ escape(item.nickname) }</label>
                    </div>`;
                }
            },
            load: function(query, callback) {
                if (!query.length) return callback();
                $.ajax({
                    url: '/find-users/' + encodeURIComponent(query),
                    type: 'GET',
                    error: function() {
                        callback();
                    },
                    success: function(res) {
                        callback(res.slice(0, 10));
                    }
                });
            }
        });
        return dato[0].selectize;
    }

    function makeAddedRoom(room){
        let code = `<li style="cursor:pointer;" class="room" data-rm="${room.room_name}">
          <img src="/dist/img/${room.image}">
          <a class="users-list-name" href="#">${room.room_name}</a>
        </li>`;
        $("#roombox").append(code);
    }

    function addedPartnersRoom(response){
        if (myinfo.nickname == response.user.nickname){
            makeAddedRoom(response.room);
            Room.joinRoom(response.room.room_name, {}, function(err, join){
                if (err){
                    console.log(err);
                }
                if (join){
                    console.log("Conectado a room: " + join);
                }
            });
            // let contact = `<li style="border: solid .1rem rgba(0, 0, 0, 0.1);
            //             margin-left: 1rem;
            //             margin-right: 1rem;
            //             border-radius: .25rem;
            //             margin-top: 1rem;
            //             margin-bottom: 1rem;">
            //   <a href="javascript:void(0)">
            //       <img class="contacts-list-img" src="/dist/img/${response.user.image}" alt="User Image">
            //       <div class="contacts-list-info">
            //             <span class="contacts-list-name" style="margin-top: 1rem;margin-left: 1rem;color:#000;">
            //                 ${response.user.nickname}
            //             </span>
            //       </div>
            //   </a>
            // </li>`;
            // $(".contacts-list").prepend(contact);
        }
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
        Room.joinRoom(room, {}, function(err, join){
            if (err){
                console.log(err);
            }
            if (join){
                console.log("Conectado a room: " + join);
            }
        });
    });

    $("#leftGroupBtn").click(function(event) {
        alert("¿Estas seguro que deseas dejar el grupo?");
    });

    $("#btnAddParticipants").click(function(event) {
        Room.emit('makeusersroom', {users: datoFinded.items, room: room});
    });

    // ======================================================================

    $('#addRoombtn').click(function(e){
        var data = {
            admin: $('#admin').data('idadmin'),
            nameRoom: $('#nameRoom').val()
        };
        $.ajax({
            url: $('#addRoomForm').attr('action'),
            type: $('#addRoomForm').attr('method'),
            dataType: 'JSON',
            data: data
        }).done(function(response){
            if (response.status == 1) {
                alert(response.res);
                document.location = '/chat';
            } else {
                alert(response.res);
            }
        }).fail(function(){})
    })

});

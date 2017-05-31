'use strict';

const io = ws('');
const client = io.channel('online').connect(console.log);
const Room = io.channel('online_room').connect(console.log);

var myinfo;
client.on('onGetmyinfo', function(res){ myinfo = res; });
client.emit('getmyinfo', {});

$(function(){

    // $('#messages-container').animate({
    //     scrollTop: $('#messages-container').get(0).scrollHeight}, 2000);

    // ======================================================================
    const impMessage = $("#message");
    const onlineContainer = $("#roombox");

    var room;
    var objMsg = { room: null, message: null, type: null };
    var datoFinded;

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
    selecGeneralRoom();

    // client.emit('getmyinfo', {});

    client.on('onMessage', drawMessages);
    // client.on('onGetmyinfo', function(res){ myinfo = res; });
    client.on('onMakeusersroom', addedPartnersRoom);
    client.on('onGetmessagesroom', makeMessagesRoomList);
    client.on('onGetcontactsroom', makeContactsRoomList);

    // ======================================================================

    function drawMessages(getroom, message){
        var code = (message.user.id == myinfo.id) ?
            getCodeMessageByMe(message.message.message, message.user.nickname, message.user.image, message.time) :
                getCodeMessage(message.message.message, message.user.nickname, message.user.image, message.time)
        if ( getroom == room ) {
            if ($("body").find('.direct-chat-msg').length == 0){ $("#bodyMessage").empty(); }
            $("#bodyMessage").append(code);
        }
        else { toastr.success("Nuevo mensaje en " + getroom); }
    }

    function getCodeMessage(message, nickname, image, time){
        let code =
            `<div class="direct-chat-msg"><br>
              <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-left" style="margin-left: 5rem;">
                    ${ nickname }
                </span>
                <span class="direct-chat-timestamp pull-right">${ time }</span>
              </div>
              <img class="direct-chat-img" src="/dist/img/${ image }" alt="message user image">
              <div class="direct-chat-text">
                ${ message }
              </div>
            </div>`;
        return code;
    }

    function getCodeMessageByMe(message, nickname, image, time){
        let code =
            `<div class="direct-chat-msg right"><br>
              <div class="direct-chat-info clearfix">
                <span class="direct-chat-name pull-right" style="margin-right: 5rem;">
                    ${ nickname }
                </span>
                <span class="direct-chat-timestamp pull-left">${ time }</span>
              </div>
              <img class="direct-chat-img" src="/dist/img/${ image }" alt="message user image">
              <div class="direct-chat-text">
                  ${ message }
              </div>
            </div>`;
        return code;
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
        let code = `<li style="cursor:pointer;" class="room room-asidebox" data-rm="${room.room_name}">
          <img src="/dist/img/${room.image}">
          <a class="users-list-name" href="#" style="color:#fff;">${room.room_name}</a>
        </li>`;
        $("#myroombox").append(code);
    }

    function selecGeneralRoom(){
        let limit = $("body").find(".room-asidebox").length;
        if (limit > 0){
            $.each($("body").find(".room-asidebox"), function(index, el) {
                if ($(this).data('rm') === "general"){
                    room = $(this).data('rm');
                    client.emit('getmessagesroom', room);
                    client.emit('getcontactsroom', room);
                }
                client.joinRoom($(this).data('rm'), {}, function(err, join){
                    if (err){ console.log(err); }
                    if (join){
                        console.log("Conectado a room: " + join);
                        $("#room-selected").text("Grupo \"" + room + "\"" );
                    }
                });
            });
        }
        else {
            toastr.error("Ha ocurrido un error para el grupo general");
        }
    }

    function addedPartnersRoom(response){
        if (myinfo.nickname == response.user.nickname){
            makeAddedRoom(response.room);
            toastr.success('Se te ha agregado al grupo: ' + response.room.room_name);
            client.joinRoom(response.room.room_name, {}, function(err, join){
                if (err){ console.log(err); }
                if (join){
                    console.log("Conectado a room: " + join);
                }
            });
        }
    }

    function makeMessagesRoomList(res){
        $.each(res, function(index, el) {
            console.log(el);
            var code = (el.user.id == myinfo.id) ?
                getCodeMessageByMe(el.message.message, el.user.nickname, el.user.image, el.time) :
                    getCodeMessage(el.message.message, el.user.nickname, el.user.image, el.time)
            if ( el.message.room == room ) {
                if ($("body").find('.direct-chat-msg').length == 0){ $("#bodyMessage").empty(); }
                $("#bodyMessage").append(code);
            }
        });
    }

    function makeContactsRoomList(res){
        $(".contacts-list").empty();
        $.each(res, function(index, el) {
            let contact = `<li style="border: solid .1rem rgba(0, 0, 0, 0.1);
                        margin-left: 1rem;
                        margin-right: 1rem;
                        border-radius: .25rem;
                        margin-top: 1rem;
                        margin-bottom: 1rem;">
              <a href="javascript:void(0)">
                  <img class="contacts-list-img" src="/dist/img/${el.image}" alt="User Image">
                  <div class="contacts-list-info">
                        <span class="contacts-list-name" style="margin-top: 1rem;margin-left: 1rem;color:#000;">
                            ${el.nickname}
                        </span>
                  </div>
              </a>
            </li>`;
            $(".contacts-list").prepend(contact);
        });
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

    $("body").on('click', '.room-asidebox', function(event) {
        room = $(this).data('rm');
        $("#room-selected").text("Grupo \"" + room + "\"" );
        $("#bodyMessage").empty();
        client.joinRoom(room, {}, function(err, join){
            if (err){ console.log(err); }
            if (join){
                console.log("Conectado a room: " + join);
                client.emit('getmessagesroom', room);
                client.emit('getcontactsroom', room);
            }
        });
    });

    $("#leftGroupBtn").click(function(event) {
        alert("¿Estas seguro que deseas dejar el grupo?");
    });

    $("#btnAddParticipants").click(function(event) {
        client.emit('makeusersroom', {users: datoFinded.items, room: room});
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
                toastr.success(response.res);
                document.location = '/chat';
            } else {
                toastr.error(response.res);
            }
        }).fail(function(){})
    })

});

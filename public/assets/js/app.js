$(function(){

    const io = ws('');
    const client = io.channel('assign_ticket').connect(console.log);

    var sites_limit = 1;
    var siteMsg = { site: null, type: null };

    $(".site").click(function(event) {
        if ( $(this).hasClass('site-pre-assigned') || $(this).hasClass('assigned') ){ return; }
        else {
            if ($(this).hasClass('site-pre-assigned-sess')) {
                siteMsg.site = $(this).data('numsite');
                siteMsg.type = "unassigned";
                client.emit('message', siteMsg);
                $(this).removeClass('site-pre-assigned-sess');
            }
            else {
                if ( $(".site-pre-assigned-sess").length < sites_limit ){
                    siteMsg.site = $(this).data('numsite');
                    siteMsg.type = "pre-assigned";
                    client.emit('message', siteMsg);
                    $(this).addClass('site-pre-assigned-sess');
                }
                else{
                    alert("Has alcanzado el límite de asientos seleccionados");
                }
            }
            $('#asiento').val($(this).data('numsite'));
            $('#reservar').attr("disabled",false);
        }
    });

    function selectSite(message){
        var site = $("body").find('#' + message.site);
        if ( !site.hasClass('site-pre-assigned-sess' )){
            switch ( message.type ) {
                case "pre-assigned":
                    site.removeClass('site');
                    site.addClass('site-pre-assigned');
                break;
                case "unassigned":
                    site.removeClass('site-pre-assigned');
                    site.addClass('site');
                    $('#asiento').val('No asignado')
                    $('#reservar').attr("disabled",true)
                break;
                case "assigned":
                    site.removeClass('site-pre-assigned');
                    site.removeClass('site');
                    site.addClass('assigned');
                break;
            }
        }
    }

    client.on('message', selectSite);

    /*-------------------------------------------------------------------------*/



    function getDataDOM(){
        var data = {
            fecha: $("#fecha").val(),
            nombre: $("#nombre").val(),
            asiento: $("#asiento").val(),
            destino: $("#destino").val()
        }
        return data;
    }



    /*-------------------------------------------------------------------------*/

    $('#reservar').attr("disabled", true);
    $('#asiento').val("");

    $('#reservar').click(function(e){
        e.preventDefault();
        $.ajax({
            url: $("#form").attr('action'),
            type: $("#form").attr('method'),
            dataType: 'JSON',
            data: getDataDOM()
        })
        .done(function(r) {
            if (r.status == "200"){
                let site = $("#" + r.data.asiento);
                site.removeClass('site-pre-assigned-sess');
                site.removeClass('site-pre-assigned');
                site.removeClass('site');
                site.addClass('assigned');

                siteMsg.site = r.data.asiento;
                siteMsg.type = "assigned";
                client.emit('message', siteMsg);
            }
            else {
                alert("Error inesperado");
                console.log(r);
            }
        })
        .fail(function(e) {
            alert(e.responseText);
            console.log(e);
        });
    });


});

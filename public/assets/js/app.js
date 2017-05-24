$(function(){

    const io = ws('');
    const client = io.channel('assign_ticket').connect(console.log);

    var sites_limit = 1;
    var siteMsg = { site: null, type: null };

    $(".site").click(function(event) {
        if ( $(this).hasClass('site-pre-assigned') || $(this).hasClass('site-assigned') ){ return; }
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
                break;
            }
        }
    }

    client.on('message', selectSite);

});

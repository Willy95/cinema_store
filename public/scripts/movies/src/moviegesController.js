class moviegesController {
    constructor(){

    }

    static saveMovie(data,success,error){
        $.ajax({
            url: 'register-movie',
            type: 'post',
            data: { data }
        }).done(function(r){
            success(r);
        }).fail(function(e){
            error(e);
        })
    }

    static updateMovie(data,success,error){
        $.ajax({
            url: 'update-movie',
            type: 'post',
            data: { data }
        }).done(function(r){
            success(r);
        }).fail(function(e){
            error(e);
        })
    }

    static deleteMovie(data,success,error){
        $.ajax({
            url: 'delete-movie',
            type: 'post',
            data: { data }
        }).done(function(r){
            success(r);
        }).fail(function(e){
            error(e);
        })
    }
}

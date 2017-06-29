class moviegesController {
    constructor(){

    }

    static saveMovie(data,success,error){
        $.ajax({
          url:'/register-movie',
          method: 'POST',
          data: data,
          processData: false,
          contentType: false
        }).done(function(response){
            success(response);
        }).fail(function(error){
            error(error);
        });
        // $.ajax({
        //     url: 'register-movie',
        //     type: 'post',
        //     data: { data }
        // }).done(function(r){
        //     success(r);
        // }).fail(function(e){
        //     error(e);
        // })
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
        // $.ajax({
        //     url: 'delete-movie',
        //     type: 'post',
        //     data: { data }
        // }).done(function(r){
        //     success(r);
        // }).fail(function(e){
        //     error(e);
        // })
    }
}

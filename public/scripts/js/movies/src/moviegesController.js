class moviegesController {
    constructor(){

    }

    static movieToUpdate(data, success){
        $.ajax({
            url: '/movieToUpdate',
            type: 'post',
            data: { id : data }
        }).done(function(r){
            success(r)
        }).fail(function(e){
            console.log(e);
        })
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
        //     url: '/register-movie',
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

    static deleteMovie(data, success){
        $.ajax({
            url: '/delete-movie',
            type: 'post',
            data: { id: data }
        }).done(function(r){
            success(r);
        }).fail(function(e){
            error(e);
        })
    }

}

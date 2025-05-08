(async function () {
        if(localStorage.getItem('userId') && localStorage.getItem('email') && localStorage.getItem('usuario')){
            // Para pegar o valor desse item
            userId = localStorage.getItem('userId');
            email = localStorage.getItem('email');
            usuario = localStorage.getItem('usuario');

            await $("#usuario").text(usuario.split(' ')[0]+' '+usuario.split(' ')[usuario.split(' ').length-1]);

            await $("#avatar").css('background-image','url(./static/avatars/8_orgid_'+userId+'.jfif)');

        } else {
                window.location.assign('./verificacao-usuario');
        }
})();


$("#logout").click(function(){
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('usuario');
    window.location.assign('./verificacao-usuario'); 
});
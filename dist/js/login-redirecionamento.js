dados = Array(0);
hash_gerada_randomicamente = '';

function generateRandomHash(length) {
    const array = new Uint8Array(length / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

hash_gerada_randomicamente = generateRandomHash(32); // Gera uma hash de 32 caracteres
check_email=false;
email='';
usuario='';
userId='';

async function verifica_usuario(input_email){
    var url = 'https://prod-13.westus.logic.azure.com:443/workflows/33f2b697599f43bbb2feb880995d6afa/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_yc3eSZUh6sEGxZoKMQeNahrfG3SWjkOq_gWroyaE-M';

    var login_data = {
        
    };

    fetch(url,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login_data)
    })
        .then(response => response.json())
        .then(data => {
            dados = JSON.parse(data.result);
            dados = dados.value;
            for(i=0; i<dados.length; i++){
                if(dados[i].email==input_email){
                    check_email=true;
                    email=input_email;
                    userId=dados[i].userId;
                    usuario=dados[i].displayName;
                }
            }
            if(check_email){
                localStorage.setItem('userId', userId);
                localStorage.setItem('email', email);
                localStorage.setItem('usuario', usuario);
                window.location.assign('./');
            } else {
                console.log('o usuário não tem permissão para acessar');
            }
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })
}

$("#verifica_usuario").click(function(){
    verifica_usuario($("#input_email").val());
});

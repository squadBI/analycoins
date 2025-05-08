function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
      }

function generateRandomHash(length) {
    const array = new Uint8Array(length / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function tranforma_data_iso(dataHora) {
            // Data no formato ISO 8601
            const isoDate = dataHora;

            // Criar um objeto Date a partir da string ISO
            const date = new Date(isoDate);

            // Extrair os componentes da data
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0
            const year = date.getFullYear();

            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');

            // Formatar a data no formato desejado
            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

            return formattedDate;
      }

(async function () {
    dados = Array(0);
    analycoins_principal = Array(0);
    analycoins_transacoes = Array(0);
    saldo_usuario=0;

    userId = localStorage.getItem('userId');
    email = localStorage.getItem('email');
    usuario = localStorage.getItem('usuario');
    funcao = '';

    usuario_nome_compacto = usuario.split(' ')[0]+' '+usuario.split(' ')[usuario.split(' ').length-1];

    await carrega_associados_aptos();
    await carrega_info_analycoins();
    await sleep(3000);
    await carrega_info_transacoes();
    await sleep(3000);
    await carrega_saldo();

})();

async function carrega_associados_aptos(){
    
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
                $("#associados_aptos").append('<option value="'+dados[i].userId+'">'+dados[i].displayName.toUpperCase()+'</option>');
                $("#associados_aptos_1").append('<option value="'+dados[i].userId+'">'+dados[i].displayName.toUpperCase()+'</option>');
                $("#associados_aptos_2").append('<option value="'+dados[i].userId+'">'+dados[i].displayName.toUpperCase()+'</option>');
            }
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })
}


async function carrega_info_analycoins(){

    var url = 'https://prod-51.westus.logic.azure.com:443/workflows/cc9ef43aa7dc477086c36307192d7a22/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cj2f9HCKF-w3YLTOhsHbJaqfw3JYf9ukzR_yFBpV8OQ';

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
            analycoins_principal = JSON.parse(data.resultado);
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

}


async function carrega_info_transacoes(){

    var url = 'https://prod-161.westus.logic.azure.com:443/workflows/4504ac120c7948e2b6c21667b2057ed3/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WYWD7cyILHEEe50QpvzqyW2JX6y3PBkiJiBu0utgJZI';

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
            analycoins_transacoes = JSON.parse(data.resultado);
            for(i=0; i<analycoins_transacoes.length; i++){

                var nome_recebeu='';
                for(j=0; j<analycoins_principal.length; j++){
                    if(analycoins_principal[j].userId==analycoins_transacoes[i].userId_recebeu){
                        nome_recebeu=analycoins_principal[j].associado.split(' ')[0]+' '+analycoins_principal[j].associado.split(' ')[1]+' '+analycoins_principal[j].associado.split(' ')[analycoins_principal[j].associado.split(' ').length-1];
                    }
                }

                $("#transacoes").append('<li class="timeline-event">'+
                    '<div class="timeline-event-icon bg-twitter-lt"><!-- Download SVG icon from http://tabler-icons.io/i/brand-twitter -->'+
                      '<span class="avatar" style="background-image: url(./static/avatars/8_orgid_'+analycoins_transacoes[i].userId_presente+'.jfif)">'+
                            '<span class="badge bg-success"></span></span>'+
                    '</div>'+
                    '<div class="card timeline-event-card">'+
                      '<div class="card-body">'+
                        '<div class="text-muted float-end">'+analycoins_transacoes[i].dt_transacao+'</div>'+
                        '<h4>+'+analycoins_transacoes[i].analycoins+' Analycoins para '+nome_recebeu+'</h4>'+
                        '<p class="text-muted">'+analycoins_transacoes[i].msg_reconhecimento+'</p>'+
                      '</div>'+
                    '</div>'+
                  '</li>');
            }
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

}

async function carrega_saldo(){
    for(i=0; i<analycoins_principal.length; i++){
        if(analycoins_principal[i].userId==userId){
            saldo_usuario=analycoins_principal[i].analycoins_presente;
            funcao=analycoins_principal[i].funcao;
        }
    }

    await $("#posicao").text(funcao);

    var top_5 = analycoins_principal;

    top_5.sort((a, b) => parseInt(b.analycoins_recebidos) - parseInt(a.analycoins_recebidos));

    top_5 = top_5.slice(0,5);

    for(i=0; i<top_5.length; i++){

        var nome_associado = '';        
        nome_associado= top_5[i].associado.split(' ')[0]+' '+top_5[i].associado.split(' ')[top_5[i].associado.split(' ').length-1];

        $("#top_5").append('<div class="col-sm-6 col-lg-3">'+
                    '<div class="card card-sm">'+
                      '<div class="card-body">'+
                        '<div class="row align-items-center">'+
                          '<div class="col-auto">'+
                            '<span class="avatar" style="background-image: url(./static/avatars/8_orgid_'+top_5[i].userId+'.jfif)">'+
                            '</span>'+
                          '</div>'+
                          '<div class="col">'+
                            '<div class="font-weight-medium">'+
                              '<span class="badge bg-green badge-notification badge-pill">'+(i+1)+'º</span><span style="font-size: 11px;"> '+nome_associado+
                            '</span></div>'+
                            '<div class="text-muted">'+
                              '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-coin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 1 0 0 4h2a2 2 0 1 1 0 4h-2a2 2 0 0 1 -1.8 -1" /><path d="M12 7v10" /></svg> <span style="font-weight: bolder;">'+top_5[i].analycoins_recebidos+'</span>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>'+
                    '</div>'+
                  '</div>');
    }

    await $("#saldo_usuario").text(saldo_usuario);
}

$("#salvar_reconhecimento_1").click(async function(){

    hash_gerada_randomicamente = generateRandomHash(32); // Gera uma hash de 32 caracteres

    var comportamento = '';

    for(i=0; i<$("input[name='comportamento']").length; i++){
        if($("input[name='comportamento']")[i].checked){
            comportamento = $("input[name='comportamento']")[i].value;
        }
    }

   var url = 'https://prod-175.westus.logic.azure.com:443/workflows/5d462d9735984dcb90286653ea7f3b56/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hF4G6uAq2KSYnb24Plug1jn-kOQqH6Jr-urJhPcvYZo';

    var login_data = {
    "id_transacao": hash_gerada_randomicamente,
    "userId_presente": userId,
    "analycoins": 10,
    "userId_recebeu": $("#associados_aptos").val(), 
    "comportamento": comportamento,
    "msg_reconhecimento": $("#reconhecimento").val() 
};

    await fetch(url,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login_data)
    })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

    $("#page_loader").show();
    $("#pagina_principal").hide();

    await sleep(15000);
    window.location.reload(); 
  
});

$("#salvar_reconhecimento_2").click(async function(){
  
    $("#page_loader").show();
    $("#pagina_principal").hide();

    hash_gerada_randomicamente_1 = generateRandomHash(32); // Gera uma hash de 32 caracteres
    hash_gerada_randomicamente_2 = generateRandomHash(32); // Gera uma hash de 32 caracteres

    var comportamento = '';

    for(i=0; i<$("input[name='comportamento_1']").length; i++){
        if($("input[name='comportamento_1']")[i].checked){
            comportamento = $("input[name='comportamento_1']")[i].value;
        }
    }

   var url = 'https://prod-175.westus.logic.azure.com:443/workflows/5d462d9735984dcb90286653ea7f3b56/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=hF4G6uAq2KSYnb24Plug1jn-kOQqH6Jr-urJhPcvYZo';

    var login_data = {
    "id_transacao": hash_gerada_randomicamente_1,
    "userId_presente": userId,
    "analycoins": 5,
    "userId_recebeu": $("#associados_aptos_1").val(), 
    "comportamento": comportamento,
    "msg_reconhecimento": $("#reconhecimento_1").val() 
};

    await sleep(15000);

    await fetch(url,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login_data)
    })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

    for(i=0; i<$("input[name='comportamento_2']").length; i++){
        if($("input[name='comportamento_2']")[i].checked){
            comportamento = $("input[name='comportamento_2']")[i].value;
        }
    }
var login_data = {
    "id_transacao": hash_gerada_randomicamente_2,
    "userId_presente": userId,
    "analycoins": 5,
    "userId_recebeu": $("#associados_aptos_2").val(), 
    "comportamento": comportamento,
    "msg_reconhecimento": $("#reconhecimento_2").val() 
};

    await fetch(url,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(login_data)
    })
        .then(response => response.json())
        .then(data => {
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

    await sleep(15000);
    window.location.reload(); 

});
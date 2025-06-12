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
    dadosFiltrados = Array(0);
    analycoins_principal = Array(0);
    analycoins_transacoes = Array(0);
    saldo_usuario=0;
    analycoins_atual_usuario=0;
    resultado_agrup = {};

    userId = localStorage.getItem('userId');
    email = localStorage.getItem('email');
    usuario = localStorage.getItem('usuario');
    funcao = '';

    usuario_nome_compacto = usuario.split(' ')[0]+' '+usuario.split(' ')[usuario.split(' ').length-1];

    var url = 'https://prod-13.westus.logic.azure.com:443/workflows/33f2b697599f43bbb2feb880995d6afa/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_yc3eSZUh6sEGxZoKMQeNahrfG3SWjkOq_gWroyaE-M';

    var login_data = {
        
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
            dados = JSON.parse(data.result);
            dados = dados.value;
            var userIdsParaExcluir = [
                    '226dfd02-c26f-4a64-ad88-7938ea56a194',
                    'c8aca117-a758-4150-b1da-32fa4d990966',
                    'a97d4906-7bed-41a1-81d8-7152ca54c926',
                    '80afcec6-b1b9-43d8-a4a5-2f9a32d5f27e',
                    userId
                ];
            dadosFiltrados = dados.filter(item => !userIdsParaExcluir.includes(item.userId));

        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

    await carrega_info_analycoins();
    await sleep(3000);
    await carrega_info_transacoes();
    await sleep(3000);
    await carrega_saldo();
    await sleep(6000);
    await carrega_listas_associados(dadosFiltrados);
    await $("#page_loader_info").hide();
    await $("#pagina_principal").show();
    //await envia_msg_analy();

})();

async function carrega_listas_associados(lista){
    async function* asyncGenerator() {
              var j = 0;
              while (j < lista.length) {
                yield j++;
              }
            }

            for await (let i of asyncGenerator()) {            
                $("#associados_aptos").append('<option value="'+lista[i].userId+'">'+lista[i].displayName.toUpperCase()+'</option>');
                $("#associados_aptos_1").append('<option value="'+lista[i].userId+'">'+lista[i].displayName.toUpperCase()+'</option>');
                $("#associados_aptos_2").append('<option value="'+lista[i].userId+'">'+lista[i].displayName.toUpperCase()+'</option>');
            }
}

async function envia_msg_analy(){

    var url = 'https://prod-13.westus.logic.azure.com:443/workflows/33f2b697599f43bbb2feb880995d6afa/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=_yc3eSZUh6sEGxZoKMQeNahrfG3SWjkOq_gWroyaE-M';

    var login_data = {
        
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
            dados = JSON.parse(data.result);
            dados = dados.value;

            (async function () {
  async function* asyncGenerator() {
              var i = 0;
              while (i < dados.length) {
                yield i++;
              }
            }

            for await (let num of asyncGenerator()) {             
               var url_usuario = 'https://prod-63.westus.logic.azure.com:443/workflows/72e8e6f5a86d4c8cb84237ea7232f775/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=1nXAStE-mJQjNarj7ceeMFu4sM8RH4y6dJbhdZ2PrDo';

                    var login_data_usario = {
                    "adaptativeBody": "{'type': 'AdaptiveCard', 'body': [{'type': 'TextBlock', 'size': 'Medium', 'text': '🎉 **Hora de Reconhecer!** 🎉' }, {'type': 'TextBlock', 'text': 'Olá, querido time de **Analytics**! 👋', 'wrap': true, 'horizontalAlignment': 'Left' }, {'type': 'TextBlock', 'text': 'Chegou aquele momento especial do mês em que celebramos nossa **cultura de reconhecimento!**', 'wrap': true, 'spacing': 'None' }, {'type': 'TextBlock', 'text': 'É hora de valorizar quem está mandando muito bem e fazer aquele reconhecimento que aquece o coração! 💫', 'wrap': true, 'spacing': 'None' }, {'type': 'TextBlock', 'text': 'Você acaba de receber **10 Analycoins** para reconhecer seus colegas incríveis, e eles devem ser utilizados até **30/06**! ⏳', 'wrap': true }, {'type': 'TextBlock', 'text': '✨ **Como funciona? Relembre as regrinhas mágicas:**', 'wrap': true }, {'type': 'TextBlock', 'text': '✅ Reconheça **1 ou 2 pessoas:**', 'wrap': true, 'spacing': 'None' }, {'type': 'TextBlock', 'text': '- Pode usar **10 Analycoins para uma pessoa só**', 'wrap': true }, {'type': 'TextBlock', 'text': '- Ou **5 Analycoins para cada**, se quiser reconhecer duas!', 'wrap': true, 'spacing': 'None' }, {'type': 'TextBlock', 'text': '✅ **Escolha o comportamento** que mais representa a atitude do colega.', 'wrap': true }, {'type': 'TextBlock', 'text': '✅ **Descreva seu reconhecimento com carinho:**', 'wrap': true, 'spacing': 'None' }, {'type': 'TextBlock', 'text': 'Abra seu coração ❤️ — seu colega vai adorar saber que o trabalho dele está fazendo a diferença!', 'wrap': true, 'spacing': 'None' }, {'type': 'TextBlock', 'text': '⚠️ **Importante:**', 'wrap': true }, {'type': 'TextBlock', 'text': '- Os **10 Analycoins para reconhecimento não são acumulativos**, então use-os até o fim do mês!', 'wrap': true }, {'type': 'TextBlock', 'text': '- Já os **Analycoins recebidos** são acumulativos e, ao atingir **150**, podem ser trocados por um **day off**! (Lembre-se de alinhar com o PO e avisar a Amanda 😉)', 'wrap': true, 'spacing': 'None' }, {'type': 'TextBlock', 'text': 'Vamos juntos espalhar reconhecimento e fortalecer ainda mais nosso time! 🚀', 'wrap': true }, {'type': 'TextBlock', 'text': 'Em caso de dúvidas, fale com a **Amanda** ou o **Paulo**.', 'wrap': true }, {'type': 'TextBlock', 'text': '**Aproveitem e bora reconhecer!** 🙌', 'wrap': true, 'spacing': 'None' }, {'type': 'ActionSet', 'actions': [{'type': 'Action.OpenUrl', 'title': 'Acessar Analycoins', 'url': 'https://squadbi.github.io/analycoins/' } ] } ], '$schema': 'http://adaptivecards.io/schemas/adaptive-card.json', 'version': '1.5' }",
                    "sendMail": dados[num].email,
                    "group": "teste",
                    "priority": "teste",
                    "userSender": "gustavoha@algartelecom.com.br"
                };

                sleep(1200);

                fetch(url_usuario,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(login_data_usario)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Enviado para ' + dados[num].email)
                })
                .catch(error => {
                    console.log('Erro ao enviar para ' + dados[num].email);
                })

            }
})();
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
            analycoins_transacoes = JSON.parse(data.resultado).reverse();
            for(i=0; i<analycoins_transacoes.length; i++){

                const dataOriginal = analycoins_transacoes[i].dt_transacao;
                const data_atual = new Date(dataOriginal);

                // Formatar para DD/MM/AAAA
                const dia = String(data_atual.getDate()).padStart(2, '0');
                const mes = String(data_atual.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
                const ano = data_atual.getFullYear();

                const dataFormatada = `${dia}/${mes}/${ano}`;


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
                        '<div class="text-muted float-end">'+dataFormatada+'</div>'+
                        '<h4>+'+analycoins_transacoes[i].analycoins+' Analycoins para '+nome_recebeu+'</h4>'+
                        '<p class="text-muted">'+analycoins_transacoes[i].msg_reconhecimento+'</p>'+
                      '</div>'+
                    '</div>'+
                  '</li>');
            }


            // 1. Agrupar e somar
            const agrupado = {};
            analycoins_transacoes.forEach(item => {
             const comp = item.comportamento;
             const coins = parseInt(item.analycoins, 10);
             agrupado[comp] = (agrupado[comp] || 0) + coins;
            });

            
            // 2. Transformar em array e calcular total
            const total = Object.values(agrupado).reduce((acc, val) => acc + val, 0);
            const arrayFinal = Object.entries(agrupado).map(([comp, soma]) => ({
             comportamento: comp,
             soma_total: soma,
             percentual: parseFloat(((soma / total) * 100).toFixed(1))
            }));


            // 3. Ordenar em ordem decrescente
            arrayFinal.sort((a, b) => b.percentual - a.percentual);

            // 4. Separar em arrays finais
            const resultadoFinal = {
             comportamento: arrayFinal.map(item => item.comportamento),
             soma_total: arrayFinal.map(item => item.soma_total),
             soma_analycoins: arrayFinal.map(item => item.percentual)
            };

            var options = {
          series: [{
          name: 'Analycoins',
          data: resultadoFinal.soma_analycoins
        }],
          chart: {
          type: 'bar',
          height: 350,
          toolbar: {
           show: false // Isso desativa toda a toolbox
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 2,
            borderRadiusApplication: 'end',
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + '%'; // Adiciona o símbolo de porcentagem
          }
        },
        colors: ['#28bea5'], // Define a cor das barras
        grid: {
          show: false
        },
        xaxis: {
          categories: resultadoFinal.comportamento,
          labels: {
            show: false
          },
          axisBorder: {
           show: false
          }
        },
        yaxis: {
          axisBorder: {
           show: false
          }
        },
        
        tooltip: {
         y: {
         formatter: function (val, { dataPointIndex }) {
                const valorOriginal = resultadoFinal.soma_total[dataPointIndex];
                    return valorOriginal;
                }
            }
         }

        };

        var chart = new ApexCharts(document.querySelector("#chart-time-info"), options);
        chart.render();


        })
        .catch(error => {
            console.log('problema na conexão com a api: ', error);
        })

}

async function carrega_saldo(){
    for(i=0; i<analycoins_principal.length; i++){
        if(analycoins_principal[i].userId==userId){
            saldo_usuario=analycoins_principal[i].analycoins_presente;
            analycoins_atual_usuario=analycoins_principal[i].analycoins_recebidos;
            funcao=analycoins_principal[i].funcao;
        }
    }

    if(saldo_usuario==0){
        $("#mostra_acoes").hide();
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
    await $("#analycoins_atual_usuario").text(analycoins_atual_usuario);
}

$("#salvar_reconhecimento_1").click(async function(){

    if($("#reconhecimento").val()==' ' || $("#reconhecimento").val()=='' || $("#reconhecimento").val()==undefined){
        toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 4000
                };
                toastr.warning('Campos Obrigatórios', 'Todo campo deve ser preenchido')
    } else {

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

    } 
  
});

$("#salvar_reconhecimento_2").click(async function(){

    if($("#reconhecimento_1").val()==' ' || $("#reconhecimento_1").val()=='' || $("#reconhecimento_1").val()==undefined || $("#reconhecimento_2").val()==' ' || $("#reconhecimento_2").val()=='' || $("#reconhecimento_2").val()==undefined){
        toastr.options = {
                    closeButton: true,
                    progressBar: true,
                    showMethod: 'slideDown',
                    timeOut: 4000
                };
                toastr.warning('Campos Obrigatórios', 'Todo campo deve ser preenchido')
    } else {

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

    }
   

});
function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
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

    userId = localStorage.getItem('userId');
    email = localStorage.getItem('email');
    usuario = localStorage.getItem('usuario');

    usuario_nome_compacto = usuario.split(' ')[0]+' '+usuario.split(' ')[usuario.split(' ').length-1];

    await carrega_associados_aptos();

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
            }
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })
}


async function carrega_info_cargas(id_linha){

    await $( ".list-group-item" ).removeClass( "active" );
    await $( "#info_carga_active"+ id_linha ).addClass( "active" );

    for(i=0; i<dados.length; i++){
        if(dados[i].id==id_linha){
            // Decodificação de base64
            var decodedQuery = buffer.Buffer.from(dados[i].consulta_url, 'base64');
            // Descompressão da consulta
            var calculo = pako.inflate(decodedQuery, { to: 'string' });
            $("#info_cargas").html('');
            $("#info_cargas").append('<div class="datagrid mb-3">'+
                  '<div class="datagrid-item">'+
                    '<div class="datagrid-title">Qtd. linhas</div>'+
                    '<div class="datagrid-content">'+dados[i].num_linhas+'</div>'+
                  '</div>'+
                  '<div class="datagrid-item">'+
                    '<div class="datagrid-title">Qtd. Colunas</div>'+
                    '<div class="datagrid-content">'+dados[i].num_colunas+'</div>'+
                  '</div>'+
                  '<div class="datagrid-item">'+
                    '<div class="datagrid-title">Data Criação</div>'+
                    '<div class="datagrid-content">'+dados[i].data_registro+'</div>'+
                  '</div>'+
                  '<div class="datagrid-item">'+
                    '<div class="datagrid-title">Data Execução</div>'+
                    '<div class="datagrid-content">'+dados[i].data_execucao+'</div>'+
                  '</div>'+
                  '<div class="datagrid-item">'+
                    '<div class="datagrid-title">Usuário</div>'+
                    '<div class="datagrid-content">'+
                      '<div class="d-flex align-items-center">'+
                        dados[i].usuario+
                      '</div>'+
                    '</div>'+
                  '</div>'+
                  '<div class="datagrid-item">'+
                    '<div class="datagrid-title">Descrição</div>'+
                    '<div class="datagrid-content">'+
                      dados[i].descricao_negocio+
                    '</div>'+
                  '</div>'+
                '</div>');

            $("#botoes_acao_tabela").html('');
            $("#botoes_acao_tabela").html('<a onClick="inicia_varredura_execucao()" class="btn-action" style="cursor: pointer;">'+
                          '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-player-play"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 4v16l13 -8z" /></svg>'+
                        '</a>'+
                        '<a data-bs-toggle="modal" data-bs-target="#modal-update" onClick="carrega_informacoes_update('+dados[i].id+')" class="btn-action" style="cursor: pointer;">'+
                          '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>'+
                        '</a>'+
                        '<a data-bs-toggle="modal" data-bs-target="#modal-confirma-delete" onClick="confirma_excluir_carga('+dados[i].id+')" class="btn-action" style="cursor: pointer;">'+
                          '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-database-x"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6c0 1.657 3.582 3 8 3s8 -1.343 8 -3s-3.582 -3 -8 -3s-8 1.343 -8 3" /><path d="M4 6v6c0 1.657 3.582 3 8 3c.537 0 1.062 -.02 1.57 -.058" /><path d="M20 13.5v-7.5" /><path d="M4 12v6c0 1.657 3.582 3 8 3c.384 0 .762 -.01 1.132 -.03" /><path d="M22 22l-5 -5" /><path d="M17 22l5 -5" /></svg>'+
                        '</a>');

        }
    }

    await $("#editor").html('');
          const editor = CodeMirror(document.getElementById("editor"), {
      mode: "sql",
      theme: "dracula",
      lineNumbers: false,
      value: calculo
    });

}

async function exibe_campos_joins(qtd_joins){
        var opcoes_campos_existentes = Array(0);
        $("#exibe_campos_joins").html('');

        if(qtd_joins!=0 || qtd_joins!='0'){
            for(j=0 ; j<qtd_joins; j++){
                opcoes_campos_existentes[j] = '<div class="mb-3">'+
                  '<label class="form-label">Left '+(j+1)+'</label>'+
                  '<select id="campo_join_'+(j+1)+'" class="form-select">';
        
                for(i=0;i<dados.length;i++){
                    opcoes_campos_existentes[j]=opcoes_campos_existentes[j]+'<option value="'+dados[i].nome_tabela+'" selected>'+dados[i].nome_tabela+'</option>'
                }

                opcoes_campos_existentes[j]=opcoes_campos_existentes[j]+'</select>'+
                        '</div>';
                $("#exibe_campos_joins").append(opcoes_campos_existentes[j]);
            }
        }

}

async function exibe_campos_joins_update(qtd_joins){
        var opcoes_campos_existentes_update = Array(0);
        $("#exibe_campos_joins_update").html('');

        if(qtd_joins!=0 || qtd_joins!='0'){
            for(j=0 ; j<qtd_joins; j++){
                opcoes_campos_existentes_update[j] = '<div class="mb-3">'+
                  '<label class="form-label">Left '+(j+1)+'</label>'+
                  '<select id="campo_join_'+(j+1)+'_update" class="form-select">';
        
                for(i=0;i<dados.length;i++){
                    opcoes_campos_existentes_update[j]=opcoes_campos_existentes_update[j]+'<option value="'+dados[i].nome_tabela+'" selected>'+dados[i].nome_tabela+'</option>'
                }

                opcoes_campos_existentes_update[j]=opcoes_campos_existentes_update[j]+'</select>'+
                        '</div>';
                $("#exibe_campos_joins_update").append(opcoes_campos_existentes_update[j]);
            }
        }

}

async function seleciona_tipo_conexao(tipo_conexao){
    $("#report-type").val(tipo_conexao);
    if(tipo_conexao=='SQL'){
        $("#exibe_url_s3").hide();
        $("#exibe_campo_consulta").show();
        $("#exibe_conexao_banco").show();
        $("#exibe_fonte_existente").hide();
        $("#exibe_joins_existentes").hide();
        $("#exibe_campos_joins").hide();
    } else if(tipo_conexao=='S3') {
        $("#exibe_url_s3").show();
        $("#exibe_campo_consulta").hide();
        $("#exibe_conexao_banco").hide();
        $("#exibe_fonte_existente").hide();
        $("#exibe_joins_existentes").hide();
        $("#exibe_campos_joins").hide();
    } else {
        $("#exibe_url_s3").hide();
        $("#exibe_campo_consulta").show();
        $("#exibe_conexao_banco").hide();

        opcoes_fonte_existentes = '<div class="mb-3">'+
                  '<label class="form-label">Fonte</label>'+
                  '<select id="fonte_existente" class="form-select">';
        
        for(i=0;i<dados.length;i++){
            opcoes_fonte_existentes=opcoes_fonte_existentes+'<option value="'+dados[i].nome_tabela+'" selected>'+dados[i].nome_tabela+'</option>'
        }

        opcoes_fonte_existentes=opcoes_fonte_existentes+'</select>'+
                '</div>';

        $("#exibe_fonte_existente").html(opcoes_fonte_existentes);
        $("#exibe_fonte_existente").show();
        $("#exibe_joins_existentes").show();
        $("#exibe_campos_joins").show();
    }
}

async function seleciona_tipo_conexao_update(tipo_conexao){
    $("#report-type-update").val(tipo_conexao);
    if(tipo_conexao=='SQL'){
        $("#exibe_url_s3_update").hide();
        $("#exibe_campo_consulta_update").show();
        $("#exibe_conexao_banco_update").show();
        $("#exibe_fonte_existente_update").hide();
        $("#exibe_joins_existentes_update").hide();
        $("#exibe_campos_joins_update").hide();
    } else if(tipo_conexao=='S3') {
        $("#exibe_url_s3_update").show();
        $("#exibe_campo_consulta_update").hide();
        $("#exibe_conexao_banco_update").hide();
        $("#exibe_fonte_existente_update").hide();
        $("#exibe_joins_existentes_update").hide();
        $("#exibe_campos_joins_update").hide();
    } else {
        $("#exibe_url_s3_update").hide();
        $("#exibe_campo_consulta_update").show();
        $("#exibe_conexao_banco_update").hide();

        opcoes_fonte_existentes = '<div class="mb-3">'+
                  '<label class="form-label">Fonte</label>'+
                  '<select id="fonte_existente_update" class="form-select">';
        
        for(i=0;i<dados.length;i++){
            opcoes_fonte_existentes=opcoes_fonte_existentes+'<option value="'+dados[i].nome_tabela+'" selected>'+dados[i].nome_tabela+'</option>'
        }

        opcoes_fonte_existentes=opcoes_fonte_existentes+'</select>'+
                '</div>';

        $("#exibe_fonte_existente_update").html(opcoes_fonte_existentes);
        $("#exibe_fonte_existente_update").show();
        $("#exibe_joins_existentes_update").show();
        $("#exibe_campos_joins_update").show();
    }
}

$("#salvar_informações").click(async function(){

    var url = 'https://prod-80.westus.logic.azure.com:443/workflows/50c9684c2d87410ba22caf36056f0a7b/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=WkxtGTa_SPCdDiMKgFAfgzrVU389frbpbTbEtQEwECw';

    var verifica_consulta_s3='';
    var verifica_banco_s3='';
    var verifica_joins='';
    var verifica_campo_join_1='';
    var verifica_campo_join_2='';
    var verifica_campo_join_3='';
    var id_linha_criado=0;

    if($("#report-type").val()=='SQL'){
        verifica_consulta_s3=$("#consulta_sql").val();
        verifica_banco_s3=$("#conexao_banco").val();
    } else if($("#report-type").val()=='S3') {
        verifica_consulta_s3=$("#url_s3").val();
        verifica_banco_s3='algar-data-science-team-dev';
    } else {
        verifica_consulta_s3=$("#consulta_sql").val();
        verifica_banco_s3=$("#fonte_existente").val();
        for(i=0 ; i<$("#exibe_joins_existentes").find("input").length; i++){
            if($("#exibe_joins_existentes").find("input")[i].checked){
                verifica_joins=$("#exibe_joins_existentes").find("input")[i].value;
            }
        }
        if($("#exibe_campos_joins").find("select").length==1){
            verifica_campo_join_1=$("#campo_join_1").val();
        } else if($("#exibe_campos_joins").find("select").length==2){
            verifica_campo_join_1=$("#campo_join_1").val();
            verifica_campo_join_2=$("#campo_join_2").val();
        } else if($("#exibe_campos_joins").find("select").length==3){
            verifica_campo_join_1=$("#campo_join_1").val();
            verifica_campo_join_2=$("#campo_join_2").val();
            verifica_campo_join_3=$("#campo_join_3").val();
        }
    }

    for(i=0 ; i<dados.length; i++){
        id_linha_criado=i+1;
    }

    id_linha_criado++;

    // Compressão da consulta usando pako
    var compressedQuery = pako.deflate(verifica_consulta_s3);

    // Codificação em base64
    var encodedQuery = buffer.Buffer.from(compressedQuery).toString('base64');

    var insert_data = {
        solicitacao: "insercao_linha_tabela",
        tabela: "ponderacao_cargas",
        id_linha: ""+id_linha_criado+"",
        nome_tabela : $("#nome_tabela").val(),
        consulta_url : encodedQuery,
        tipo_fonte : $("#report-type").val(),
        bucket_banco : verifica_banco_s3,
        qtd_joins: verifica_joins,
        tabela_join_1: verifica_campo_join_1,
        tabela_join_2: verifica_campo_join_2,
        tabela_join_3: verifica_campo_join_3,
        descricao_negocio : $("#descricao_info").val(),
        status : "1",
        usuario : email,
        x_api_key: "1348f1ed93616d59f6d62eb7631ae137cc902fc9cc4bb22428a384c1cec91c20"
    };

    await fetch(url,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(insert_data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('cadastro realizado com sucesso');
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

    await $("#dados_cargas").html('');
    await carrega_cargas(email);

});


async function exclui_carga(id_linha){

    var url = 'https://prod-22.westus.logic.azure.com:443/workflows/3643c1c102744a728fa718ff38140b50/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=SP051J8clZbz17k2qKJaMQFqu7eKw7uQFK-jzh8rrwc';

    var insert_data = {
        solicitacao: "deleta_linha_tabela",
        tabela: "ponderacao_cargas",
        key: ""+id_linha+"",
        email : email,
        x_api_key: "1348f1ed93616d59f6d62eb7631ae137cc902fc9cc4bb22428a384c1cec91c20"
    };
    
    await fetch(url,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(insert_data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('exclusão realizada com sucesso');
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

    await sleep(2000);
    await $("#dados_cargas").html('');
    await carrega_cargas(email);

}


async function atualiza_consulta(id_linha,descricao_negocio,consulta_url){

    var url = 'https://prod-125.westus.logic.azure.com:443/workflows/ec113c1849d34343b643b86b9725dddc/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=wfR6aFT1EvuRvXnPmsrt_PKVd3hmpaA3iP1VYeLHz5k';

    var insert_data = {
        solicitacao: "atualiza_consulta_tabela",
        tabela: "ponderacao_cargas",
        key: ""+id_linha+"",
        descricao: ""+descricao_negocio+"",
        consulta: ""+consulta_url+"",
        email : email,
        x_api_key: "1348f1ed93616d59f6d62eb7631ae137cc902fc9cc4bb22428a384c1cec91c20"
    };
    
    await fetch(url,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(insert_data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('atualização realizada com sucesso');
        })
        .catch(error => {
            console.log('problema na conexão com a api');
        })

    await sleep(2000);
    await $("#dados_cargas").html('');
    await carrega_cargas(email);

}

async function confirma_excluir_carga(id_linha){
    $("#confirma_exclusao").attr('onClick','exclui_carga('+id_linha+')');    
}


async function carrega_informacoes_update(id_linha){
    for(i=0; i<dados.length; i++){
        if(dados[i].id==id_linha){
            // Decodificação de base64
            var decodedQuery = buffer.Buffer.from(dados[i].consulta_url, 'base64');
            // Descompressão da consulta
            var calculo = pako.inflate(decodedQuery, { to: 'string' });
            $("#consulta_sql_update").val(calculo);
            $("#descricao_info_update").val(dados[i].descricao_negocio);
            $("#linha_key_upadate").val(id_linha);        
        }
    }
}

$("#atualizar_informacoes").click(async function(){

    // Compressão da consulta usando pako
    var compressedQuery = pako.deflate($("#consulta_sql_update").val());

    // Codificação em base64
    var encodedQuery = buffer.Buffer.from(compressedQuery).toString('base64');

    await atualiza_consulta($("#linha_key_upadate").val(),$("#descricao_info_update").val(),encodedQuery);

    await sleep(2000);
    await $("#dados_cargas").html('');
    await carrega_cargas(email);

});
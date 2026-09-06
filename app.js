/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const STORAGE_PROTOCOLS = "meus_protocolos_v2";

const STORAGE_CATEGORIES = "minhas_categorias_v1";


/* =====================================================
   CATEGORIAS PADRÃO
===================================================== */

const categoriasPadrao = [

    {
        id: "conexao",
        nome: "CONEXÃO"
    },

    {
        id: "financeiro",
        nome: "FINANCEIRO"
    },

    {
        id: "cadastro",
        nome: "CADASTRO"
    },

    {
        id: "equipamentos",
        nome: "EQUIPAMENTOS"
    },

    {
        id: "aplicativos",
        nome: "APLICATIVOS"
    },

    {
        id: "outros",
        nome: "OUTROS"
    }

];


/* =====================================================
   ELEMENTOS
===================================================== */

const listaProtocolos =
    document.getElementById("listaProtocolos");

const listaCategorias =
    document.getElementById("listaCategorias");

const contadorProtocolos =
    document.getElementById("contadorProtocolos");

const campoPesquisa =
    document.getElementById("campoPesquisa");

const conteudo =
    document.getElementById("conteudo");


/* Modal protocolo */

const modalProtocolo =
    document.getElementById("modalProtocolo");

const tituloModal =
    document.getElementById("tituloModal");

const nomeProtocolo =
    document.getElementById("nomeProtocolo");

const categoriaProtocolo =
    document.getElementById("categoriaProtocolo");

const textoProtocolo =
    document.getElementById("textoProtocolo");

const formProtocolo =
    document.getElementById("formProtocolo");


/* Modal categoria */

const modalCategoria =
    document.getElementById("modalCategoria");

const nomeCategoria =
    document.getElementById("nomeCategoria");

const formCategoria =
    document.getElementById("formCategoria");


/* =====================================================
   ESTADO
===================================================== */

let protocolos =
    carregarProtocolos();


let categorias =
    carregarCategorias();


let protocoloSelecionado =
    null;


let categoriaSelecionada =
    "todos";


let modoEdicao =
    false;


/* =====================================================
   CARREGAR PROTOCOLOS
===================================================== */

function carregarProtocolos() {

    try {

        const dados =
            localStorage.getItem(
                STORAGE_PROTOCOLS
            );


        if (!dados) {

            return [];

        }


        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar protocolos:",
            erro
        );

        return [];

    }

}


/* =====================================================
   CARREGAR CATEGORIAS
===================================================== */

function carregarCategorias() {

    try {

        const dados =
            localStorage.getItem(
                STORAGE_CATEGORIES
            );


        if (!dados) {

            localStorage.setItem(
                STORAGE_CATEGORIES,
                JSON.stringify(
                    categoriasPadrao
                )
            );


            return categoriasPadrao;

        }


        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar categorias:",
            erro
        );

        return categoriasPadrao;

    }

}


/* =====================================================
   SALVAR DADOS
===================================================== */

function salvarProtocolos() {

    localStorage.setItem(
        STORAGE_PROTOCOLS,
        JSON.stringify(protocolos)
    );

}


function salvarCategorias() {

    localStorage.setItem(
        STORAGE_CATEGORIES,
        JSON.stringify(categorias)
    );

}


/* =====================================================
   RENDERIZAR CATEGORIAS
===================================================== */

function renderizarCategorias() {

    listaCategorias.innerHTML = "";


    /* TODOS */

    const todos =
        document.createElement("div");


    todos.className =
        "category-item";


    if (categoriaSelecionada === "todos") {

        todos.classList.add("active");

    }


    todos.innerHTML = `

        <span class="category-icon">
            ▣
        </span>

        <span>
            TODOS OS PROTOCOLOS
        </span>

        <span class="category-count">
            ${protocolos.length}
        </span>

    `;


    todos.addEventListener(
        "click",
        () => {

            categoriaSelecionada =
                "todos";

            renderizarCategorias();

            renderizarLista();

        }
    );


    listaCategorias.appendChild(todos);


    /* Categorias */

    categorias.forEach(categoria => {

        const item =
            document.createElement("div");


        item.className =
            "category-item";


        if (
            categoriaSelecionada ===
            categoria.id
        ) {

            item.classList.add("active");

        }


        const quantidade =
            protocolos.filter(
                protocolo =>
                    protocolo.categoriaId ===
                    categoria.id
            ).length;


        item.innerHTML = `

            <span class="category-icon">
                ▰
            </span>

            <span>
                ${escaparHTML(categoria.nome)}
            </span>

            <span class="category-count">
                ${quantidade}
            </span>

        `;


        item.addEventListener(
            "click",
            () => {

                categoriaSelecionada =
                    categoria.id;

                renderizarCategorias();

                renderizarLista();

            }
        );


        listaCategorias.appendChild(item);

    });

}


/* =====================================================
   RENDERIZAR LISTA DE PROTOCOLOS
===================================================== */

function renderizarLista() {

    const pesquisa =
        campoPesquisa.value
            .trim()
            .toLowerCase();


    let resultados =
        protocolos;


    /* Categoria */

    if (
        categoriaSelecionada !==
        "todos"
    ) {

        resultados =
            resultados.filter(
                protocolo =>
                    protocolo.categoriaId ===
                    categoriaSelecionada
            );

    }


    /* Pesquisa */

    if (pesquisa) {

        resultados =
            resultados.filter(
                protocolo => {

                    const nome =
                        protocolo.nome
                            .toLowerCase();


                    const texto =
                        protocolo.texto
                            .toLowerCase();


                    return (
                        nome.includes(pesquisa) ||
                        texto.includes(pesquisa)
                    );

                }
            );

    }


    listaProtocolos.innerHTML = "";


    /* Nenhum resultado */

    if (resultados.length === 0) {

        listaProtocolos.innerHTML = `

            <div class="no-results">

                ${
                    pesquisa
                    ? "Nenhum protocolo encontrado."
                    : "Nenhum protocolo nesta categoria."
                }

            </div>

        `;


        atualizarContador();

        return;

    }


    /* Criar itens */

    resultados.forEach(
        protocolo => {

            const item =
                document.createElement("div");


            item.className =
                "protocol-item";


            if (
                protocoloSelecionado &&
                protocoloSelecionado.id ===
                protocolo.id
            ) {

                item.classList.add("active");

            }


            item.innerHTML = `

                <span class="protocol-item-icon">
                    ▣
                </span>

                <span class="protocol-name"></span>

            `;


            item.querySelector(
                ".protocol-name"
            ).textContent =
                protocolo.nome;


            item.addEventListener(
                "click",
                () => {

                    selecionarProtocolo(
                        protocolo.id
                    );

                }
            );


            listaProtocolos.appendChild(
                item
            );

        }
    );


    atualizarContador();

}


/* =====================================================
   CONTADOR
===================================================== */

function atualizarContador() {

    const quantidade =
        protocolos.length;


    contadorProtocolos.textContent =

        quantidade === 1
        ? "1 protocolo"
        : `${quantidade} protocolos`;

}


/* =====================================================
   SELECIONAR PROTOCOLO
===================================================== */

function selecionarProtocolo(id) {

    const protocolo =
        protocolos.find(
            item =>
                item.id === id
        );


    if (!protocolo) {

        return;

    }


    protocoloSelecionado =
        protocolo;


    renderizarProtocolo();

    renderizarLista();

}


/* =====================================================
   MOSTRAR PROTOCOLO
===================================================== */

function renderizarProtocolo() {

    if (!protocoloSelecionado) {

        mostrarTelaInicial();

        return;

    }


    conteudo.innerHTML = "";


    const container =
        document.createElement("div");


    container.className =
        "protocol-view";


    /* Cabeçalho */

    const header =
        document.createElement("div");


    header.className =
        "protocol-header";


    const titulo =
        document.createElement("h1");


    titulo.className =
        "protocol-title";


    titulo.textContent =
        protocoloSelecionado.nome;


    const categoria =
        categorias.find(
            item =>
                item.id ===
                protocoloSelecionado.categoriaId
        );


    const categoriaTexto =
        document.createElement("div");


    categoriaTexto.className =
        "protocol-category";


    categoriaTexto.textContent =
        categoria
        ? categoria.nome
        : "SEM CATEGORIA";


    header.appendChild(titulo);

    header.appendChild(
        categoriaTexto
    );


    /* Texto */

    const texto =
        document.createElement("div");


    texto.className =
        "protocol-text";


    texto.textContent =
        protocoloSelecionado.texto;


    /* Botões */

    const actions =
        document.createElement("div");


    actions.className =
        "actions";


    const btnCopiar =
        document.createElement("button");


    btnCopiar.className =
        "primary-button";


    btnCopiar.textContent =
        "📋 Copiar";


    btnCopiar.addEventListener(
        "click",
        copiarProtocolo
    );


    const btnEditar =
        document.createElement("button");


    btnEditar.className =
        "secondary-button";


    btnEditar.textContent =
        "✏️ Editar";


    btnEditar.addEventListener(
        "click",
        abrirEdicao
    );


    const btnExcluir =
        document.createElement("button");


    btnExcluir.className =
        "danger-button";


    btnExcluir.textContent =
        "🗑️ Excluir";


    btnExcluir.addEventListener(
        "click",
        excluirProtocolo
    );


    actions.appendChild(btnCopiar);

    actions.appendChild(btnEditar);

    actions.appendChild(btnExcluir);


    /* Montar */

    container.appendChild(header);

    container.appendChild(texto);

    container.appendChild(actions);


    conteudo.appendChild(container);

}


/* =====================================================
   TELA INICIAL
===================================================== */

function mostrarTelaInicial() {

    conteudo.innerHTML = `

        <div class="welcome">

            <div class="welcome-icon">
                📋
            </div>

            <h1>
                Meus Protocolos
            </h1>

            <p>
                Selecione um protocolo na lateral
                ou crie um novo para começar.
            </p>

            <button
                class="primary-button"
                id="btnNovoWelcomeInterno">

                + Criar protocolo

            </button>

        </div>

    `;


    document
        .getElementById(
            "btnNovoWelcomeInterno"
        )
        .addEventListener(
            "click",
            abrirNovoProtocolo
        );

}


/* =====================================================
   PREENCHER SELECT DE CATEGORIAS
===================================================== */

function preencherCategoriasSelect(
    categoriaAtual = ""
) {

    categoriaProtocolo.innerHTML = "";


    categorias.forEach(categoria => {

        const option =
            document.createElement("option");


        option.value =
            categoria.id;


        option.textContent =
            categoria.nome;


        if (
            categoria.id ===
            categoriaAtual
        ) {

            option.selected = true;

        }


        categoriaProtocolo.appendChild(
            option
        );

    });

}


/* =====================================================
   NOVO PROTOCOLO
===================================================== */

function abrirNovoProtocolo() {

    modoEdicao = false;


    tituloModal.textContent =
        "Novo protocolo";


    nomeProtocolo.value = "";

    textoProtocolo.value = "";


    preencherCategoriasSelect();


    /*
       Se estiver dentro de uma categoria,
       ela será selecionada automaticamente.
    */

    if (
        categoriaSelecionada !==
        "todos"
    ) {

        categoriaProtocolo.value =
            categoriaSelecionada;

    }


    abrirModalProtocolo();


    nomeProtocolo.focus();

}


/* =====================================================
   EDITAR PROTOCOLO
===================================================== */

function abrirEdicao() {

    if (!protocoloSelecionado) {

        return;

    }


    modoEdicao = true;


    tituloModal.textContent =
        "Editar protocolo";


    nomeProtocolo.value =
        protocoloSelecionado.nome;


    textoProtocolo.value =
        protocoloSelecionado.texto;


    preencherCategoriasSelect(
        protocoloSelecionado.categoriaId
    );


    abrirModalProtocolo();


    nomeProtocolo.focus();

}


/* =====================================================
   SALVAR PROTOCOLO
===================================================== */

function salvarFormulario(event) {

    event.preventDefault();


    const nome =
        nomeProtocolo.value.trim();


    const texto =
        textoProtocolo.value.trim();


    const categoriaId =
        categoriaProtocolo.value;


    if (!nome) {

        mostrarToast(
            "Digite o nome do protocolo."
        );

        return;

    }


    if (!categoriaId) {

        mostrarToast(
            "Selecione uma categoria."
        );

        return;

    }


    if (!texto) {

        mostrarToast(
            "Digite o texto do protocolo."
        );

        return;

    }


    /* EDITAR */

    if (
        modoEdicao &&
        protocoloSelecionado
    ) {

        protocoloSelecionado.nome =
            nome;


        protocoloSelecionado.texto =
            texto;


        protocoloSelecionado.categoriaId =
            categoriaId;


        const indice =
            protocolos.findIndex(
                item =>
                    item.id ===
                    protocoloSelecionado.id
            );


        if (indice !== -1) {

            protocolos[indice] =
                protocoloSelecionado;

        }


        mostrarToast(
            "✓ Protocolo atualizado!"
        );

    }


    /* NOVO */

    else {

        const novoProtocolo = {

            id:
                Date.now().toString(),

            nome:
                nome,

            texto:
                texto,

            categoriaId:
                categoriaId

        };


        protocolos.push(
            novoProtocolo
        );


        protocoloSelecionado =
            novoProtocolo;


        categoriaSelecionada =
            categoriaId;


        mostrarToast(
            "✓ Protocolo criado!"
        );

    }


    salvarProtocolos();


    fecharModalProtocolo();


    renderizarCategorias();

    renderizarLista();

    renderizarProtocolo();

}


/* =====================================================
   EXCLUIR PROTOCOLO
===================================================== */

function excluirProtocolo() {

    if (!protocoloSelecionado) {

        return;

    }


    const confirmar =
        confirm(
            `Deseja realmente excluir o protocolo "${protocoloSelecionado.nome}"?`
        );


    if (!confirmar) {

        return;

    }


    protocolos =
        protocolos.filter(
            protocolo =>
                protocolo.id !==
                protocoloSelecionado.id
        );


    protocoloSelecionado =
        null;


    salvarProtocolos();


    renderizarCategorias();

    renderizarLista();

    mostrarTelaInicial();


    mostrarToast(
        "Protocolo excluído."
    );

}


/* =====================================================
   COPIAR PROTOCOLO
===================================================== */

async function copiarProtocolo() {

    if (!protocoloSelecionado) {

        return;

    }


    try {

        await navigator.clipboard.writeText(
            protocoloSelecionado.texto
        );


        mostrarToast(
            "✓ Protocolo copiado!"
        );

    } catch (erro) {

        const textarea =
            document.createElement(
                "textarea"
            );


        textarea.value =
            protocoloSelecionado.texto;


        textarea.style.position =
            "fixed";


        textarea.style.opacity =
            "0";


        document.body.appendChild(
            textarea
        );


        textarea.select();


        try {

            document.execCommand(
                "copy"
            );


            mostrarToast(
                "✓ Protocolo copiado!"
            );

        } catch {

            mostrarToast(
                "Não foi possível copiar."
            );

        }


        document.body.removeChild(
            textarea
        );

    }

}


/* =====================================================
   NOVA CATEGORIA
===================================================== */

function abrirNovaCategoria() {

    nomeCategoria.value = "";


    modalCategoria.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";


    nomeCategoria.focus();

}


/* =====================================================
   SALVAR CATEGORIA
===================================================== */

function salvarCategoria(event) {

    event.preventDefault();


    const nome =
        nomeCategoria.value.trim();


    if (!nome) {

        mostrarToast(
            "Digite o nome da categoria."
        );

        return;

    }


    /* Verificar duplicada */

    const existe =
        categorias.some(
            categoria =>
                categoria.nome
                    .toLowerCase() ===
                nome.toLowerCase()
        );


    if (existe) {

        mostrarToast(
            "Essa categoria já existe."
        );

        return;

    }


    const novaCategoria = {

        id:
            "categoria-" +
            Date.now(),

        nome:
            nome.toUpperCase()

    };


    categorias.push(
        novaCategoria
    );


    salvarCategorias();


    categoriaSelecionada =
        novaCategoria.id;


    renderizarCategorias();

    renderizarLista();


    fecharModalCategoria();


    mostrarToast(
        "✓ Categoria criada!"
    );

}


/* =====================================================
   FECHAR MODAL PROTOCOLO
===================================================== */

function abrirModalProtocolo() {

    modalProtocolo.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


function fecharModalProtocolo() {

    modalProtocolo.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* =====================================================
   FECHAR MODAL CATEGORIA
===================================================== */

function fecharModalCategoria() {

    modalCategoria.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* =====================================================
   TOAST
===================================================== */

function mostrarToast(mensagem) {

    const antigo =
        document.querySelector(
            ".toast"
        );


    if (antigo) {

        antigo.remove();

    }


    const toast =
        document.createElement(
            "div"
        );


    toast.className =
        "toast";


    toast.textContent =
        mensagem;


    document.body.appendChild(
        toast
    );


    setTimeout(
        () => {

            toast.remove();

        },
        2500
    );

}


/* =====================================================
   PESQUISA
===================================================== */

function pesquisar() {

    renderizarLista();

}


/* =====================================================
   ESCAPAR HTML
===================================================== */

function escaparHTML(texto) {

    return texto
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =====================================================
   EVENTOS
===================================================== */


/* Novo protocolo */

document
    .getElementById("btnNovo")
    .addEventListener(
        "click",
        abrirNovoProtocolo
    );


/* Novo protocolo tela inicial */

document
    .getElementById("btnNovoWelcome")
    .addEventListener(
        "click",
        abrirNovoProtocolo
    );


/* Salvar protocolo */

formProtocolo.addEventListener(
    "submit",
    salvarFormulario
);


/* Fechar protocolo */

document
    .getElementById("btnFecharModal")
    .addEventListener(
        "click",
        fecharModalProtocolo
    );


document
    .getElementById("btnCancelar")
    .addEventListener(
        "click",
        fecharModalProtocolo
    );


/* Nova categoria */

document
    .getElementById("btnNovaCategoria")
    .addEventListener(
        "click",
        abrirNovaCategoria
    );


/* Salvar categoria */

formCategoria.addEventListener(
    "submit",
    salvarCategoria
);


/* Fechar categoria */

document
    .getElementById("btnFecharCategoria")
    .addEventListener(
        "click",
        fecharModalCategoria
    );


document
    .getElementById("btnCancelarCategoria")
    .addEventListener(
        "click",
        fecharModalCategoria
    );


/* Pesquisa */

campoPesquisa.addEventListener(
    "input",
    pesquisar
);


/* Clicar fora do modal */

modalProtocolo.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalProtocolo
        ) {

            fecharModalProtocolo();

        }

    }
);


modalCategoria.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            modalCategoria
        ) {

            fecharModalCategoria();

        }

    }
);


/* ESC */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            if (
                modalProtocolo
                    .classList
                    .contains("show")
            ) {

                fecharModalProtocolo();

            }


            if (
                modalCategoria
                    .classList
                    .contains("show")
            ) {

                fecharModalCategoria();

            }

        }

    }
);


/* =====================================================
   ATALHOS
===================================================== */

/*
   Ctrl + K
   → Pesquisa
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            campoPesquisa.focus();

        }

    }
);


/*
   Ctrl + Shift + C
   → Copiar protocolo
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() === "c"
        ) {

            event.preventDefault();

            copiarProtocolo();

        }

    }
);


/* =====================================================
   INICIALIZAÇÃO
===================================================== */

renderizarCategorias();

renderizarLista();

mostrarTelaInicial();

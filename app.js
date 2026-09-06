"use strict";

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


/* MODAL PROTOCOLO */

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


/* MODAL CATEGORIA */

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

        const resultado =
            JSON.parse(dados);

        return Array.isArray(resultado)
            ? resultado
            : [];

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

            return [
                ...categoriasPadrao
            ];
        }

        const resultado =
            JSON.parse(dados);

        return Array.isArray(resultado)
            ? resultado
            : [
                ...categoriasPadrao
            ];

    } catch (erro) {

        console.error(
            "Erro ao carregar categorias:",
            erro
        );

        return [
            ...categoriasPadrao
        ];
    }
}


/* =====================================================
   SALVAR DADOS
===================================================== */

function salvarProtocolos() {

    localStorage.setItem(
        STORAGE_PROTOCOLS,
        JSON.stringify(
            protocolos
        )
    );
}


function salvarCategorias() {

    localStorage.setItem(
        STORAGE_CATEGORIES,
        JSON.stringify(
            categorias
        )
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

    if (
        categoriaSelecionada ===
        "todos"
    ) {

        todos.classList.add(
            "active"
        );
    }

    todos.innerHTML = `
        <span class="category-icon">
            ▣
        </span>

        <span class="category-name">
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

    listaCategorias.appendChild(
        todos
    );


    /* CATEGORIAS */

    categorias.forEach(
        categoria => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "category-item";


            if (
                categoriaSelecionada ===
                categoria.id
            ) {

                item.classList.add(
                    "active"
                );
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

                <span class="category-name">
                </span>

                <span class="category-count">
                    ${quantidade}
                </span>

                <button
                    class="category-menu-button"
                    title="Opções">

                    ⋮

                </button>

                <div
                    class="category-menu">

                    <button
                        class="category-edit">

                        ✏️ Editar

                    </button>

                    <button
                        class="category-delete">

                        🗑️ Excluir

                    </button>

                </div>
            `;


            item.querySelector(
                ".category-name"
            ).textContent =
                categoria.nome;


            /* SELECIONAR CATEGORIA */

            item.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".category-menu-button"
                        ) ||
                        event.target.closest(
                            ".category-menu"
                        )
                    ) {

                        return;
                    }


                    categoriaSelecionada =
                        categoria.id;

                    renderizarCategorias();
                    renderizarLista();

                }
            );


            /* BOTÃO ⋮ */

            const menuButton =
                item.querySelector(
                    ".category-menu-button"
                );


            menuButton.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    fecharMenusCategoria();

                    const menu =
                        item.querySelector(
                            ".category-menu"
                        );

                    menu.classList.toggle(
                        "show"
                    );

                }
            );


            /* EDITAR */

            const btnEditar =
                item.querySelector(
                    ".category-edit"
                );


            btnEditar.addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    fecharMenusCategoria();

                    editarCategoria(
                        categoria.id
                    );

                }
            );


            /* EXCLUIR */

            const btnExcluir =
                item.querySelector(
                    ".category-delete"
                );


            /*
               OUTROS não pode ser excluída.
            */

            if (
                categoria.id ===
                "outros"
            ) {

                btnExcluir.disabled =
                    true;

                btnExcluir.title =
                    "A categoria OUTROS não pode ser excluída.";

                btnExcluir.style.opacity =
                    "0.4";

                btnExcluir.style.cursor =
                    "not-allowed";

            } else {

                btnExcluir.addEventListener(
                    "click",
                    event => {

                        event.stopPropagation();

                        fecharMenusCategoria();

                        excluirCategoria(
                            categoria.id
                        );

                    }
                );
            }


            listaCategorias.appendChild(
                item
            );

        }
    );
}


/* =====================================================
   FECHAR MENUS DE CATEGORIA
===================================================== */

function fecharMenusCategoria() {

    document
        .querySelectorAll(
            ".category-menu.show"
        )
        .forEach(
            menu => {

                menu.classList.remove(
                    "show"
                );

            }
        );
}


/* =====================================================
   FECHAR MENU AO CLICAR FORA
===================================================== */

document.addEventListener(
    "click",
    () => {

        fecharMenusCategoria();

    }
);


/* =====================================================
   EDITAR CATEGORIA
===================================================== */

function editarCategoria(id) {

    const categoria =
        categorias.find(
            item =>
                item.id === id
        );


    if (!categoria) {
        return;
    }


    const novoNome =
        prompt(
            "Digite o novo nome da categoria:",
            categoria.nome
        );


    if (
        novoNome === null
    ) {

        return;
    }


    const nome =
        novoNome.trim();


    if (!nome) {

        mostrarToast(
            "Digite um nome válido."
        );

        return;
    }


    /* VERIFICAR DUPLICADA */

    const existe =
        categorias.some(
            item =>
                item.id !== id &&
                item.nome.toLowerCase() ===
                nome.toLowerCase()
        );


    if (existe) {

        mostrarToast(
            "Essa categoria já existe."
        );

        return;
    }


    categoria.nome =
        nome.toUpperCase();


    salvarCategorias();


    renderizarCategorias();

    renderizarLista();


    if (
        protocoloSelecionado
    ) {

        renderizarProtocolo();

    }


    mostrarToast(
        "✓ Categoria atualizada!"
    );
}


/* =====================================================
   EXCLUIR CATEGORIA
===================================================== */

function excluirCategoria(id) {

    const categoria =
        categorias.find(
            item =>
                item.id === id
        );


    if (!categoria) {
        return;
    }


    /* PROTEGER OUTROS */

    if (
        categoria.id ===
        "outros"
    ) {

        mostrarToast(
            "A categoria OUTROS não pode ser excluída."
        );

        return;
    }


    const quantidade =
        protocolos.filter(
            protocolo =>
                protocolo.categoriaId === id
        ).length;


    let mensagem =
        `Deseja excluir a categoria "${categoria.nome}"?`;


    if (quantidade > 0) {

        mensagem +=
            `\n\nExistem ${quantidade} protocolo(s) nesta categoria.`;

        mensagem +=
            "\nEles serão movidos para a categoria OUTROS.";

    }


    const confirmar =
        confirm(
            mensagem
        );


    if (!confirmar) {
        return;
    }


    /* MOVER PROTOCOLOS PARA OUTROS */

    protocolos =
        protocolos.map(
            protocolo => {

                if (
                    protocolo.categoriaId ===
                    id
                ) {

                    return {
                        ...protocolo,
                        categoriaId: "outros"
                    };
                }

                return protocolo;

            }
        );


    /* EXCLUIR CATEGORIA */

    categorias =
        categorias.filter(
            categoria =>
                categoria.id !== id
        );


    /* SE ESTAVA SELECIONADA */

    if (
        categoriaSelecionada === id
    ) {

        categoriaSelecionada =
            "todos";

    }


    /* SE PROTOCOLO SELECIONADO FOI MOVIDO */

    if (
        protocoloSelecionado &&
        protocoloSelecionado.categoriaId === id
    ) {

        protocoloSelecionado.categoriaId =
            "outros";
    }


    salvarProtocolos();

    salvarCategorias();


    renderizarCategorias();

    renderizarLista();

    renderizarProtocolo();


    mostrarToast(
        "✓ Categoria excluída!"
    );
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
        [...protocolos];


    /* CATEGORIA */

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


    /* PESQUISA */

    if (pesquisa) {

        resultados =
            resultados.filter(
                protocolo => {

                    const nome =
                        String(
                            protocolo.nome ||
                            ""
                        ).toLowerCase();


                    const texto =
                        String(
                            protocolo.texto ||
                            ""
                        ).toLowerCase();


                    return (
                        nome.includes(
                            pesquisa
                        ) ||
                        texto.includes(
                            pesquisa
                        )
                    );

                }
            );
    }


    listaProtocolos.innerHTML =
        "";


    if (
        resultados.length === 0
    ) {

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


    resultados.forEach(
        protocolo => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "protocol-item";


            if (
                protocoloSelecionado &&
                protocoloSelecionado.id ===
                protocolo.id
            ) {

                item.classList.add(
                    "active"
                );
            }


            item.innerHTML = `

                <span class="protocol-item-icon">
                    ▣
                </span>

                <span class="protocol-name">
                </span>

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


    conteudo.innerHTML =
        "";


    const container =
        document.createElement(
            "div"
        );


    container.className =
        "protocol-view";


    /* CABEÇALHO */

    const header =
        document.createElement(
            "div"
        );


    header.className =
        "protocol-header";


    const titulo =
        document.createElement(
            "h1"
        );


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
        document.createElement(
            "div"
        );


    categoriaTexto.className =
        "protocol-category";


    categoriaTexto.textContent =
        categoria
            ? categoria.nome
            : "SEM CATEGORIA";


    header.appendChild(
        titulo
    );

    header.appendChild(
        categoriaTexto
    );


    /* TEXTO */

    const texto =
        document.createElement(
            "div"
        );


    texto.className =
        "protocol-text";


    texto.textContent =
        protocoloSelecionado.texto;


    /* AÇÕES */

    const actions =
        document.createElement(
            "div"
        );


    actions.className =
        "actions";


    /* COPIAR */

    const btnCopiar =
        document.createElement(
            "button"
        );


    btnCopiar.className =
        "primary-button";


    btnCopiar.textContent =
        "📋 Copiar";


    btnCopiar.addEventListener(
        "click",
        copiarProtocolo
    );


    /* EDITAR */

    const btnEditar =
        document.createElement(
            "button"
        );


    btnEditar.className =
        "secondary-button";


    btnEditar.textContent =
        "✏️ Editar";


    btnEditar.addEventListener(
        "click",
        abrirEdicao
    );


    /* EXCLUIR */

    const btnExcluir =
        document.createElement(
            "button"
        );


    btnExcluir.className =
        "danger-button";


    btnExcluir.textContent =
        "🗑️ Excluir";


    btnExcluir.addEventListener(
        "click",
        excluirProtocolo
    );


    actions.appendChild(
        btnCopiar
    );

    actions.appendChild(
        btnEditar
    );

    actions.appendChild(
        btnExcluir
    );


    container.appendChild(
        header
    );

    container.appendChild(
        texto
    );

    container.appendChild(
        actions
    );


    conteudo.appendChild(
        container
    );
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


    const btn =
        document.getElementById(
            "btnNovoWelcomeInterno"
        );


    if (btn) {

        btn.addEventListener(
            "click",
            abrirNovoProtocolo
        );
    }
}


/* =====================================================
   SELECT DE CATEGORIAS
===================================================== */

function preencherCategoriasSelect(
    categoriaAtual = ""
) {

    categoriaProtocolo.innerHTML =
        "";


    categorias.forEach(
        categoria => {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                categoria.id;


            option.textContent =
                categoria.nome;


            if (
                categoria.id ===
                categoriaAtual
            ) {

                option.selected =
                    true;
            }


            categoriaProtocolo.appendChild(
                option
            );

        }
    );
}


/* =====================================================
   NOVO PROTOCOLO
===================================================== */

function abrirNovoProtocolo() {

    modoEdicao =
        false;


    tituloModal.textContent =
        "Novo protocolo";


    nomeProtocolo.value =
        "";


    textoProtocolo.value =
        "";


    preencherCategoriasSelect();


    if (
        categoriaSelecionada !==
        "todos" &&
        categorias.some(
            categoria =>
                categoria.id ===
                categoriaSelecionada
        )
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


    modoEdicao =
        true;


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


        if (
            indice !== -1
        ) {

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
   COPIAR
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

        } catch (erroCopia) {

            console.error(
                "Erro ao copiar:",
                erroCopia
            );


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

    nomeCategoria.value =
        "";


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


    const existe =
        categorias.some(
            categoria =>
                categoria.nome.toLowerCase() ===
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
   MODAL PROTOCOLO
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
   MODAL CATEGORIA
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

            if (toast.parentNode) {
                toast.remove();
            }

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
   EVENTOS
===================================================== */


/* NOVO PROTOCOLO */

document
    .getElementById("btnNovo")
    .addEventListener(
        "click",
        abrirNovoProtocolo
    );


/* NOVO PROTOCOLO TELA INICIAL */

document
    .getElementById("btnNovoWelcome")
    .addEventListener(
        "click",
        abrirNovoProtocolo
    );


/* SALVAR PROTOCOLO */

formProtocolo.addEventListener(
    "submit",
    salvarFormulario
);


/* FECHAR PROTOCOLO */

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


/* NOVA CATEGORIA */

document
    .getElementById("btnNovaCategoria")
    .addEventListener(
        "click",
        abrirNovaCategoria
    );


/* SALVAR CATEGORIA */

formCategoria.addEventListener(
    "submit",
    salvarCategoria
);


/* FECHAR CATEGORIA */

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


/* PESQUISA */

campoPesquisa.addEventListener(
    "input",
    pesquisar
);


/* CLICAR FORA DOS MODAIS */

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
            event.key !==
            "Escape"
        ) {

            return;
        }


        if (
            modalProtocolo.classList.contains(
                "show"
            )
        ) {

            fecharModalProtocolo();
        }


        if (
            modalCategoria.classList.contains(
                "show"
            )
        ) {

            fecharModalCategoria();
        }
    }
);


/* =====================================================
   ATALHOS
===================================================== */


/* CTRL + K */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey ||
             event.metaKey) &&
            event.key.toLowerCase() ===
            "k"
        ) {

            event.preventDefault();

            campoPesquisa.focus();
        }
    }
);


/* CTRL + SHIFT + C */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.shiftKey &&
            event.key.toLowerCase() ===
            "c"
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

console.log(
    "✓ Meus Protocolos carregado com sucesso!"
);

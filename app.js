/* =====================================================
   CONFIGURAÇÕES
===================================================== */

const STORAGE_PROTOCOLS = "meus_protocolos_v3";
const STORAGE_CATEGORIES = "minhas_categorias_v2";
const STORAGE_SUBCATEGORIES = "minhas_subcategorias_v1";


/* =====================================================
   CATEGORIAS PADRÃO
===================================================== */

const categoriasPadrao = [

    {
        id: "internet",
        nome: "INTERNET / CONEXÃO"
    },

    {
        id: "fibra",
        nome: "FIBRA / SINAL"
    },

    {
        id: "wifi",
        nome: "WI-FI / ROTEADOR"
    },

    {
        id: "velocidade",
        nome: "VELOCIDADE"
    },

    {
        id: "tv",
        nome: "TV"
    },

    {
        id: "telefonia",
        nome: "TELEFONIA"
    },

    {
        id: "financeiro",
        nome: "FINANCEIRO"
    },

    {
        id: "servicos",
        nome: "ENDEREÇO / SERVIÇOS"
    },

    {
        id: "equipamentos",
        nome: "EQUIPAMENTOS"
    },

    {
        id: "aplicativos",
        nome: "APLICATIVOS / SERVIÇOS"
    },

    {
        id: "informacoes",
        nome: "INFORMAÇÕES"
    },

    {
        id: "ofertas",
        nome: "OFERTAS"
    }

];


/* =====================================================
   SUBCATEGORIAS PADRÃO
===================================================== */

const subcategoriasPadrao = [

    /* INTERNET */

    {
        id: "instabilidade",
        categoriaId: "internet",
        nome: "INSTABILIDADE"
    },

    {
        id: "sem-acesso",
        categoriaId: "internet",
        nome: "SEM ACESSO"
    },

    {
        id: "fwa",
        categoriaId: "internet",
        nome: "FWA"
    },

    {
        id: "ping",
        categoriaId: "internet",
        nome: "PING"
    },


    /* FIBRA */

    {
        id: "los",
        categoriaId: "fibra",
        nome: "LOS"
    },

    {
        id: "pon",
        categoriaId: "fibra",
        nome: "PON"
    },

    {
        id: "rota",
        categoriaId: "fibra",
        nome: "ROTA"
    },

    {
        id: "sinal-irregular",
        categoriaId: "fibra",
        nome: "SINAL IRREGULAR"
    },

    {
        id: "cabo-fibra",
        categoriaId: "fibra",
        nome: "CABO DE FIBRA"
    },

    {
        id: "instalacao",
        categoriaId: "fibra",
        nome: "INSTALAÇÃO"
    },


    /* WI-FI */

    {
        id: "senha",
        categoriaId: "wifi",
        nome: "SENHA"
    },

    {
        id: "roteador-gerencia",
        categoriaId: "wifi",
        nome: "ROTEADOR SEM GERÊNCIA"
    },

    {
        id: "tp-link",
        categoriaId: "wifi",
        nome: "TP-LINK"
    },

    {
        id: "wps",
        categoriaId: "wifi",
        nome: "WPS"
    },

    {
        id: "pppoe",
        categoriaId: "wifi",
        nome: "PPPoE"
    },


    /* VELOCIDADE */

    {
        id: "plano-velocidade",
        categoriaId: "velocidade",
        nome: "PLANO NÃO CHEGA AO CONTRATADO"
    },


    /* TV */

    {
        id: "canais",
        categoriaId: "tv",
        nome: "CANAIS"
    },

    {
        id: "instabilidade-tv",
        categoriaId: "tv",
        nome: "INSTABILIDADE"
    },

    {
        id: "receptor",
        categoriaId: "tv",
        nome: "RECEPTOR"
    },

    {
        id: "sem-sinal-tv",
        categoriaId: "tv",
        nome: "SEM SINAL"
    },


    /* TELEFONIA */

    {
        id: "autenticacao",
        categoriaId: "telefonia",
        nome: "AUTENTICAÇÃO"
    },

    {
        id: "linha",
        categoriaId: "telefonia",
        nome: "LINHA"
    },

    {
        id: "desbloqueios",
        categoriaId: "telefonia",
        nome: "DESBLOQUEIOS"
    },


    /* FINANCEIRO */

    {
        id: "bloqueio",
        categoriaId: "financeiro",
        nome: "BLOQUEIO FINANCEIRO"
    },

    {
        id: "cobranca-reparo",
        categoriaId: "financeiro",
        nome: "COBRANÇA DE REPARO"
    },


    /* SERVIÇOS */

    {
        id: "endereco",
        categoriaId: "servicos",
        nome: "ENDEREÇO"
    },

    {
        id: "comodo",
        categoriaId: "servicos",
        nome: "ALTERAÇÃO DE CÔMODO"
    },

    {
        id: "conecta",
        categoriaId: "servicos",
        nome: "CONECTA +"
    },


    /* EQUIPAMENTOS */

    {
        id: "equipamento",
        categoriaId: "equipamentos",
        nome: "EQUIPAMENTO"
    },

    {
        id: "ip-fixo",
        categoriaId: "equipamentos",
        nome: "IP FIXO"
    },


    /* APLICATIVOS */

    {
        id: "apps-instabilidade",
        categoriaId: "aplicativos",
        nome: "APLICATIVOS COM INSTABILIDADE"
    },

    {
        id: "globoplay",
        categoriaId: "aplicativos",
        nome: "GLOBOPLAY"
    },

    {
        id: "iptv",
        categoriaId: "aplicativos",
        nome: "IPTV"
    },


    /* INFORMAÇÕES */

    {
        id: "informacoes-ip",
        categoriaId: "informacoes",
        nome: "IP FIXO"
    },

    {
        id: "informacoes-gerais",
        categoriaId: "informacoes",
        nome: "INFORMAÇÕES GERAIS"
    },


    /* OFERTAS */

    {
        id: "chip-5g",
        categoriaId: "ofertas",
        nome: "CHIP 5G"
    }

];


/* =====================================================
   ELEMENTOS
===================================================== */

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

const subcategoriaProtocolo =
    document.getElementById("subcategoriaProtocolo");

const textoProtocolo =
    document.getElementById("textoProtocolo");

const formProtocolo =
    document.getElementById("formProtocolo");


/* Modal categoria */

const modalCategoria =
    document.getElementById("modalCategoria");

const tituloCategoriaModal =
    document.getElementById("tituloCategoriaModal");

const nomeCategoria =
    document.getElementById("nomeCategoria");

const formCategoria =
    document.getElementById("formCategoria");


/* Modal subcategoria */

const modalSubcategoria =
    document.getElementById("modalSubcategoria");

const tituloSubcategoriaModal =
    document.getElementById("tituloSubcategoriaModal");

const categoriaDaSubcategoria =
    document.getElementById("categoriaDaSubcategoria");

const nomeSubcategoria =
    document.getElementById("nomeSubcategoria");

const formSubcategoria =
    document.getElementById("formSubcategoria");


/* =====================================================
   ESTADO
===================================================== */

let protocolos =
    carregarDados(
        STORAGE_PROTOCOLS,
        []
    );


let categorias =
    carregarDados(
        STORAGE_CATEGORIES,
        categoriasPadrao
    );


let subcategorias =
    carregarDados(
        STORAGE_SUBCATEGORIES,
        subcategoriasPadrao
    );


let protocoloSelecionado = null;

let categoriaSelecionada = "todos";

let subcategoriaSelecionada = null;

let modoEdicaoProtocolo = false;

let modoEdicaoCategoria = false;

let modoEdicaoSubcategoria = false;

let categoriaAberta = {};


/* =====================================================
   CARREGAR DADOS
===================================================== */

function carregarDados(chave, padrao) {

    try {

        const dados =
            localStorage.getItem(chave);

        if (!dados) {

            localStorage.setItem(
                chave,
                JSON.stringify(padrao)
            );

            return JSON.parse(
                JSON.stringify(padrao)
            );

        }

        return JSON.parse(dados);

    } catch (erro) {

        console.error(
            "Erro ao carregar:",
            chave,
            erro
        );

        return JSON.parse(
            JSON.stringify(padrao)
        );

    }

}


/* =====================================================
   SALVAR
===================================================== */

function salvarTudo() {

    localStorage.setItem(
        STORAGE_PROTOCOLS,
        JSON.stringify(protocolos)
    );

    localStorage.setItem(
        STORAGE_CATEGORIES,
        JSON.stringify(categorias)
    );

    localStorage.setItem(
        STORAGE_SUBCATEGORIES,
        JSON.stringify(subcategorias)
    );

}


/* =====================================================
   RENDERIZAR ÁRVORE
===================================================== */

function renderizarCategorias() {

    listaCategorias.innerHTML = "";


    /* TODOS */

    const todos =
        document.createElement("div");

    todos.className =
        "category-item";

    if (
        categoriaSelecionada === "todos" &&
        !subcategoriaSelecionada
    ) {

        todos.classList.add("active");

    }

    todos.innerHTML = `

        <span class="category-arrow">
            •
        </span>

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

            subcategoriaSelecionada =
                null;

            protocoloSelecionado =
                null;

            renderizarCategorias();

            mostrarTelaInicial();

        }
    );

    listaCategorias.appendChild(todos);


    /* CATEGORIAS */

    categorias.forEach(
        categoria => {

            const wrapper =
                document.createElement("div");

            wrapper.className =
                "category-wrapper";


            const quantidadeCategoria =
                protocolos.filter(
                    protocolo =>
                        protocolo.categoriaId ===
                        categoria.id
                ).length;


            const item =
                document.createElement("div");

            item.className =
                "category-item";


            if (
                categoriaSelecionada ===
                categoria.id &&
                !subcategoriaSelecionada
            ) {

                item.classList.add("active");

            }


            const subcats =
                subcategorias.filter(
                    sub =>
                        sub.categoriaId ===
                        categoria.id
                );


            const aberta =
                categoriaAberta[categoria.id] === true;


            item.innerHTML = `

                <span class="category-arrow ${
                    aberta ? "open" : ""
                }">
                    ›
                </span>

                <span class="category-icon">
                    📁
                </span>

                <span class="category-name">
                    ${escaparHTML(categoria.nome)}
                </span>

                <span class="category-count">
                    ${quantidadeCategoria}
                </span>

                <span class="category-actions">

                    <button
                        class="tree-button add-sub"
                        title="Nova subcategoria">
                        +
                    </button>

                    <button
                        class="tree-button edit-cat"
                        title="Editar categoria">
                        ✏
                    </button>

                    <button
                        class="tree-button delete"
                        title="Excluir categoria">
                        🗑
                    </button>

                </span>

            `;


            /* Clique na categoria */

            item.addEventListener(
                "click",
                event => {

                    if (
                        event.target.closest(
                            ".category-actions"
                        )
                    ) {

                        return;

                    }


                    categoriaSelecionada =
                        categoria.id;

                    subcategoriaSelecionada =
                        null;

                    protocoloSelecionado =
                        null;

                    categoriaAberta[
                        categoria.id
                    ] =
                        !aberta;

                    renderizarCategorias();

                    renderizarListaFiltrada();

                }
            );


            /* Adicionar subcategoria */

            item.querySelector(
                ".add-sub"
            ).addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    abrirNovaSubcategoria(
                        categoria.id
                    );

                }
            );


            /* Editar categoria */

            item.querySelector(
                ".edit-cat"
            ).addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    abrirEdicaoCategoria(
                        categoria.id
                    );

                }
            );


            /* Excluir categoria */

            item.querySelector(
                ".delete"
            ).addEventListener(
                "click",
                event => {

                    event.stopPropagation();

                    excluirCategoria(
                        categoria.id
                    );

                }
            );


            wrapper.appendChild(item);


            /* SUBCATEGORIAS */

            if (subcats.length > 0) {

                const subList =
                    document.createElement("div");

                subList.className =
                    "subcategory-list";


                if (aberta) {

                    subList.classList.add("open");

                }


                subcats.forEach(
                    subcategoria => {

                        const subItem =
                            criarSubcategoriaItem(
                                subcategoria
                            );

                        subList.appendChild(
                            subItem
                        );

                    }
                );


                wrapper.appendChild(
                    subList
                );

            }


            listaCategorias.appendChild(
                wrapper
            );

        }
    );


    atualizarContador();

}


/* =====================================================
   CRIAR ITEM DE SUBCATEGORIA
===================================================== */

function criarSubcategoriaItem(
    subcategoria
) {

    const wrapper =
        document.createElement("div");


    const quantidade =
        protocolos.filter(
            protocolo =>
                protocolo.subcategoriaId ===
                subcategoria.id
        ).length;


    const ativo =
        subcategoriaSelecionada ===
        subcategoria.id;


    const item =
        document.createElement("div");


    item.className =
        "subcategory-item";


    if (ativo) {

        item.classList.add("active");

    }


    item.innerHTML = `

        <span class="subcategory-dot">
            •
        </span>

        <span class="subcategory-name">
            ${escaparHTML(subcategoria.nome)}
        </span>

        <span class="subcategory-count">
            ${quantidade}
        </span>

        <span class="subcategory-actions">

            <button
                class="tree-button edit-sub"
                title="Editar subcategoria">
                ✏
            </button>

            <button
                class="tree-button delete delete-sub"
                title="Excluir subcategoria">
                🗑
            </button>

        </span>

    `;


    item.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(
                    ".subcategory-actions"
                )
            ) {

                return;

            }


            const categoria =
                categorias.find(
                    cat =>
                        cat.id ===
                        subcategoria.categoriaId
                );


            categoriaSelecionada =
                categoria
                ? categoria.id
                : "todos";


            subcategoriaSelecionada =
                subcategoria.id;


            protocoloSelecionado =
                null;


            renderizarCategorias();

            renderizarListaFiltrada();

        }
    );


    /* Editar */

    item.querySelector(
        ".edit-sub"
    ).addEventListener(
        "click",
        event => {

            event.stopPropagation();

            abrirEdicaoSubcategoria(
                subcategoria.id
            );

        }
    );


    /* Excluir */

    item.querySelector(
        ".delete-sub"
    ).addEventListener(
        "click",
        event => {

            event.stopPropagation();

            excluirSubcategoria(
                subcategoria.id
            );

        }
    );


    /* Protocolos */

    const protocolosDaSubcategoria =
        protocolos.filter(
            protocolo =>
                protocolo.subcategoriaId ===
                subcategoria.id
        );


    if (
        protocolosDaSubcategoria.length > 0
    ) {

        const listaProtocolos =
            document.createElement("div");

        listaProtocolos.className =
            "protocol-list-tree";


        protocolosDaSubcategoria
            .filter(
                protocolo =>
                    correspondePesquisa(
                        protocolo
                    )
            )
            .forEach(
                protocolo => {

                    const p =
                        document.createElement("div");

                    p.className =
                        "protocol-sidebar-item";


                    if (
                        protocoloSelecionado &&
                        protocoloSelecionado.id ===
                        protocolo.id
                    ) {

                        p.classList.add(
                            "active"
                        );

                    }


                    p.innerHTML = `

                        <span class="protocol-sidebar-icon">
                            ▣
                        </span>

                        <span class="protocol-sidebar-name">
                            ${escaparHTML(
                                protocolo.nome
                            )}
                        </span>

                    `;


                    p.addEventListener(
                        "click",
                        () => {

                            selecionarProtocolo(
                                protocolo.id
                            );

                        }
                    );


                    listaProtocolos.appendChild(
                        p
                    );

                }
            );


        wrapper.appendChild(
            listaProtocolos
        );

    }


    wrapper.appendChild(item);

    return wrapper;

}


/* =====================================================
   PESQUISA
===================================================== */

function correspondePesquisa(
    protocolo
) {

    const pesquisa =
        campoPesquisa.value
            .trim()
            .toLowerCase();


    if (!pesquisa) {

        return true;

    }


    return (
        protocolo.nome
            .toLowerCase()
            .includes(pesquisa) ||

        protocolo.texto
            .toLowerCase()
            .includes(pesquisa)
    );

}


/* =====================================================
   RENDERIZAR LISTA FILTRADA
===================================================== */

function renderizarListaFiltrada() {

    renderizarCategorias();


    if (
        subcategoriaSelecionada
    ) {

        const encontrados =
            protocolos.filter(
                protocolo =>

                    protocolo.subcategoriaId ===
                    subcategoriaSelecionada &&

                    correspondePesquisa(
                        protocolo
                    )
            );


        if (
            encontrados.length === 0
        ) {

            mostrarListaVazia();

        }

        return;

    }


    if (
        categoriaSelecionada !==
        "todos"
    ) {

        const encontrados =
            protocolos.filter(
                protocolo =>

                    protocolo.categoriaId ===
                    categoriaSelecionada &&

                    correspondePesquisa(
                        protocolo
                    )
            );


        if (
            encontrados.length === 0
        ) {

            mostrarListaVazia();

        }

        return;

    }


    if (
        campoPesquisa.value.trim()
    ) {

        const encontrados =
            protocolos.filter(
                correspondePesquisa
            );


        if (
            encontrados.length === 0
        ) {

            mostrarListaVazia();

        }

    }

}


/* =====================================================
   LISTA VAZIA
===================================================== */

function mostrarListaVazia() {

    conteudo.innerHTML = `

        <div class="welcome">

            <div class="welcome-icon">
                🔎
            </div>

            <h1>
                Nenhum protocolo encontrado
            </h1>

            <p>
                Não encontramos protocolos para
                os filtros selecionados.
            </p>

            <button
                class="primary-button"
                id="btnNovoBusca">

                + Criar protocolo

            </button>

        </div>

    `;


    document
        .getElementById(
            "btnNovoBusca"
        )
        .addEventListener(
            "click",
            abrirNovoProtocolo
        );

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


    categoriaSelecionada =
        protocolo.categoriaId;


    subcategoriaSelecionada =
        protocolo.subcategoriaId;


    categoriaAberta[
        protocolo.categoriaId
    ] = true;


    renderizarCategorias();

    renderizarProtocolo();

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


    const subcategoria =
        subcategorias.find(
            item =>
                item.id ===
                protocoloSelecionado.subcategoriaId
        );


    const categoriaTexto =
        document.createElement("span");

    categoriaTexto.className =
        "protocol-category";

    categoriaTexto.textContent =
        categoria
        ? categoria.nome
        : "SEM CATEGORIA";


    const subcategoriaTexto =
        document.createElement("span");

    subcategoriaTexto.className =
        "protocol-subcategory";

    subcategoriaTexto.textContent =
        subcategoria
        ? subcategoria.nome
        : "SEM SUBCATEGORIA";


    header.appendChild(titulo);

    header.appendChild(
        categoriaTexto
    );

    header.appendChild(
        subcategoriaTexto
    );


    const texto =
        document.createElement("div");

    texto.className =
        "protocol-text";

    texto.textContent =
        protocoloSelecionado.texto;


    const actions =
        document.createElement("div");

    actions.className =
        "actions";


    /* Copiar */

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


    /* Editar */

    const btnEditar =
        document.createElement("button");

    btnEditar.className =
        "secondary-button";

    btnEditar.textContent =
        "✏️ Editar";

    btnEditar.addEventListener(
        "click",
        abrirEdicaoProtocolo
    );


    /* Excluir */

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


    container.appendChild(header);

    container.appendChild(texto);

    container.appendChild(actions);


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
                id="btnNovoWelcomeInterno"
                class="primary-button">

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
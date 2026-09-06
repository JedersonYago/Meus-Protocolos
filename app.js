/* =========================================================
   MEUS PROTOCOLOS
   Sistema simples usando LocalStorage
========================================================= */


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const STORAGE_CATEGORIES = "meus_protocolos_categorias";
const STORAGE_PROTOCOLS = "meus_protocolos_protocolos";


/* =========================================================
   ELEMENTOS DO HTML
========================================================= */

const categoryList = document.getElementById("categoryList");

const protocolList = document.getElementById("protocolList");

const protocolCount = document.getElementById("protocolCount");

const currentCategoryName =
    document.getElementById("currentCategoryName");

const searchInput =
    document.getElementById("searchInput");

const newProtocolButton =
    document.getElementById("newProtocolButton");

const newCategoryButton =
    document.getElementById("newCategoryButton");


/* Modais */

const protocolModal =
    document.getElementById("protocolModal");

const categoryModal =
    document.getElementById("categoryModal");


/* Formulários */

const protocolForm =
    document.getElementById("protocolForm");

const categoryForm =
    document.getElementById("categoryForm");


/* =========================================================
   ESTADO DA APLICAÇÃO
========================================================= */

let categories = [];

let protocols = [];

let selectedCategory = "all";


/* =========================================================
   CARREGAR DADOS
========================================================= */

function loadData() {

    const savedCategories =
        localStorage.getItem(STORAGE_CATEGORIES);

    const savedProtocols =
        localStorage.getItem(STORAGE_PROTOCOLS);


    if (savedCategories) {

        categories = JSON.parse(savedCategories);

    } else {

        /*
         * Categorias iniciais.
         * Você pode apagar essas linhas caso queira
         * começar com a aplicação completamente vazia.
         */

        categories = [
            {
                id: generateId(),
                name: "Internet"
            },
            {
                id: generateId(),
                name: "Financeiro"
            },
            {
                id: generateId(),
                name: "Cancelamento"
            }
        ];

        saveData();
    }


    if (savedProtocols) {

        protocols = JSON.parse(savedProtocols);

    } else {

        protocols = [];

        saveData();
    }

}


/* =========================================================
   SALVAR DADOS
========================================================= */

function saveData() {

    localStorage.setItem(
        STORAGE_CATEGORIES,
        JSON.stringify(categories)
    );

    localStorage.setItem(
        STORAGE_PROTOCOLS,
        JSON.stringify(protocols)
    );

}


/* =========================================================
   GERAR ID
========================================================= */

function generateId() {

    return Date.now().toString() +
        Math.random().toString(36).substring(2, 9);

}


/* =========================================================
   RENDERIZAR CATEGORIAS
========================================================= */

function renderCategories() {

    categoryList.innerHTML = "";


    /* Categoria "Todos" */

    const allCategory = document.createElement("div");

    allCategory.className = "category-item";

    allCategory.innerHTML = `
        <button
            class="category-main ${selectedCategory === "all" ? "active" : ""}"
            onclick="selectCategory('all')"
        >
            📁 Todos
        </button>
    `;

    categoryList.appendChild(allCategory);


    /* Categorias cadastradas */

    categories.forEach(category => {

        const item =
            document.createElement("div");

        item.className = "category-item";


        item.innerHTML = `
            <button
                class="category-main ${selectedCategory === category.id ? "active" : ""}"
                onclick="selectCategory('${category.id}')"
            >
                📁 ${escapeHtml(category.name)}
            </button>

            <div class="category-actions">

                <button
                    class="category-action"
                    title="Editar categoria"
                    onclick="editCategory('${category.id}')"
                >
                    ✏️
                </button>

                <button
                    class="category-action delete"
                    title="Excluir categoria"
                    onclick="deleteCategory('${category.id}')"
                >
                    🗑️
                </button>

            </div>
        `;


        categoryList.appendChild(item);

    });

}


/* =========================================================
   SELECIONAR CATEGORIA
========================================================= */

function selectCategory(categoryId) {

    selectedCategory = categoryId;

    renderCategories();

    renderProtocols();

}


/* =========================================================
   RENDERIZAR PROTOCOLOS
========================================================= */

function renderProtocols() {

    protocolList.innerHTML = "";


    let filteredProtocols = [...protocols];


    /* Filtrar por categoria */

    if (selectedCategory !== "all") {

        filteredProtocols =
            filteredProtocols.filter(protocol =>
                protocol.categoryId === selectedCategory
            );

    }


    /* Filtrar pela pesquisa */

    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    if (search) {

        filteredProtocols =
            filteredProtocols.filter(protocol => {

                const name =
                    protocol.name.toLowerCase();

                const text =
                    protocol.text.toLowerCase();

                return (
                    name.includes(search) ||
                    text.includes(search)
                );

            });

    }


    /* Atualizar título */

    if (selectedCategory === "all") {

        currentCategoryName.textContent =
            "Todos os protocolos";

    } else {

        const category =
            categories.find(
                category =>
                    category.id === selectedCategory
            );

        currentCategoryName.textContent =
            category
                ? category.name
                : "Categoria";

    }


    /* Contador */

    protocolCount.textContent =
        filteredProtocols.length;


    /* Nenhum protocolo */

    if (filteredProtocols.length === 0) {

        protocolList.innerHTML = `
            <div class="empty-state">

                <div class="empty-state-icon">
                    📋
                </div>

                <h3>Nenhum protocolo encontrado</h3>

                <p>
                    Crie um protocolo para começar
                    ou altere os filtros da pesquisa.
                </p>

            </div>
        `;

        return;

    }


    /* Criar cards */

    filteredProtocols.forEach(protocol => {

        const category =
            categories.find(
                category =>
                    category.id === protocol.categoryId
            );


        const card =
            document.createElement("article");

        card.className = "protocol-card";


        card.innerHTML = `

            <div class="protocol-header">

                <div class="protocol-title">
                    ${escapeHtml(protocol.name)}
                </div>

            </div>


            <div>

                <span class="protocol-category">
                    ${escapeHtml(
                        category
                            ? category.name
                            : "Sem categoria"
                    )}
                </span>

            </div>


            <div class="protocol-text">
                ${escapeHtml(protocol.text)}
            </div>


            <div class="protocol-actions">

                <button
                    class="action-button copy-button"
                    onclick="copyProtocol('${protocol.id}')"
                >
                    📋 Copiar
                </button>

                <button
                    class="action-button edit-button"
                    onclick="editProtocol('${protocol.id}')"
                >
                    ✏️ Editar
                </button>

                <button
                    class="action-button delete-button"
                    onclick="deleteProtocol('${protocol.id}')"
                >
                    🗑️ Excluir
                </button>

            </div>

        `;


        protocolList.appendChild(card);

    });

}


/* =========================================================
   NOVO PROTOCOLO
========================================================= */

function openNewProtocolModal() {

    protocolForm.reset();

    document.getElementById("protocolId").value = "";

    document.getElementById("protocolModalTitle")
        .textContent = "Novo protocolo";


    populateCategorySelect();


    /*
     * Se o usuário estiver dentro de uma categoria,
     * ela será selecionada automaticamente.
     */

    if (selectedCategory !== "all") {

        const categoryExists =
            categories.some(
                category =>
                    category.id === selectedCategory
            );

        if (categoryExists) {

            document.getElementById(
                "protocolCategory"
            ).value = selectedCategory;

        }

    }


    protocolModal.classList.remove("hidden");

    document.getElementById("protocolName").focus();

}


/* =========================================================
   PREENCHER SELECT DE CATEGORIAS
========================================================= */

function populateCategorySelect() {

    const select =
        document.getElementById("protocolCategory");

    select.innerHTML = "";


    if (categories.length === 0) {

        const option =
            document.createElement("option");

        option.value = "";

        option.textContent =
            "Crie uma categoria primeiro";

        select.appendChild(option);

        return;

    }


    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category.id;

        option.textContent = category.name;

        select.appendChild(option);

    });

}


/* =========================================================
   SALVAR PROTOCOLO
========================================================= */

protocolForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            document.getElementById(
                "protocolId"
            ).value;


        const name =
            document.getElementById(
                "protocolName"
            ).value.trim();


        const categoryId =
            document.getElementById(
                "protocolCategory"
            ).value;


        const text =
            document.getElementById(
                "protocolText"
            ).value.trim();


        if (!name || !categoryId || !text) {

            showToast(
                "Preencha todos os campos."
            );

            return;

        }


        /* Editar */

        if (id) {

            const protocol =
                protocols.find(
                    protocol =>
                        protocol.id === id
                );


            if (protocol) {

                protocol.name = name;

                protocol.categoryId =
                    categoryId;

                protocol.text = text;

            }


            showToast(
                "Protocolo atualizado!"
            );


        }

        /* Criar */

        else {

            protocols.push({

                id: generateId(),

                name: name,

                categoryId: categoryId,

                text: text

            });


            showToast(
                "Protocolo criado!"
            );

        }


        saveData();

        closeProtocolModal();

        renderProtocols();

    }
);


/* =========================================================
   EDITAR PROTOCOLO
========================================================= */

function editProtocol(id) {

    const protocol =
        protocols.find(
            protocol =>
                protocol.id === id
        );


    if (!protocol) {

        return;

    }


    populateCategorySelect();


    document.getElementById(
        "protocolId"
    ).value = protocol.id;


    document.getElementById(
        "protocolName"
    ).value = protocol.name;


    document.getElementById(
        "protocolCategory"
    ).value = protocol.categoryId;


    document.getElementById(
        "protocolText"
    ).value = protocol.text;


    document.getElementById(
        "protocolModalTitle"
    ).textContent =
        "Editar protocolo";


    protocolModal.classList.remove(
        "hidden"
    );

}


/* =========================================================
   EXCLUIR PROTOCOLO
========================================================= */

function deleteProtocol(id) {

    const protocol =
        protocols.find(
            protocol =>
                protocol.id === id
        );


    if (!protocol) {

        return;

    }


    const confirmed =
        confirm(
            `Tem certeza que deseja excluir o protocolo "${protocol.name}"?`
        );


    if (!confirmed) {

        return;

    }


    protocols =
        protocols.filter(
            protocol =>
                protocol.id !== id
        );


    saveData();

    renderProtocols();

    showToast(
        "Protocolo excluído."
    );

}


/* =========================================================
   COPIAR PROTOCOLO
========================================================= */

async function copyProtocol(id) {

    const protocol =
        protocols.find(
            protocol =>
                protocol.id === id
        );


    if (!protocol) {

        return;

    }


    try {

        await navigator.clipboard.writeText(
            protocol.text
        );


        showToast(
            "Texto copiado para a área de transferência!"
        );


    } catch (error) {

        /*
         * Método alternativo para navegadores
         * onde o Clipboard API não estiver disponível.
         */

        const textarea =
            document.createElement("textarea");

        textarea.value = protocol.text;

        document.body.appendChild(textarea);

        textarea.select();

        document.execCommand("copy");

        textarea.remove();


        showToast(
            "Texto copiado!"
        );

    }

}


/* =========================================================
   NOVA CATEGORIA
========================================================= */

function openNewCategoryModal() {

    categoryForm.reset();

    document.getElementById(
        "categoryId"
    ).value = "";


    document.getElementById(
        "categoryModalTitle"
    ).textContent =
        "Nova categoria";


    categoryModal.classList.remove(
        "hidden"
    );


    document.getElementById(
        "categoryName"
    ).focus();

}


/* =========================================================
   SALVAR CATEGORIA
========================================================= */

categoryForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const id =
            document.getElementById(
                "categoryId"
            ).value;


        const name =
            document.getElementById(
                "categoryName"
            ).value.trim();


        if (!name) {

            showToast(
                "Digite o nome da categoria."
            );

            return;

        }


        /* Verificar categoria duplicada */

        const duplicate =
            categories.some(category =>
                category.name.toLowerCase() ===
                name.toLowerCase() &&
                category.id !== id
            );


        if (duplicate) {

            showToast(
                "Essa categoria já existe."
            );

            return;

        }


        /* Editar */

        if (id) {

            const category =
                categories.find(
                    category =>
                        category.id === id
                );


            if (category) {

                category.name = name;

            }


            showToast(
                "Categoria atualizada!"
            );

        }

        /* Criar */

        else {

            const newCategory = {

                id: generateId(),

                name: name

            };


            categories.push(
                newCategory
            );


            selectedCategory =
                newCategory.id;


            showToast(
                "Categoria criada!"
            );

        }


        saveData();

        closeCategoryModal();

        renderCategories();

        renderProtocols();

    }
);


/* =========================================================
   EDITAR CATEGORIA
========================================================= */

function editCategory(id) {

    const category =
        categories.find(
            category =>
                category.id === id
        );


    if (!category) {

        return;

    }


    document.getElementById(
        "categoryId"
    ).value = category.id;


    document.getElementById(
        "categoryName"
    ).value = category.name;


    document.getElementById(
        "categoryModalTitle"
    ).textContent =
        "Editar categoria";


    categoryModal.classList.remove(
        "hidden"
    );


    document.getElementById(
        "categoryName"
    ).focus();

}


/* =========================================================
   EXCLUIR CATEGORIA
========================================================= */

function deleteCategory(id) {

    const category =
        categories.find(
            category =>
                category.id === id
        );


    if (!category) {

        return;

    }


    /*
     * Verifica se existem protocolos
     * dentro dessa categoria.
     */

    const protocolsInCategory =
        protocols.filter(
            protocol =>
                protocol.categoryId === id
        );


    if (protocolsInCategory.length > 0) {

        alert(
            `Não é possível excluir a categoria "${category.name}" porque existem ${protocolsInCategory.length} protocolo(s) nela.\n\nEdite ou exclua esses protocolos primeiro.`
        );

        return;

    }


    const confirmed =
        confirm(
            `Tem certeza que deseja excluir a categoria "${category.name}"?`
        );


    if (!confirmed) {

        return;

    }


    categories =
        categories.filter(
            category =>
                category.id !== id
        );


    /*
     * Se a categoria excluída estava selecionada,
     * volta para "Todos".
     */

    if (selectedCategory === id) {

        selectedCategory = "all";

    }


    saveData();

    renderCategories();

    renderProtocols();

    showToast(
        "Categoria excluída."
    );

}


/* =========================================================
   FECHAR MODAL DE PROTOCOLO
========================================================= */

function closeProtocolModal() {

    protocolModal.classList.add(
        "hidden"
    );

}


/* =========================================================
   FECHAR MODAL DE CATEGORIA
========================================================= */

function closeCategoryModal() {

    categoryModal.classList.add(
        "hidden"
    );

}


/* =========================================================
   TOAST
========================================================= */

let toastTimeout;


function showToast(message) {

    const toast =
        document.getElementById("toast");


    toast.textContent = message;


    toast.classList.add("show");


    clearTimeout(toastTimeout);


    toastTimeout =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* =========================================================
   ESCAPAR HTML
========================================================= */

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================================
   EVENTOS
========================================================= */

newProtocolButton.addEventListener(
    "click",
    function() {

        if (categories.length === 0) {

            alert(
                "Crie uma categoria antes de criar um protocolo."
            );

            openNewCategoryModal();

            return;

        }

        openNewProtocolModal();

    }
);


newCategoryButton.addEventListener(
    "click",
    openNewCategoryModal
);


searchInput.addEventListener(
    "input",
    renderProtocols
);


/* Fechar protocolo */

document.getElementById(
    "closeProtocolModal"
).addEventListener(
    "click",
    closeProtocolModal
);


document.getElementById(
    "cancelProtocolButton"
).addEventListener(
    "click",
    closeProtocolModal
);


/* Fechar categoria */

document.getElementById(
    "closeCategoryModal"
).addEventListener(
    "click",
    closeCategoryModal
);


document.getElementById(
    "cancelCategoryButton"
).addEventListener(
    "click",
    closeCategoryModal
);


/* Fechar clicando no fundo */

protocolModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeProtocolModal
    );


categoryModal
    .querySelector(".modal-overlay")
    .addEventListener(
        "click",
        closeCategoryModal
    );


/* ESC fecha os modais */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeProtocolModal();

            closeCategoryModal();

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

loadData();

renderCategories();

renderProtocols();

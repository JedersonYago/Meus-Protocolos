# Meus-Protocolos

📋 Meus Protocolos

Uma aplicação web simples e prática para organizar, consultar e gerenciar protocolos de atendimento.

O Meus Protocolos foi desenvolvido para facilitar o acesso a textos utilizados durante atendimentos, permitindo organizar os conteúdos por categorias e encontrar rapidamente o protocolo necessário.

🚧 Projeto em desenvolvimento.

✨ Funcionalidades
📋 Criar protocolos com nome, categoria e texto.
✏️ Editar protocolos existentes.
🗑️ Excluir protocolos.
📋 Copiar o conteúdo de um protocolo para a área de transferência.
🔎 Pesquisar protocolos pelo conteúdo disponível.
🗂️ Organizar protocolos por categorias.
➕ Criar novas categorias.
✏️ Editar categorias.
🗑️ Excluir categorias.
💾 Persistência local dos dados utilizando localStorage.
📱 Interface responsiva e adaptada para diferentes tamanhos de tela.
🖥️ Interface

A aplicação possui uma interface dividida em duas áreas principais:

Barra lateral: pesquisa e navegação entre as categorias.
Área principal: visualização e gerenciamento dos protocolos.

Os protocolos são apresentados em cartões contendo o nome, categoria, conteúdo e ações disponíveis.

🛠️ Tecnologias utilizadas
HTML5 — estrutura da aplicação.
CSS3 — estilização e responsividade.
JavaScript — lógica da aplicação e gerenciamento dos dados.
LocalStorage — armazenamento dos protocolos e categorias diretamente no navegador.
📁 Estrutura do projeto
Meus-Protocolos/
├── logo/
│   └── logo.jpeg
├── index.html
├── style.css
├── script.js
├── app.js
└── README.md

Principais arquivos
Arquivo	Descrição
index.html	Estrutura da interface da aplicação
style.css	Estilos, layout e responsividade
script.js	Lógica principal e gerenciamento dos protocolos
app.js	Código JavaScript adicional da aplicação
logo/	Recursos visuais utilizados pela interface
💾 Armazenamento

Os dados são armazenados localmente no navegador utilizando a API localStorage.

São utilizados dois espaços de armazenamento:

meus_protocolos_categorias
meus_protocolos_protocolos


Isso significa que os dados ficam associados ao navegador e ao dispositivo em que a aplicação está sendo utilizada.

⚠️ Importante

Como os dados são armazenados localmente:

não existe banco de dados remoto;
os protocolos não são sincronizados entre dispositivos;
limpar os dados do navegador pode apagar os protocolos salvos;
utilizar outro navegador resulta em um armazenamento separado.
🚀 Como executar

Por ser uma aplicação web estática, não é necessário instalar dependências para executá-la.

1. Clone o repositório
git clone https://github.com/JedersonYago/Meus-Protocolos.git

2. Entre na pasta
cd Meus-Protocolos

3. Execute a aplicação

Abra o arquivo index.html diretamente no navegador.

Também é possível utilizar uma extensão como Live Server no VS Code ou qualquer servidor HTTP local.

📝 Como utilizar
Criando um protocolo
Clique em + Criar protocolo.
Informe o nome do protocolo.
Selecione uma categoria.
Digite o texto que será utilizado no atendimento.
Clique em Salvar protocolo.
Editando um protocolo

Na lista de protocolos, clique em Editar, altere as informações desejadas e salve novamente.

Copiando um protocolo

Clique em Copiar para enviar o texto do protocolo diretamente para a área de transferência.

Criando uma categoria

Na barra lateral, utilize o botão + ao lado de "CATEGORIAS" para criar uma nova categoria e manter os protocolos organizados.

🎯 Objetivo

O projeto tem como objetivo tornar o gerenciamento de protocolos de atendimento mais rápido, organizado e acessível, evitando a necessidade de procurar manualmente textos recorrentes em diferentes arquivos ou documentos.

🔮 Próximos passos

Algumas melhorias que podem ser consideradas para versões futuras:

 Exportação dos protocolos para JSON.
 Importação de protocolos.
 Backup e restauração dos dados.
 Sincronização com banco de dados.
 Autenticação de usuários.
 Compartilhamento de protocolos.
 Modo escuro.
 Atalhos de teclado.
 Ordenação e filtros avançados.
 PWA para utilização como aplicativo.
 Histórico de alterações.
 Testes automatizados.
🤝 Contribuição

Contribuições são bem-vindas!

Para contribuir:

Faça um fork do projeto.
Crie uma branch para sua alteração:
git checkout -b minha-feature

Faça suas alterações.
Faça o commit:
git commit -m "feat: adiciona nova funcionalidade"

Envie a branch:
git push origin minha-feature

Abra um Pull Request.
📄 Licença

Este projeto ainda não possui uma licença definida.

Caso o projeto seja disponibilizado como código aberto, recomenda-se adicionar uma licença, como MIT, para deixar claro como outras pessoas podem utilizar e modificar o código.

Desenvolvido por JedersonYago.

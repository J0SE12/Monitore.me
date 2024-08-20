
# Monitore.me - Sistema para Monitoria

## Descrição

Monitore.me é uma plataforma de monitoria acadêmica que visa facilitar o contato entre estudantes com dificuldades de aprendizado e aqueles dispostos a ajudar com aulas de reforço. O sistema proporciona um ambiente para que os monitores possam compartilhar seus conhecimentos e, ao mesmo tempo, desenvolver suas habilidades de ensino.

## Resumo

Este projeto faz parte do portfólio para a conclusão do curso de Engenharia de Software do Centro Universitário - Católica de Santa Catarina em Joinville. O objetivo é abordar as documentações, ideias e especificações necessárias para a execução do projeto, utilizando diversas ferramentas estudadas durante o curso.

## Funcionalidades

### Requisitos Funcionais

1. Tela de login para alunos e monitores, utilizando o cadastro integrado à instituição.
2. Cadastro de conteúdo a ser ministrado, vinculado ao monitor.
3. Página inicial com assuntos e monitores cadastrados, disponível para os alunos.
4. Filtros de busca para alunos (curso, nível de dificuldade, tempo e matéria).
5. Limite de tempo e número de alunos por monitoria, definido pelo monitor.
6. Cadastro de salas de aula e controle de disponibilidade.
7. Controle de presença dos alunos, com sistema de chamada.
8. Geração de comprovantes de horas complementares para alunos e monitores.
9. Sistema de mensagens automáticas para comunicação entre monitores e alunos.
10. Processos de seleção e verificação de monitores.

### Requisitos Não Funcionais

1. Acessível em todos os navegadores de internet.
2. Medidas de segurança robustas para proteção de dados sensíveis.
3. Boa usabilidade conforme padrões da UXPA.
4. Capacidade de lidar com um grande número de usuários sem comprometer o desempenho.
5. Baixa latência no envio e visualização de informações.
6. Alta confiabilidade e precisão das informações.
7. Preparado para o controle de presença/faltas.
8. Desenvolvimento web utilizando CSS, JavaScript, Node.js, React e Express.

## Especificação Técnica

### Arquitetura

O projeto utiliza a arquitetura MVC (Model-View-Controller) complementada por micro serviços para garantir uma separação clara de responsabilidades e facilitar a manutenção do sistema.


### Stack Tecnológica

- **Front-End**: HTML, CSS, JavaScript, React
- **Back-End**: Node.js, Express.js
- **Banco de Dados**: MySQL
- **Ferramentas e Bibliotecas**: React, Express.js, Git/GitHub, SonarQube, GitHub Actions, GitHub Pages
- **Ambiente de Desenvolvimento**: VSCode
-  **Metodologia**: Gráfico de Gantt / Github Projects
  

### Estrutura do Repositório

- .github - arquivos e configurações específicas do GitHub para o repositório
-Frontend/monitore_me_frontend : código-fonte para a parte frontend do projeto
  -monitore-me-frontend
   -public : arquivos estáticos que são servidos diretamente pelo servido
   -src : código-fonte principal da aplicação
   -package-lock.json
   -package.json
- backend : código-fonte do lado do servidor da aplicação
  -Controllers/Routes : Pasta que contém controladores e definições de rotas
    -config :  arquivos de configuração para o projeto.
    -database : Código e configuração do banco de dados
     eslint.config.mjs : Arquivo de configuração para o ESLint, uma ferramenta de linting para JavaScrip
-package-lock.json : Configuração do Node.js
-package.json : Configuração do Node.js
-node_modules : Dependências do Node.js
.gitignore - 
-CNAME : usado para configurar um nome de domínio personalizado para o GitHub Pages
-README.md : Informações sobre o projeto
-package-lock.json
-package.json

## Configuração e Hospedagem

### Publicação no GitHub Pages

1. Vá para as configurações do repositório no GitHub.
2. Na seção "GitHub Pages", escolha a branch que contém o código do site (ex: `main` ou `master`).
3. Selecione a pasta raiz do site. O site será publicado no link [https://j0SE12.github.io/monitore_me](https://j0SE12.github.io/monitore_me).

## Modelagem C4

### Contexto

A plataforma visa facilitar o encontro de alunos com dificuldades em matérias específicas com monitores que desejam compartilhar seus conhecimentos. A modelagem do contexto pode ser visualizada na documentação associada.



### Containers

- **Front-End**: HTML, CSS, JavaScript, React
- **Back-End**: Node.js, Express.js
- **Database**: MySQL

### Componentes

- **Web Browser**: Interface de usuário para estudantes e monitores.
- **GitHub Pages**: Hospedagem do site.
- **Node.js Server**: Servidor back-end para lógica de negócios e APIs RESTful.
- **MySQL Database**: Banco de dados relacional.


## Testes

Para garantir a funcionalidade do sistema, serão realizados testes automatizados utilizando Selenium e Jest, além de testes de integração com Postman e pipelines de CI/CD configurados com GitHub Actions.


## Contribuição

Para contribuir com o projeto, faça um fork do repositório, crie uma branch para suas alterações, e envie um pull request para revisão.



















































































































































































         






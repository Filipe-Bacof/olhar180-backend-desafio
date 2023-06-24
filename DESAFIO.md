# Olhar180 Desafio Técnico:
Desenvolver uma aplicação web para gerenciar tarefas, permitindo ao usuário criar, editar e excluir tarefas, além de visualizar uma lista de tarefas existentes.
## Tecnologias utilizadas:
- `React` e preferencialmente `Styled-Components` para construir a interface do usuário;
- `Node` e `ExpressJS` para desenvolver o backend da aplicação;
- `PostgreSQL` e alguma `ORM` para armazenar e gerenciar dados da aplicação;
## Descrição do projeto:
A aplicação será uma lista de tarefas simples, com as seguintes funcionalidades:
- `Página inicial`: exibe uma lista de todas as tarefas existentes, permitindo que o usuário as visualize e as marque como concluídas. A página também deve ter um botão "Adicionar tarefa", que leva o usuário a uma página de criação de tarefas.
- `Página de criação de tarefas`: permite ao usuário adicionar uma nova tarefa à lista. A página deve ter um formulário que inclui campos para título da tarefa, descrição, data de conclusão e prioridade (alta, média, baixa).
- `Página de edição de tarefas`: permite ao usuário editar uma tarefa existente. A página deve ter um formulário com os mesmos campos da página de criação de tarefas.
- `Página de exclusão de tarefas`: permite ao usuário excluir uma tarefa existente da lista.
- `API RESTful`: o backend da aplicação deve fornecer endpoints para todas as operações CRUD (Create, Read, Update, Delete) nas tarefas. Deve ser possível criar, ler, atualizar e excluir tarefas por meio da API.
## Requisitos técnicos:
- A aplicação deve ser desenvolvida usando `React` para a interface do usuário e `Node`, `ExpressJS`, `PostgreSQL` e alguma `ORM` (preferencialmente `Sequelize`, mas pode ser outra que tenha mais familiaridade, como `Knex`, `Prisma` ou `TypeORM`) para o backend.
- O projeto deve ser acessível online, mas o deploy pode ser feito como achar melhor, não necessitando subir os contâineres.
- Para concluir, o projeto pode ser estendido com outras funcionalidades se desejar, como `autenticação de usuários` e `permissões de acesso`, `notificaçães por e-mail` ou `integração com outras ferramentas`, como o Google Agenda.
- Ponto extra para o uso de `Docker` (e `Docker Compose`) para empacotar e distribuir a aplicação.
###  O teste acima deve ser enviado até terça às 17h. por whats app e também para os e-mails:
1. lucas.rufino@olhar180.com.br
2. thiago.araujo@olhar180.com.br
3. kael.araujo@olhar180.com.br

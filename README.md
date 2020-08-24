# api-proffy

### Overview

 - Esta apresentas asseguintes funcionalidades.
 
 1 - Cadastro de Aula - Cria usuário, cria aula, cria horário
 2 - Busca Aula
 3 - Criar Nova Conexão
 3 - Listar Total de Conexões

 
 ### Detalhes
 
 - A aplicação foi desenvolvida em Nodejs 
 - O banco de Dados utilizado foi SQlite
 - Foi utilizado o Insomnia
 
  ### Requisitos

1 - nodeJS
 
  ### Executando
 
 - Baixar do projeto
 - Abrir com o projeto
 - start na aplicação

```
> npm start
```

## POST - Cadastro de Aula
```
http://localhost:3333/classes
```
```
{
    "name":"Ana Moraes",
    "avatar":"https://avatars2.githubusercontent.com/u/47642347?s=460&u=c9e1327f95cc1add7318b028f597022beea4bc53&v=4",
    "whatsapp":"92992052656",
    "bio": "Professor de Ingles",
    "subject": "ingles",
    "cost": 80,
    "schedule": [
        {"week_day": 1, "from": "8:00", "to": "12:00"}
    ]
}
```

## GET - Busca aula

```
http://localhost:3333/classes
```

```
week_day: 1
subject: Geografia
time: 11:00
```

## Post - Criar Nova Conexão

```
http://localhost:8081/projeto/perfil
```
```
{
    "user_id": 1
}
```

## GET - Listar Total de Conexões

```
http://localhost:3333/connections
```





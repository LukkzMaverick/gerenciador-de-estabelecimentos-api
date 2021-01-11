# gerenciador-de-estabelecimentos-api

- Repositório do Front-end: https://github.com/LukkzMaverick/gerenciador-de-estabelecimentos

# Pré-Requisitos

 - [Node JS](https://nodejs.org/en/)
 
## Getting Started

    npm install   
    npm start

## Instruções
- O banco de dados é o mongoDB, ele pode ser acessado através da nuvem com o mongoAtlas mas também pode ser acessado localmente, baixando o MongoDB Community Server e a configuração atual no .env já é a padrão do MongoDB: https://www.mongodb.com/try/download/community

## Considerações do projeto como um todo(front + back)
- Localização é um model independente mas foi atrelado a estabelecimento, da forma como foi feito, o usuário não precisa se preocupar em cadastrar localização, nem em removê-las, isso é feito por de trás dos panos quando ele mexe no estabelecimento. Isso deixou o site mais intuitivo e com melhor usabilidade. 
- Fiz a Busca dos estabelecimento por localização não através de uma string, mas sim com o usuário selecionando a localização desejada, através das listas de localização que possuem estabelecimento atreladas(pois as que não possuem são deletadas no controller).

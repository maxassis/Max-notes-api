# Max Notes API

**Back-end do projeto Max Notes**

Max Notes e um bloco de notas no estilo google keep, no qual as anotaçoes sao guardadas em cards estilo post-it.

o front-end da aplicação se encontra no repositorio 
https://github.com/maxassis/max-notes_front

<br>

## Tecnologias

**Typescript, class-validator, Zod, Nest e Node**

<br>

### Instruçoes para executar o projeto

na raiz do projeto instalar o docker com o postgres com o comando:
```
docker-compose up
```

depois instale as dependencias: 
```
npm install
```


em seguida crie as tabelas do banco de dados com:
```
npx prisma migrate dev
```
por fim execute o localhost com:
```
npm run start
```


<h1> 
     👀 Solve Ege
</h1>

<h3>
     Solve Ege - это Fullstack приложение, которое является аналогом образовательного портала для подготовки к экзаменам Решу ЕГЭ (https://ege.sdamgia.ru/). Front-end построен на React. Back-end использует библиотеку Express для работы API, который построен на архитектурном стиле REST. База данных PostgreSQL
</h3>



</br>



<h2>
  🛠️ Инструменты, которые использовались при разработке приложения:
</h2>

- Front-end:
     - JavaScript
     - React
- Back-end:
     - JavaScript
     - Express
     - PostgreSQL



</br>



<h2>
  🚀 Зпуск приложения:
</h2>

- `git clone https://github.com/ElishaFlacon/solve-ege.git`
- `cd solve-ege`
- Собираем front-end:
     - `cd client`
     - `npm install`
     - `npm audit fix` (если появились ошибки)
- Собираем back-end:
     - `cd client`
     - `npm install`
     - `npm audit fix` (если появились ошибки)
- Собираем базу данных:
     - устанавливаем postgresql https://www.postgresql.org/ (при разработке использовалась версия 15)
     - оставляем все значения по умолчанию
     - пароль устанавливаем root
     - переходим в папку с postgresql (по умаолчанию это C:\Program Files\PostgreSQL)
     - переходим в папку 15 (или, если у вас другая версия, то переходите в нее), затем в папку bin
     - запускаем powershell (слева в углу окна написано файл, нажмите, там будет запустить powershell)
     - `.\psql -U postgres`
     - вводим пароль root (при вводе пароль не будет отображаться, не пугайтесь)
     - `psql \! chcp 1251`
     - при вводе следующих команд может появляться ошибка: ошибка синтаксиса (примерное положение: "psql"), игнорируем ее и просто повторно вводим команду
     - `create database <название_базы_данных>;`
     - `\connect <название_базы_данных>;`
     - затем из файлика database.sql копируем все содержимое и вводим в консоль
     - `\dt` если появилась таблица, где в столбце "имя" находится faces и person - значит все прошло успешно
- Запуск:
     - создаем файлик .env в папке solve-ege/server
     - записываем в него значения указанные ниже
     ```
          APP_PORT=5000
          API_URL=http://localhost:5000
          CLIENT_URL=http://localhost:3000
          JWT_ACCESS=<любая_строка_с_помощью_нее_будет_создан_токен>
          JWT_REFRESH=<любая_строка_с_помощью_нее_будет_создан_токен>

          DB_NAME=<название_базы_данных>
          DB_USER=postgres (если меняли пользователя - то пишите свое название)
          DB_PASSWORD=root (если у вас другой пароль - то пишите свое значение)
          DB_PORT=5432 (если меняли порт при установке postgresql - то пишите свое значение)
          
          # прочитай про smtp и как его настроить, перед тем как записывать данные
          SMTP_HOST=<smtp_хост>
          SMTP_PORT=<smtp_порт>
          SMTP_USER=<твоя_почта>
          SMTP_PASSWORD=<smtp_пароль>
     ```
     - `cd client`
     - `npm start`
     - `cd server`
     - `npm start`
<h3>
    Запускаем, не работет, ура! 🗿🚬
</h3>



</br>



<h2>
 📺 Демо:
</h2>

- <a href="https://github.com/ElishaFlacon/solve-ege/assets/83610362/190b1a53-da7f-4409-89c4-450554fb2e13">Нажать чтобы демо!</a>
- <video src="https://github.com/ElishaFlacon/solve-ege/assets/83610362/190b1a53-da7f-4409-89c4-450554fb2e13" />




</br>



<h2>
⚡ Немного дополнительной информации:
</h2>

- На данный момент проект заморожен, в ближайшее время работа возобновится! 
- P.S. Все баги и недочеты - это фичи




<br/>
<br/>
<br/>
<br/>
<br/>
<br/>



<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=d179b8&height=64&section=footer"/>
</p>



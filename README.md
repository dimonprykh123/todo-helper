# todo-helper
Проект був написаний з метою навчитися : стренню сервера за допомогою Node.js та його бібліотеки express , написанню телеграм бота за допомогою пакету Telegraf , 
та покращенню навичок у розрозробці клієнтської частини.
Намагався вигрузити на хостинг Heroku тому зробив деякий рефакторинг коду.
Для того щоб запустити код н алокальній машині необхідно : 
1)Створити свій власний кластер mongoDB та підключити його у файлах app.js(на серверній чатині) та telega-bot.js ;
2)Створити власний telegram-bot token ;
3)У всіх запитах у файлах змінити URI з Heroku на /api/...;
4)у кожному підпроекті запустити в командному ряжку скрипт "npm i";
5)викоритстати скрипти ввімкнення серверу;
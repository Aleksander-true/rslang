# rslang
Приложение для изучения слов английского языка. Приложение состоит из:
- учебника содержащего 3600 слов разбитых на 6 уровней сложности от A1(Starter) до С1(Advanced). Учебник основной инструмент для изучения новых слов. На страницу выводится по 20 слов, при выборе слова можно увидеть на левой панели его перевод, транскрипцию и аудиозапись произношения, перевод слова, картинку для ассоциативного запоминания слова. А также определения слова и пример использования слова в предложении для запоминания слова в контексте. При авторизации пользователятля также доступно отмечать свой прогресс по изученным словам и помечать слова как "Сложные", для составления своего личного словаря слов для изучения (раздел сложные слова у авторизированных пользователей).
- игры Спринт - создана для повторения и отработки слов в интерактивной, игровой форме. При запуске игры со страницы учебника игра проводится с этими словами (кроме слов помеченный как выученные). После трёх правильных ответов слово считается изученным и помечается в учебнике как выученное. 
- игра Аудиовызов - сделана для отработки навыка аудирования, т.е. узнавания слова на слух. Идеология работы игры такая-же как спринт. ри запуске игры со страницы учебника игра проводится с этими словами и после трёх правильных ответов слово считается изученным.
- Существует статистика для отслеживания прогресса изучения слов и процента правильных ответов.
_______

## Команда
- Александр Серяпин - https://github.com/Aleksander-true
- Элина Непомнящая - https://github.com/elina-nep
- Алексей Шишко - https://github.com/alexshyshko

## Сайт развёрнут по адресу
https://rslang-team-9-2022.netlify.app/

## Серверная часть с базой данных
https://rslang-app-team-9.herokuapp.com/

## Используемые технологии и библиотеки
- Сreate-react-app - была выбрана для упрощения создания SPA, в том числе игр и учебника. Преимущества выбранной библиотеки: встроенный и настроенный билдер, что сокращает время на старте; Язык JSX - для уменьшения кодовой базы и более наглядного кода; встроенные эффективные методы рендеринга. Недостатки: необходимость осваивать новый для команды синтаксис и идеологию (никто до этого не писал на React)
- typescript - была выбрана для уменьшения ошибок и ошибок интеграции модулей в задаче. 
- react-router-dom v6 - библиотека для создания ротинга в приложении. Премущества: быстрый старт, ушло 2 часа, чтобы разобраться и реализовать роутинг в приложении; возможность работать с поисковыми запросами (quewery); простая интеграция с Сreate-react-app. Недостатки: В 6 версии произошли некоторые изменения с предыдущими, например нет доступа к методам History, что немного усложнило написание функции проверки с какой страницы был переход в игру. Также версия относительно свежая и мало разбора готовых решений в основном представлены для предыдущих версий.
- react-player - размещения видео на главной странице, был выбран в основном т.к. поддерживает "Ленивую" загрузку видео с ютьюб. Преимущества: быстрый старт, простая интеграция. Поддерживает почти все форматы видео; много настроек позволяющих гибко настроить поведение в частности в проекте используется ленивая загрузка при которой на страницу выводится только картинка превью, а после клика по ней грузится сам плеер и видео с ютьюб. Недостатки: Из-за большого количества настроек, примеры проилюстрированны не для всех случаев, нужно немного времени поэкспериментировать.
- bootstrap - CSS фреймворк для быстрого заполнения стилей. Использовался только для стилей без встроенных компонентов, и в большинстве случаев использовался на первом этапе проверки функциональности (чтобы не тратить время на стили),  а далее заменялся индивидуальными стилями. Достоинства: простое добавление стилей; множество готовых примеров, которые можно копировать целиком. Недостатки: не поддерживает БЭМ (недостаток для нашего проекта); все стили написаны с селектором Important, что не позволяет перезаписывать часть стилей, приходится переписывать целиком.
- bootstrap-icons - библиотека иконок. Использовалась из-за возможности вставлять иконки как шрифты. Достоинство: быстрый стар; несколько вариантов добавления на страницу в том числе как шрифт, что позволяет легко управлят цветом и размером иконок; оптимальный набор иконок, не слишком много не мало. Недостатки: нет, к требованиям нашего проекта подходит идеально.
-  react-full-screen - подключена для реализации полноэкранного режима в играх. По данным статистики https://www.npmtrends.com/react-full-screen-vs-react-fullscreen-vs-react-fullscreen-crossbrowser-vs-react-fullscreenable наиболее используемая библиотка для полноэкранного режима в react-приложениях. Достоинства: легкая, простая интеграция, возможность выносить элементы управления в отдельные компоненты. Недостатки: не работает с классовыми компонентами.
-  react-circular-progressbar - реализация кроговой диаграммы в статистике, визуализация таймера обратного отсчета в игре Спринт. Достоинства: простая интеграция, возможность настройки плавной анимации, широкие возможности кастомизации, небольшой размер, типизация. Недостатки: сложности при настройке стилей через css.
-  victory - библиотека для отрисовки графиков, использовалась на странице статистики. Достоинства: мощная система визуализации данных, широкие возможности кастомизации, понятный и подробный официальный гайд. Недостатки: немного излишний функционал для наших задач.
-  web-vitals

## Доступные скрипты

Находясь в папке приложения вы можете запустить:

### `npm start`

Запуск приложения в режиме "разработка"
Открывается на странице [http://localhost:3000](http://localhost:3000) вашего браузера по умолчанию.

При изменении кода, страница обновляется автоматически
В консоль выводятся ошибки линтера.

### `npm run build`

Собирает приложение в папку `build`
Билд оптимизирован и готов к разворачиванию на сервере.

Более подробную информацию можно посмотреть на [deployment](https://facebook.github.io/create-react-app/docs/deployment)

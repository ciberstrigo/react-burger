# Yandex Practicum project - Stellar Burgers.

Проект создан с помощью [Create React App](https://github.com/facebook/create-react-app) в рамках обучения в Яндекс.Практикуме по факультету "react разработчик".

## Production
https://paypalme30000usd.nomoredomainsrocks.ru/

## Доступные скрипты

### `npm start` 
Запустить приложение. Оно будет доступно по адресу [http://localhost:3000](http://localhost:3000).  
### `npm test`   
Запустить тесты редьюсеров.  
### `npm run test:cypress`  
Запустить E2E тестирование (прокликивание в браузере).
### `npm run deploy`   
Скрипт загрузки билда (пребилдится при выполнении) на продакшн - Яндекс.Облако.
### `npm run gh-deploy`  
Скрипт загрузки билда на github pages.   
**Внимание!** Чтобы скрипт корректно работал, необходимо отредактировать homepage в package.json и указать в нём ссылку по которой будет доступен проект на github pages. В противном случае файлы ассетов по генерируемым ссылками будут недоступны. 
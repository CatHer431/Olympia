# Отель "Toxin". Бронирование номеров в отеле.

SPA приложение с клиент-серверной архитектурой.
1. Разработал Авторизацию/Регистрацию, JWT.
2. Личный кабинет пользователя(забронированные номера, лайки,
избранное) с возможностью редактирования.
3. Панель администратора (Таблица номеров с выпадающим списком
бронирований для каждого номера, отмена бронирования,
редактирование номера)
4. Страница с доступными номера ( Поиск, Сортировка, Фильтрация,
Пагинация).
5. Страница номера ( Возможность забронировать номер, оставить отзыв,
система лайков, рейтинг номера).

# Админ Login/Password: admin@mail.ru, Test1234
# deploy: https://secret-mesa-68506.herokuapp.com/rooms


# Запуск проекта локально(временное решение) 🔥🔥🔥
```
cd client -> npm start
cd server -> npm run serve
change apiEndPoint -> client/config.json = {"apiEndPoint": "http://localhost:8080/api"}
```


# Стек технологий
- React, Typescript
- React-Redux, Redux Toolkit
- SASS, MUI
- NodeJS, Express, MongoDB
- Docker

![Screenshot](./screenshots/main-page.png)

# Реализовано

- Авторизация и регистрация

![Screenshot](./screenshots/sign-in.png)
![Screenshot](./screenshots/sign-up.png)

- Страница с доступными номера ( Поиск, Сортировка, Фильтрация, Пагинация)

![Screenshot](./screenshots/rooms-page-full.png)
![Screenshot](./screenshots/rooms-skeleton.png)

- Страница номера (Забронировать, лайк комментария, оставить отзыв могут только авторизованные пользователи)

![Screenshot](./screenshots/room-page.png)

- Меню и страница пользователя

![Screenshot](./screenshots/user-page.png)

- Панель администратора, меню, страница администратора

![Screenshot](./screenshots/admin-page.png)

- Панель администратора(Список бронирований для каждого номера, отмена бронирования, страница пользователя, кто забронировал номер).

![Screenshot](./screenshots/admin-panel-room.png)


- Страница редактирования пользователя

![Screenshot](./screenshots/Edit-profile.png)


- Возможность оставить отзыв для номера, система лайков, рейтинг.  

![Screenshot](./screenshots/comments.png)

- Страница редактирования номера( only user role is Admin )  

![Screenshot](./screenshots/edit-room.png)

- Страницы: Мои Бронирования, Понравилось, Избранное.  

![Screenshot](./screenshots/my-booking.png)
![Screenshot](./screenshots/my-favorite-room.png)
![Screenshot](./screenshots/my-likes.png)

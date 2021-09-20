# API-ecommerce-admin-CMS

This project is the backend API for ecommerce admin cms.

...

## How to run

-   clone the project and go inside the root folder
-   run `npm install`
-   run `npm run dev`, install `npm i nodemon` if you don't have already

## APIS

All the api will follow the following path `${routeUrl}` i.e., http://localhost

...

## User API

All user api will follow the following endpoint `${router}/api/v1/user`

| #   | API                   | METHOD | DESCRIPTION                                                             |
| --- | --------------------- | ------ | ----------------------------------------------------------------------- |
| 1   | '/'                   | POST   | Expects the user info object and creates user in DB and returns message |
| 2   | '/email-verification' | POST   | Expects user's info object and check if the link is valid or not        |

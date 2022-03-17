# Fullstack Challenge
Welcome to our little challenge! :wave:

## Setup
1. Please fork this repository
2. You will need to have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed
3. To start the Frontend + API + DB run:
    ```shell
    $ docker-compose up
    ```
4. If you install a new package for the frontend, you will need to stop the docker-compose and rebuild the frontend:
    ```shell
    $ docker-compose build frontend
    ```

## Challenge
You will need to create full deployment of a NextJS frontend + FastAPI API + MySQL DB.

You'll find a `challenge_companies.json` and `challenge_deals.json` in the root of this repository.

1. Import the Data from the `JSON files` to the `MySQL DB`
2. Create a `GET` endpoint in the `FastAPI` for both resources
3. Display the `companies` and their `deals` with their information in the `NextJS ` frontend

- `companies` have a 1 to N relationship with `deals`
  - e.g. 1 `company` can have N `deals`
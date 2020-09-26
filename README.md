# Installation

Copy .env.example to .env and change any locally needed variables

    docker-compose up -d

# Laravel

Laravel handles back end as a stateless API

Copy the `.env.example` to `.env` and change any required values

Run the following

    composer install
    php artisan key:generate
    php artisan cache:clear

Note: Due to the front end being written by stenciljs, anything in the `/public` directory will be wiped anytime the front end is rebuilt.  If there are any assets that must be publicly available and persisted they should be placed in the `/public-laravel` directory, which gets copied into `/public` as part of the front end build process.  The storage link is persisted in the front end build process, so storage is unaffected.

# Stencil

Stenciljs is the front end, it compiles into the public dir of laravel

For development with hot-reloading components

Log into the container:

    docker exec -it laravel8stencil_webserver bash

    cd ../stencil

If installing for the first time: `npm install`

    cp .env.example .env
    npm start

Visit http://localhost:3333 (or alternate port if specified in .env)

# Front End Config

Stencil has a .env file to hold environment variables such as API urls and public keys

Note: the .env file is used at build time, it is not read live.  If values are changed in the .env file the front end needs to be rebuilt for the changes to go into effect.

.env variables can only be read in the `config.service.ts` file

eg.

    API_URL=http://mbeckett.desktop

In the .env replace `process.env.API_URL` in the config.service.ts file

    constructor() {
        this.values = {
            API_URL: process.env.API_URL
        };
    }

To access these variables anywhere else in the codebase import the config service and use the get method

    import { ConfigService } from '../../services/config.service';

    const apiUrl = ConfigService.get('API_URL');


# Production Build

To build the front end for production, with optimized code and pre-rendering, there is a laravel artisan command that unlinks the public storage, triggers the build (which wipes out the public dir) then re-links the storage.

    php artisan deploy:frontend
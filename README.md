# Library-App REST-API

This is a simple API for library app using node.js

## Getting Started

Install all this package on your global dependencies

npm init
npm install --save express
npm install --save-dev nodemon
npm install --save body-parser
npm install --save sequelize
npm install --save-dev sequelize-cli
npm install --save mysql2
npm install --save cors
npm install --save jsonwebtoken
npm install --save bcryptjs
npm install --save morgan

// to generate folder /config, /migrations, /models, /seeders
npx sequelize-cli init

// to create table
npx sequelize-cli model:generate --name (tb_name) --attributes field1:(data_type),field2:(data_type)

// insert table into database
npx sequelize-cli db:migrate

## Deployment

Add additional notes about how to deploy this on a live system

## Versioning

git repository (https://github.com/algol007/arkademy-week3)

## Authors

- **Ady Rahmansyah** - _Arkademy Batch 15_ - [Ady Rahmansyah](https://github.com/algol007)

## License

This project is licensed under the AR License - see the [LICENSE](https://www.instagram.com/ady_rahmansyah/) for details

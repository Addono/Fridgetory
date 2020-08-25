# Fridgetory

<div align="center">
  <img src="./docs/imgs/screenshot.jpg" width="300px" />
  <p>A small web-app to track the things in your freezer!</p>
</div>

## Demo

You can find a demo-deployment [here](https://fridgetory.now.sh). It's deployed to [Vercel](https://vercel.com) and a Postgres database provided by [AlwaysData](https://alwaysdata.com).

_Note: This demo deployment uses a free-tier database with a limited amount of connections (10), the serverless nature of Vercel might exhaust this limit when deploying frequently or with a surge of users. For production deployments it is recommended to use a different pool of connections for production and preview deployments and support more database connections._

## Getting Started

Install dependencies:

```bash
yarn
```

Prepare environment variables, the defaults should work fine if you are going to use Docker Compose in the next step.

```bash
cp prisma/.env.template prisma/.env
```

Start a Postges database:

```bash
docker-compose up -d
```

Run database migrations and generate the client:

```bash
yarn prisma:migrate && yarn prisma:generate
```

Generate and watch for changed made by Nexus:

```bash
yarn nexus:reflection
```

Then to run the development server in a different shell:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Heroku

We support one-click deployments using Heroku. Go on, try it!

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/Addono/Fridgetory/tree/main)

### Vercel

If you want to deploy using Vercel, you will need to provision a Postgres database yourself.

First create your database and migrate it. Only Postgres has been tested, however any database supported by Prisma 2 should work. Run the migrations using:

```bash
DATABASE_URL=postgresql://[user[:password]@][netloc][:port][/dbname] yarn prisma:migrate
```

Then create your project on Vercel by running a deployment:

```bash
vercel
```

Then add the database as an environment variable to Vercel, enter the database url in the input field when asked:

```bash
vercel env add fridgetory-database-url production
```

Then re-deploy such that the newly added environment variables take effect:

```bash
vercel --prod
```

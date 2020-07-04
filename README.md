# Fridgetory

<div align="center">
  <img src="./docs/imgs/screenshot.jpg" width="300px" />
</div>

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

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Vercel

If you want to deploy using Vercel, you will need to provision a Postgres database yourself.

First, add the database as a secret:

```bash
vercel secrets add fridgetory-database-url VALUE_OF_YOUR_DATABASE_LOCATION_HERE
```

Then deploy:

```bash
vercel --prod
```

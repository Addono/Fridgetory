# Fridgetory

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
yarn nexus:reflect
```

Then to run the development server in a different shell:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

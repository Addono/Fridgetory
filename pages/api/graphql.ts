import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../graphql/schema'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const server = new ApolloServer({
  context: () => ({ prisma }),
  schema,
  introspection: true,
  playground: process.env.NODE_ENV !== 'production',
})

const handler = server.createHandler({
  path: '/api/graphql',
})

// dont parse the body, next. apollo got this
export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler

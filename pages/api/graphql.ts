import app, { server } from 'nexus'

import '../../graphql/schema'

app.settings.change({
  server: {
    path: '/api/graphql',
  },
})

app.assemble()

export default server.handlers.graphql

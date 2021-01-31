import { queryType, mutationType, objectType, makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'

import * as path from 'path'

export const schema = makeSchema({
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: require.resolve('.prisma/client/index.d.ts'),
        alias: 'prisma',
      },
    ],
  },
  outputs: {
    typegen: path.join(process.cwd(), 'node_modules/@types/nexus-typegen/index.d.ts'),
    schema: path.join(process.cwd(), 'api.graphql'),
  },
  types: [
    queryType({
      definition: (t) => {
        t.crud.product()
        t.crud.products()
        t.crud.productType()
        t.crud.productTypes()
        t.crud.item()
        t.crud.items({ ordering: { createdAt: true } })
        t.crud.place()
        t.crud.places()
      },
    }),

    mutationType({
      definition: (t) => {
        t.crud.createOneProduct()
        t.crud.createOneProductType()
        t.crud.createOneItem()
        t.crud.createOnePlace()
        t.crud.updateOnePlace()
        t.crud.updateOneProductType()
        t.crud.deleteOneItem()
        t.crud.deleteOnePlace()
        t.crud.deleteOneProduct()
      },
    }),

    objectType({
      name: 'ProductType',
      definition: (t) => {
        t.model.id()
        t.model.name()
      },
    }),

    objectType({
      name: 'Product',
      definition: (t) => {
        t.model.id()
        t.model.productType()
        t.model.items({ ordering: { createdAt: true } })
      },
    }),

    objectType({
      name: 'Item',
      definition: (t) => {
        t.model.id()
        t.model.quantity()
        t.model.unit()
        t.model.product()
        t.model.createdAt()
      },
    }),

    objectType({
      name: 'Place',
      definition: (t) => {
        t.model.id()
        t.model.name()
        t.model.products()
      },
    }),
  ],
})

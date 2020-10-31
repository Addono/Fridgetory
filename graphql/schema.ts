import { queryType, mutationType, objectType, makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'

export const schema = makeSchema({
  plugins: [
    nexusPrisma({
      experimentalCRUD: true,
    }),
  ],
  typegenAutoConfig: {
    contextType: '{ prisma: PrismaClient.PrismaClient }',
    sources: [{ source: '.prisma/client', alias: 'PrismaClient' }],
  },
  outputs: {},
  types: [
    queryType({
      definition: (t) => {
        t.crud.product()
        t.crud.products()
        t.crud.productType()
        t.crud.productTypes()
        t.crud.item()
        t.crud.items()
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
        t.model.items()
      },
    }),

    objectType({
      name: 'Item',
      definition: (t) => {
        t.model.id()
        t.model.quantity()
        t.model.unit()
        t.model.product()
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

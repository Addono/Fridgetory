import { use } from 'nexus'
import { prisma } from 'nexus-plugin-prisma'
import { schema } from 'nexus/dist'

use(prisma({ features: { crud: true } }))

schema.queryType({
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
})

schema.mutationType({
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
})

schema.objectType({
  name: 'ProductType',
  definition: (t) => {
    t.model.id()
    t.model.name()
  },
})

schema.objectType({
  name: 'Product',
  definition: (t) => {
    t.model.id()
    t.model.productType()
    t.model.items()
  },
})

schema.objectType({
  name: 'Item',
  definition: (t) => {
    t.model.id()
    t.model.quantity()
    t.model.unit()
    t.model.product()
  },
})

schema.objectType({
  name: 'Place',
  definition: (t) => {
    t.model.id()
    t.model.name()
    t.model.products()
  },
})

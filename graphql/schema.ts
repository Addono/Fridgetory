import {use} from 'nexus'
import {prisma} from 'nexus-plugin-prisma'
import {schema, server} from "nexus/dist";

use(prisma())

schema.queryType({
    definition(t) {
        t.crud.product()
        t.crud.products({
            ordering: true,
        })
        t.crud.item()
        t.crud.items()
        t.crud.place()
        t.crud.places()
    },
})

schema.mutationType({
    definition(t) {
        t.crud.createOneProduct()
        t.crud.createOneItem()
        t.crud.createOnePlace()
    }
})

schema.objectType({
    name: 'Product',
    definition: (t) => {
        t.model.id()
        t.model.name()
    },
})

schema.objectType({
    name: 'Item',
    definition: (t) => {
        t.model.id()
        t.model.quantity()
        t.model.unit()
        t.model.product()
        t.model.place()
    }
})

schema.objectType({
    name: "Place",
    definition: (t) => {
        t.model.name()
        t.model.items()
    }
})
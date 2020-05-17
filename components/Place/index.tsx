import { Card, Divider } from "antd";

import { gql, useMutation } from "@apollo/client";

import { Product, QUERY_PLACES } from "../Places";
import AddProduct from "../AddProduct";
import Items from "../Items";
import { EditableTitle } from "../EditableTitle";

const MUTATION_EDIT_NAME_FOR_PLACE = gql`
  mutation EditNameForPlace($name: String!, $id: Int!) {
    updateOnePlace(where: { id: $id }, data: { name: $name }) {
      id
    }
  }
`;

const MUTATION_DELETE_PLACE = gql`
  mutation DeletePlace($id: Int!) {
    deleteOnePlace(where: { id: $id }) {
      id
    }
  }
`;

const Title = ({ name, id }: { name: string; id: number }) => {
  const [setNameMutation] = useMutation(MUTATION_EDIT_NAME_FOR_PLACE, {
    refetchQueries: [{ query: QUERY_PLACES }],
  });
  const [deletePlace] = useMutation(MUTATION_DELETE_PLACE, {
    refetchQueries: [{ query: QUERY_PLACES }],
  });

  return (
    <EditableTitle
      name={name}
      setName={(name) => setNameMutation({ variables: { name, id } })}
      onDelete={() => deletePlace({ variables: { id } })}
    />
  );
};

const Place = ({
  id,
  name,
  products,
}: {
  id: number;
  name: string;
  products: Product[];
}) => (
  <Card title={<Title name={name} id={id} />} style={{ width: "100%" }}>
    {products.map(({ id, items, productType: { name } }) => (
      <Items productId={id} key={name} name={name} items={items} />
    ))}
    <Divider />
    <AddProduct placeId={id} existingProducts={products} />
  </Card>
);

export default Place;

import { createBaseModel, mapDbRow, mapPayload } from './baseModel.js';

const productRowMapper = (row) => {
  const mapped = mapDbRow(row);
  mapped._id = row.id;
  mapped.id = row.id;
  return mapped;
};

const productPayloadMapper = (payload) => {
  const mapped = mapPayload(payload, { _id: 'id' });
  if (payload._id && !mapped.id) mapped.id = payload._id;
  if (payload.id && !mapped.id) mapped.id = payload.id;
  return mapped;
};

const Product = createBaseModel({
  table: 'products',
  rowMapper: productRowMapper,
  payloadMapper: productPayloadMapper,
});

export default Product;

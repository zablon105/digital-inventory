import { createBaseModel, mapDbRow, mapPayload } from './baseModel.js';

const orderRowMapper = (row) => {
  const mapped = mapDbRow(row, {
    user_id: 'user',
    order_items: 'orderItems',
    shipping_address: 'shippingAddress',
    payment_method: 'paymentMethod',
    payment_result: 'paymentResult',
    items_price: 'itemsPrice',
    tax_price: 'taxPrice',
    shipping_price: 'shippingPrice',
    total_amount: 'totalAmount',
    is_paid: 'isPaid',
    paid_at: 'paidAt',
    is_delivered: 'isDelivered',
    delivered_at: 'deliveredAt',
  });
  mapped._id = row.id;
  mapped.id = row.id;
  return mapped;
};

const orderPayloadMapper = (payload) => {
  const mapped = mapPayload(payload, {
    _id: 'id',
    user: 'user_id',
    orderItems: 'order_items',
    shippingAddress: 'shipping_address',
    paymentMethod: 'payment_method',
    paymentResult: 'payment_result',
    itemsPrice: 'items_price',
    taxPrice: 'tax_price',
    shippingPrice: 'shipping_price',
    totalAmount: 'total_amount',
    isPaid: 'is_paid',
    paidAt: 'paid_at',
    isDelivered: 'is_delivered',
    deliveredAt: 'delivered_at',
  });
  if (payload._id && !mapped.id) mapped.id = payload._id;
  if (payload.id && !mapped.id) mapped.id = payload.id;
  return mapped;
};

const Order = createBaseModel({
  table: 'orders',
  rowMapper: orderRowMapper,
  payloadMapper: orderPayloadMapper,
});

export default Order;

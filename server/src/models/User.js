import bcrypt from 'bcryptjs';
import { createBaseModel, mapDbRow, mapPayload } from './baseModel.js';

const userRowMapper = (row) => {
  const mapped = mapDbRow(row);
  mapped._id = row.id;
  mapped.id = row.id;
  return mapped;
};

const userPayloadMapper = (payload) => {
  const mapped = mapPayload(payload, { _id: 'id' });
  if (payload._id && !mapped.id) mapped.id = payload._id;
  if (payload.id && !mapped.id) mapped.id = payload.id;
  return mapped;
};

const User = createBaseModel({
  table: 'users',
  rowMapper: userRowMapper,
  payloadMapper: userPayloadMapper,
});

const BaseModelPrototypeSave = User.prototype.save;

User.prototype.matchPassword = async function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

User.prototype.save = async function save() {
  if (this.password && !this.password.startsWith('$2')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  return BaseModelPrototypeSave.call(this);
};

export default User;

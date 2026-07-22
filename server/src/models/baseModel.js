import { randomUUID } from 'crypto';
import { createOrUpdateRecord, deleteRecord, getAllRows } from '../config/db.js';

const normalizeValue = (value) => {
  if (value === null || value === undefined) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      return parsed;
    } catch {
      return value;
    }
  }
  return value;
};

const toCamelCase = (value) => value.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

const toSnakeCase = (value) => value.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();

export const mapDbRow = (row, fieldMap = {}) => {
  const result = {};
  Object.entries(row).forEach(([key, value]) => {
    const mappedKey = fieldMap[key] || toCamelCase(key);
    result[mappedKey] = normalizeValue(value);
  });
  return result;
};

export const mapPayload = (payload, fieldMap = {}) => {
  const result = {};
  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined) return;
    const mappedKey = fieldMap[key] || toSnakeCase(key);
    result[mappedKey] = value;
  });
  return result;
};

export const matchesCriteria = (record, criteria = {}) => {
  return Object.entries(criteria).every(([key, expected]) => {
    const actual = record[key];

    if (expected && typeof expected === 'object' && !Array.isArray(expected)) {
      if (expected.$regex) {
        const regex = new RegExp(expected.$regex, expected.$options || 'i');
        return regex.test(actual ?? '');
      }
      if (expected.$gte !== undefined) {
        return actual >= expected.$gte;
      }
      if (expected.$lte !== undefined) {
        return actual <= expected.$lte;
      }
      if (expected.$ne !== undefined) {
        return actual !== expected.$ne;
      }
      if (expected.$in) {
        return expected.$in.includes(actual);
      }
    }

    return actual === expected;
  });
};

export class QueryBuilder {
  constructor(model, criteria = {}, options = {}) {
    this.model = model;
    this.criteria = criteria;
    this.sortConfig = null;
    this.limitValue = null;
    this.skipValue = 0;
    this.populatePath = null;
    this.populateSelect = null;
    this.projection = null;
    this.single = Boolean(options.single);
  }

  select(fields) {
    this.projection = fields;
    return this;
  }

  sort(sortConfig) {
    this.sortConfig = sortConfig;
    return this;
  }

  limit(limitValue) {
    this.limitValue = limitValue;
    return this;
  }

  skip(skipValue) {
    this.skipValue = skipValue;
    return this;
  }

  populate(path, select) {
    this.populatePath = path;
    this.populateSelect = select;
    return this;
  }

  async exec() {
    return this.model._executeQuery(this.criteria, this.sortConfig, this.limitValue, this.skipValue, this.populatePath, this.populateSelect, this.projection, this.single);
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }

  finally(onFinally) {
    return this.exec().finally(onFinally);
  }
}

export const createBaseModel = ({ table, rowMapper, payloadMapper }) => {
  class BaseModel {
    static table = table;
    static rowMapper = rowMapper;
    static payloadMapper = payloadMapper;

    constructor(data = {}) {
      Object.assign(this, data);
      this._id = this._id || this.id || null;
      this.id = this.id || this._id || null;
    }

    async save() {
      const payload = this.constructor.payloadMapper(this);
      const id = this.id || this._id || randomUUID();
      const fields = Object.keys(payload);
      if (!fields.length) {
        this.id = id;
        this._id = id;
        return this;
      }

      const row = await createOrUpdateRecord(this.constructor.table, { ...payload, id });
      if (row) {
        const mapped = this.constructor.rowMapper(row);
        Object.assign(this, mapped);
        this.id = mapped.id || id;
        this._id = mapped._id || id;
      }
      return this;
    }

    async deleteOne() {
      await deleteRecord(this.constructor.table, this.id || this._id);
      return true;
    }

    async populate(path, select) {
      if (path === 'user' && this.user && typeof this.user === 'string') {
        const { default: User } = await import('./User.js');
        const user = await User.findById(this.user);
        if (user) {
          const selected = select ? select.split(/\s+/).filter(Boolean) : [];
          const userData = { ...user };
          if (selected.length) {
            selected.forEach((field) => {
              if (field.startsWith('-')) {
                delete userData[field.slice(1)];
              }
            });
          }
          userData._id = user.id;
          this.user = userData;
        }
      }
      return this;
    }

    static _applyProjection(record, projection) {
      if (!projection) return record;
      const fields = projection.split(/\s+/).filter(Boolean);
      const result = { ...record };
      const includeFields = fields
        .filter((field) => !field.startsWith('-'))
        .map((field) => field.replace(/^\+/, ''));
      const excludeFields = fields
        .filter((field) => field.startsWith('-'))
        .map((field) => field.slice(1));
      if (includeFields.length) {
        Object.keys(result).forEach((field) => {
          if (!includeFields.includes(field)) {
            delete result[field];
          }
        });
      }
      excludeFields.forEach((field) => {
        delete result[field];
      });
      return result;
    }

    static async _executeQuery(criteria = {}, sortConfig = null, limitValue = null, skipValue = 0, populatePath = null, populateSelect = null, projection = null, single = false) {
      const rows = await this._fetchAll(criteria, projection);
      let records = rows.map((row) => new this(row));

      if (sortConfig) {
        records = [...records].sort((a, b) => {
          const entries = Object.entries(sortConfig);
          for (const [field, direction] of entries) {
            const left = a[field];
            const right = b[field];
            if (left === right) continue;
            return (left > right ? 1 : -1) * (direction === -1 ? -1 : 1);
          }
          return 0;
        });
      }

      if (skipValue) {
        records = records.slice(skipValue);
      }
      if (limitValue) {
        records = records.slice(0, limitValue);
      }

      if (populatePath && records.length) {
        await Promise.all(records.map((record) => record.populate(populatePath, populateSelect)));
      }

      return single ? (records[0] || null) : records;
    }

    static async _fetchAll(criteria = {}, projection = null) {
      const rows = await getAllRows(this.table);
      const mappedRows = rows.map((row) => this.rowMapper(row)).filter((row) => matchesCriteria(row, criteria));
      return projection ? mappedRows.map((row) => this._applyProjection(row, projection)) : mappedRows;
    }

    static find(criteria = {}) {
      return new QueryBuilder(this, criteria);
    }

    static findOne(criteria = {}) {
      return new QueryBuilder(this, criteria, { single: true });
    }

    static findById(id) {
      return new QueryBuilder(this, { id }, { single: true });
    }

    static async countDocuments(criteria = {}) {
      const rows = await this._fetchAll(criteria);
      return rows.length;
    }

    static async create(payload) {
      const instance = new this(payload);
      await instance.save();
      return instance;
    }

    static async findByIdAndUpdate(id, update) {
      const instance = await this.findOne({ id });
      if (!instance) return null;
      Object.assign(instance, update);
      await instance.save();
      return instance;
    }
  }

  return BaseModel;
};

import ajv from 'ajv';
import addFormats from 'ajv-formats';
import schema from './schema.json';

const validator = new ajv({ useDefaults: true, coerceTypes: true });
addFormats(validator);

const validate = validator.compile(schema);

export { schema, validate };
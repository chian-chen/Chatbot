import mongoose from 'mongoose';
import { randomUUID } from 'crypto';

const Schema = mongoose.Schema;
// Creating a schema, sort of like working with an ORM
const TemplateSchema = new Schema({
  prompt: {
    type: String,
    required: [true, 'prompt field is required.'],
    unique: [true, 'prompt field should be unique']
  },
  key: {
    type: String,
    required: [true, 'key field is required.'],
    unique: [true, 'key field should be unique'],
    default: () => randomUUID()
  },
  cls: {
    type: Number,
    default: -1,
    // required: [false, 'class field is not required.']
  },
  mes1: {
    type: String,
    default: '',
    // required: [false, 'mes field is not required.']
  },
  mes2: {
    type: String,
    default: '',
    // required: [false, 'mes field is not required.']
  },
  mes3: {
    type: String,
    default: '',
    // required: [false, 'mes field is not required.']
  },
  mes4: {
    type: String,
    default: '',
    // required: [false, 'mes field is not required.']
  },
  act1: {
    type: String,
    default: '',
    // required: [false, 'act field is not required.']
  },
  act2: {
    type: String,
    default: '',
    // required: [false, 'act field is not required.']
  },
  act3: {
    type: String,
    default: '',
    // required: [false, 'act field is not required.']
  },
  act4: {
    type: String,
    default: '',
    // required: [false, 'act field is not required.']
  }
});

// Creating a table within database with the defined schema
const Template = mongoose.model('template', TemplateSchema);

// Exporting table for querying and mutating

export default Template;
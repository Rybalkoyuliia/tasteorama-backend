import { model, Schema } from 'mongoose';
import { saveErrorHandler, setUpdateSettings } from './hooks.js';

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      maxlength: 64,
      required: true,
    },
    description: {
      type: String,
      maxlength: 200,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      min: 1,
      max: 360,
    },
    calories: {
      type: Number,
      min: 1,
      max: 10000,
    },
    category: {
      type: String,
      ref: 'Category',
      required: true,
    },
    ingredients: [
      {
        id: {
          type: String,
          ref: 'Ingredient',
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
    instructions: {
      type: String,
      required: true,
      maxlength: 1200,
    },
    thumb: {
      type: String,
      maxlength: 255,
    },
    owner: {
      type: String,
      ref: 'users',
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);
recipeSchema.post('save', saveErrorHandler);
recipeSchema.pre('findOneAndUpdate', setUpdateSettings);
export const recipesSortFields = ['Category', 'Ingredient'];

export const Recipe = model('Recipe', recipeSchema);

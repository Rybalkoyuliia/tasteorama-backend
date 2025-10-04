import mongoose from 'mongoose';
import { getEnvVar } from './utils/getEnvVar.js';
import { Ingredient } from './db/models/Ingredient.js';
import { Recipe } from './db/models/Recipe.js';
const user = getEnvVar('MONGODB_USER');
const pwd = getEnvVar('MONGODB_PASSWORD');
const url = getEnvVar('MONGODB_URL');
const db = getEnvVar('MONGODB_DB');
const MONGO_URI = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;

const migrate = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to DB');

  const ingredients = await Ingredient.find();

  for (const ing of ingredients) {
    // старий рядковий _id
    const oldId = ing._id;
    const newId = new mongoose.Types.ObjectId();

    // створюємо новий документ з новим _id
    await Ingredient.updateOne(
      { _id: oldId },
      { $set: { _id: newId } },
      { upsert: false },
    );

    // оновлюємо всі рецепти, де цей інгредієнт використовується
    await Recipe.updateMany(
      { 'ingredients.id': oldId },
      { $set: { 'ingredients.$[elem].id': newId } },
      { arrayFilters: [{ 'elem.id': oldId }] },
    );

    console.log(`Migrated ingredient ${oldId} → ${newId}`);
  }

  console.log('Migration finished!');
  await mongoose.disconnect();
};

migrate().catch(console.error);

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import { initialProjects, initialSkills, initialExperiences } from './initialData.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config(); // fallback to current working directory

const seedDatabase = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.trim() === '') {
    console.error('❌ MONGODB_URI is not set in backend/.env. Please configure it before running seed.');
    process.exit(1);
  }

  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB. Clearing existing collections...');

    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Experience.deleteMany({});

    console.log('🌱 Seeding Projects...');
    await Project.insertMany(initialProjects);

    console.log('🌱 Seeding Skills...');
    await Skill.insertMany(initialSkills);

    console.log('🌱 Seeding Experiences...');
    await Experience.insertMany(initialExperiences);

    console.log('\n🎉 [Database Seed Complete] Successfully populated Projects, Skills, and Experiences!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error.message);
    process.exit(1);
  }
};

seedDatabase();

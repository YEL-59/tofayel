import mongoose from 'mongoose';

export const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.trim() === '') {
    console.warn('\n⚠️ [MongoDB] MONGODB_URI is not set in backend/.env.');
    console.warn('ℹ️ The backend server is running in offline-fallback mode.');
    console.warn('ℹ️ You can add your MongoDB connection string to backend/.env at any time.\n');
    return false;
  }

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`\n✅ [MongoDB] Connected successfully to host: ${conn.connection.host}`);
    console.log(`📦 [MongoDB] Database name: ${conn.connection.name}\n`);
    return true;
  } catch (error) {
    console.error(`\n❌ [MongoDB] Connection error: ${error.message}`);
    console.warn('ℹ️ The backend server continues to run. Please check your MONGODB_URI in backend/.env.\n');
    return false;
  }
};

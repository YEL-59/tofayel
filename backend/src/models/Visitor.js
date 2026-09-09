import mongoose from 'mongoose';

const visitorSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    page: {
      type: String,
      default: '/',
    },
    referrer: {
      type: String,
      default: 'Direct / Bookmark',
    },
    browser: {
      type: String,
      default: 'Chrome',
    },
    device: {
      type: String,
      default: 'Desktop',
    },
    ip: {
      type: String,
      default: '127.0.0.1',
    },
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Visitor = mongoose.model('Visitor', visitorSchema);

export default Visitor;

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    liveLink: {
      type: String,
      default: '',
    },
    githubLink: {
      type: String,
      default: '',
    },
    tech: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      default: 'Full-Stack',
      trim: true,
    },
    categories: {
      type: [String],
      default: ['Full-Stack'],
    },
    badges: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      default: 'Live',
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    architectureTag: {
      type: String,
      default: 'Full-Stack Architecture',
    },
    year: {
      type: String,
      default: '2024',
    },
    // Visibility & Portion Controls
    showChrome: {
      type: Boolean,
      default: true,
    },
    showCategory: {
      type: Boolean,
      default: true,
    },
    showStatus: {
      type: Boolean,
      default: true,
    },
    showTelemetry: {
      type: Boolean,
      default: true,
    },
    showSpecs: {
      type: Boolean,
      default: true,
    },
    showTech: {
      type: Boolean,
      default: true,
    },
    showLikes: {
      type: Boolean,
      default: true,
    },
    showLive: {
      type: Boolean,
      default: true,
    },
    showGithub: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);

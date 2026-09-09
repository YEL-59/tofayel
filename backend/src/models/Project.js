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
      required: true,
      default: 'Full-Stack',
      enum: ['All', 'Full-Stack', 'Web App', 'Portfolio', 'AI/ML', 'Analytics', 'Game Dev', 'Mobile', 'Finance', 'UI/UX'],
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Project', projectSchema);

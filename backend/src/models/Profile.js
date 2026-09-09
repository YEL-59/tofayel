import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    greeting: {
      type: String,
      default: "Hello, I'm",
    },
    nameFirst: {
      type: String,
      default: 'Tofayel',
    },
    nameLast: {
      type: String,
      default: 'Islam',
    },
    role: {
      type: String,
      default: 'Frontend Developer',
    },
    bio: {
      type: String,
      default:
        'Crafting exceptional digital experiences with precision and creativity. Specializing in modern web technologies and user-centered design.',
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    availableText: {
      type: String,
      default: 'Available for Hire',
    },
    technologies: {
      type: [String],
      default: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    },
    socialLinks: {
      github: { type: String, default: 'https://github.com/yel-59' },
      linkedin: { type: String, default: 'https://linkedin.com' },
      email: { type: String, default: 'tofayeltuhin143@gmail.com' },
    },
    cvFileName: {
      type: String,
      default: 'Tofayel_Islam_Resume.pdf',
    },
    cvFileUrl: {
      type: String,
      default: '',
    },
    cvUpdatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Profile', profileSchema);

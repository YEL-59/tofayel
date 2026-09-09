import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { initialProjects } from '../utils/initialData.js';

const isDBConnected = () => mongoose.connection.readyState === 1;

// @desc    Get all projects (with optional category filter and search)
// @route   GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const { category, search } = req.query;

    if (!isDBConnected()) {
      let filtered = [...initialProjects];
      if (category && category !== 'All') {
        filtered = filtered.filter((p) => p.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tech.some((t) => t.toLowerCase().includes(q))
        );
      }
      return res.status(200).json({
        success: true,
        source: 'fallback',
        count: filtered.length,
        data: filtered,
      });
    }

    const query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tech: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      source: 'database',
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve projects',
      error: error.message,
    });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDBConnected()) {
      const project = initialProjects.find((p, idx) => p._id === id || String(idx + 1) === id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.status(200).json({ success: true, source: 'fallback', data: project });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    res.status(200).json({ success: true, source: 'database', data: project });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve project',
      error: error.message,
    });
  }
};

// @desc    Create new project
// @route   POST /api/projects
export const createProject = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not currently connected. Please configure MONGODB_URI in backend/.env.',
      });
    }

    const newProject = await Project.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create project',
      error: error.message,
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not currently connected. Please configure MONGODB_URI in backend/.env.',
      });
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update project',
      error: error.message,
    });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    if (!isDBConnected()) {
      return res.status(503).json({
        success: false,
        message: 'Database is not currently connected. Please configure MONGODB_URI in backend/.env.',
      });
    }

    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message,
    });
  }
};

// @desc    Increment or decrement likes count for a project
// @route   POST /api/projects/:id/like
export const likeProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body || {};
    const delta = action === 'unlike' ? -1 : 1;

    if (!isDBConnected()) {
      const proj = initialProjects.find((p, idx) => p._id === id || String(idx + 1) === id);
      if (proj) {
        proj.likes = Math.max(0, (proj.likes || 0) + delta);
        return res.status(200).json({ success: true, source: 'fallback', data: proj });
      }
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      { $inc: { likes: delta } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      message: delta > 0 ? 'Project liked' : 'Project unliked',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update likes count',
      error: error.message,
    });
  }
};

// @desc    Increment view count when a visitor clicks/sees/opens a project
// @route   POST /api/projects/:id/view
export const recordView = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isDBConnected()) {
      const proj = initialProjects.find((p, idx) => p._id === id || String(idx + 1) === id);
      if (proj) {
        proj.views = (proj.views || 0) + 1;
        return res.status(200).json({ success: true, source: 'fallback', data: proj });
      }
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const updated = await Project.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.status(200).json({
      success: true,
      message: 'View recorded',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to record view',
      error: error.message,
    });
  }
};


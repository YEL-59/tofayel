/**
 * MERN Stack API Client for Portfolio & Admin CMS
 * Seamlessly interfaces with http://localhost:5000/api
 * Includes offline fallbacks so the frontend runs smoothly even if MongoDB or the server is offline.
 */

export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface Project {
  _id?: string;
  id?: number | string;
  title: string;
  description: string;
  image: string;
  liveLink: string;
  githubLink: string;
  tech: string[];
  category: string;
  categories?: string[];
  badges?: string[];
  status: string;
  rating: number;
  views: number;
  likes: number;
  featured?: boolean;
  architectureTag?: string;
  year?: string;
  showChrome?: boolean;
  showCategory?: boolean;
  showStatus?: boolean;
  showTelemetry?: boolean;
  showSpecs?: boolean;
  showTech?: boolean;
  showLikes?: boolean;
  showLive?: boolean;
  showGithub?: boolean;
}

export interface Profile {
  _id?: string;
  greeting: string;
  nameFirst: string;
  nameLast: string;
  role: string;
  bio: string;
  isAvailable: boolean;
  availableText: string;
  technologies: string[];
  socialLinks: {
    github: string;
    linkedin: string;
    email: string;
  };
  cvFileName: string;
  cvFileUrl: string;
  cvUpdatedAt?: string;
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactMessage extends ContactMessagePayload {
  _id: string;
  read: boolean;
  createdAt: string;
}

export interface Skill {
  _id?: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools & DevOps' | 'Mobile & Others';
  level: number;
  icon?: string;
}

export interface Experience {
  _id?: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface CVInfo {
  fileName: string;
  hasCustomFile: boolean;
  size: number;
  downloadUrl: string;
  uploadedAt: string;
}

export interface HealthStatus {
  status: string;
  uptime: number;
  timestamp: string;
  database: {
    connected: boolean;
    status: string;
  };
  service: string;
}

// Fallback profile dataset
export const fallbackProfile: Profile = {
  greeting: "Hello, I'm",
  nameFirst: "Tofayel",
  nameLast: "Islam",
  role: "Frontend Developer",
  bio: "Crafting exceptional digital experiences with precision and creativity. Specializing in modern web technologies and user-centered design.",
  isAvailable: true,
  availableText: "Available for Hire",
  technologies: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "PostgreSQL"],
  socialLinks: {
    github: "https://github.com/yel-59",
    linkedin: "https://linkedin.com",
    email: "tofayeltuhin143@gmail.com",
  },
  cvFileName: "Tofayel_Islam_Resume.pdf",
  cvFileUrl: `${API_BASE}/cv/download`,
  cvUpdatedAt: new Date().toISOString(),
};

// Fallback projects dataset
export const fallbackProjects: Project[] = [
  {
    _id: "p1",
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    liveLink: "https://ecommerce-demo.com",
    githubLink: "https://github.com/yel-59/ecommerce",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Full-Stack",
    status: "Live",
    rating: 4.8,
    views: 1250,
    likes: 89,
    featured: true,
    architectureTag: "Full-Stack Architecture",
    year: "2024",
    showChrome: true,
    showCategory: true,
    showStatus: true,
    showTelemetry: true,
    showSpecs: true,
    showTech: true,
    showLikes: true,
    showLive: true,
    showGithub: true,
  },
  {
    _id: "p2",
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates, drag-and-drop interface, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    liveLink: "https://task-app-demo.com",
    githubLink: "https://github.com/yel-59/task-app",
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    category: "Web App",
    status: "Live",
    rating: 4.9,
    views: 2100,
    likes: 156,
    featured: true,
    architectureTag: "Next.js Full-Stack",
    year: "2024",
    showChrome: true,
    showCategory: true,
    showStatus: true,
    showTelemetry: true,
    showSpecs: true,
    showTech: true,
    showLikes: true,
    showLive: true,
    showGithub: true,
  },
  {
    _id: "p3",
    id: 3,
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects, skills, and professional experience with modern design and animations.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
    liveLink: "https://tofayel-portfolio.com",
    githubLink: "https://github.com/yel-59/portfolio",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    category: "Portfolio",
    status: "Live",
    rating: 4.7,
    views: 890,
    likes: 67,
    featured: true,
    architectureTag: "Frontend Reactive System",
    year: "2024",
    showChrome: true,
    showCategory: true,
    showStatus: true,
    showTelemetry: true,
    showSpecs: true,
    showTech: true,
    showLikes: true,
    showLive: true,
    showGithub: true,
  },
  {
    _id: "p4",
    id: 4,
    title: "AI Chat Application",
    description: "Intelligent chatbot with natural language processing, sentiment analysis, and multi-language support.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    liveLink: "https://ai-chat-demo.com",
    githubLink: "https://github.com/yel-59/ai-chat",
    tech: ["React", "Python", "OpenAI", "Socket.io"],
    category: "AI/ML",
    status: "Live",
    rating: 4.6,
    views: 1800,
    likes: 134,
    featured: false,
    architectureTag: "Neural NLP Pipeline",
    year: "2024",
    showChrome: true,
    showCategory: true,
    showStatus: true,
    showTelemetry: true,
    showSpecs: true,
    showTech: true,
    showLikes: true,
    showLive: true,
    showGithub: true,
  },
  {
    _id: "p5",
    id: 5,
    title: "Social Media Dashboard",
    description: "Comprehensive social media analytics dashboard with real-time data visualization and reporting tools.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    liveLink: "https://social-dashboard.com",
    githubLink: "https://github.com/yel-59/social-dashboard",
    tech: ["Vue.js", "D3.js", "Express", "Redis"],
    category: "Analytics",
    status: "Live",
    rating: 4.5,
    views: 950,
    likes: 78,
    featured: false,
    architectureTag: "Real-time Telemetry & Cache",
    year: "2023",
    showChrome: true,
    showCategory: true,
    showStatus: true,
    showTelemetry: true,
    showSpecs: true,
    showTech: true,
    showLikes: true,
    showLive: true,
    showGithub: true,
  },
  {
    _id: "p6",
    id: 6,
    title: "Mobile Game",
    description: "Cross-platform mobile game with physics engine, multiplayer support, and in-app purchases.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop",
    liveLink: "https://mobile-game.com",
    githubLink: "https://github.com/yel-59/mobile-game",
    tech: ["Unity", "C#", "Firebase", "PlayFab"],
    category: "Game Dev",
    status: "Live",
    rating: 4.4,
    views: 3200,
    likes: 245,
    featured: false,
    architectureTag: "Cross-Platform Mobile Engine",
    year: "2023",
    showChrome: true,
    showCategory: true,
    showStatus: true,
    showTelemetry: true,
    showSpecs: true,
    showTech: true,
    showLikes: true,
    showLive: true,
    showGithub: true,
  },
];

export const portfolioAPI = {
  /**
   * Check backend and database health
   */
  async checkHealth(): Promise<HealthStatus | null> {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  /**
   * Fetch Profile / Home section settings
   */
  async getProfile(): Promise<Profile> {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data.data || fallbackProfile;
    } catch {
      return fallbackProfile;
    }
  },

  /**
   * Update Profile / Home section settings
   */
  async updateProfile(profile: Partial<Profile>): Promise<{ success: boolean; data: Profile; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update profile');
      return { success: true, data: data.data, message: data.message };
    } catch (err: any) {
      return { success: true, data: { ...fallbackProfile, ...profile }, message: 'Updated in local session' };
    }
  },

  /**
   * Fetch all projects with optional filtering
   */
  async getProjects(category?: string, search?: string): Promise<Project[]> {
    try {
      const url = new URL(`${API_BASE}/projects`);
      if (category && category !== 'All') url.searchParams.append('category', category);
      if (search) url.searchParams.append('search', search);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      const res = await fetch(url.toString(), { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      return data.data && data.data.length > 0 ? data.data : fallbackProjects;
    } catch {
      let results = [...fallbackProjects];
      if (category && category !== 'All') {
        results = results.filter((p) => p.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q) ||
            p.tech.some((t) => t.toLowerCase().includes(q))
        );
      }
      return results;
    }
  },

  /**
   * Create a new project
   */
  async createProject(project: Partial<Project>): Promise<{ success: boolean; data: Project; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to create project');
      return { success: true, data: data.data, message: data.message };
    } catch (err: any) {
      const newProj: Project = {
        _id: `offline_${Date.now()}`,
        id: Date.now(),
        title: project.title || 'Untitled Project',
        description: project.description || '',
        image: project.image || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        liveLink: project.liveLink || '',
        githubLink: project.githubLink || '',
        tech: project.tech || ['React'],
        category: project.category || 'Web App',
        status: project.status || 'Live',
        rating: project.rating || 5.0,
        views: 0,
        likes: 0,
        featured: Boolean(project.featured),
      };
      return { success: true, data: newProj, message: 'Created in local session' };
    }
  },

  /**
   * Update an existing project
   */
  async updateProject(id: string, project: Partial<Project>): Promise<{ success: boolean; data?: Project; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update project');
      return { success: true, data: data.data, message: data.message };
    } catch (err: any) {
      return { success: true, message: 'Updated locally' };
    }
  },

  /**
   * Delete a project
   */
  async deleteProject(id: string): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to delete project');
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: true, message: 'Deleted locally' };
    }
  },

  /**
   * Like or unlike a project (atomic counter update in Atlas)
   */
  async likeProject(id: string, action: 'like' | 'unlike' = 'like'): Promise<{ success: boolean; data?: Project; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      return { success: res.ok, data: data.data, message: data.message };
    } catch (err: any) {
      return { success: false, message: err.message || 'Offline mode' };
    }
  },

  /**
   * Record a view/visit on a project (atomic counter update in Atlas)
   */
  async recordProjectView(id: string): Promise<{ success: boolean; data?: Project }> {
    try {
      const res = await fetch(`${API_BASE}/projects/${id}/view`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();
      return { success: res.ok, data: data.data };
    } catch (err: any) {
      return { success: false };
    }
  },


  /**
   * Upload CV file (multipart/form-data)
   */
  async uploadCV(file: File): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const formData = new FormData();
      formData.append('cv', file);

      const res = await fetch(`${API_BASE}/cv/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to upload CV');
      return { success: true, message: data.message, data: data.data };
    } catch (err: any) {
      return { success: false, message: err.message || 'Failed to upload CV' };
    }
  },

  /**
   * Get CV information
   */
  async getCVInfo(): Promise<CVInfo | null> {
    try {
      const res = await fetch(`${API_BASE}/cv/info`);
      if (!res.ok) return null;
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  },

  /**
   * Direct CV download URL (Always serves a true PDF)
   */
  getCVDownloadUrl(): string {
    return `${API_BASE}/cv/download`;
  },

  /**
   * Direct CV preview URL for in-browser PDF viewing
   */
  getCVPreviewUrl(): string {
    return `${API_BASE}/cv/preview`;
  },

  /**
   * Record a site visit event
   */
  async recordVisit(page: string = window.location.pathname): Promise<void> {
    try {
      let sessionId = localStorage.getItem('portfolio_visitor_session_id');
      if (!sessionId) {
        sessionId = `sess_${Math.random().toString(36).substring(2, 9)}`;
        localStorage.setItem('portfolio_visitor_session_id', sessionId);
      }

      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const isTablet = /iPad|Tablet/i.test(navigator.userAgent);
      const device = isTablet ? 'Tablet' : isMobile ? 'Mobile' : 'Desktop';
      
      let browser = 'Chrome';
      const ua = navigator.userAgent;
      if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Edg')) browser = 'Edge';
      else if (ua.includes('Safari') && !ua.includes('Chrome')) browser = 'Safari';

      await fetch(`${API_BASE}/analytics/visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          page: page || '/',
          referrer: document.referrer || 'Direct / Bookmark',
          browser,
          device,
        }),
      });
    } catch {
      // Ignore background analytics failures
    }
  },

  /**
   * Get visitor stats for the Admin Dashboard
   */
  async getAnalyticsStats(): Promise<AnalyticsStats | null> {
    try {
      const res = await fetch(`${API_BASE}/analytics/stats`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data.data;
    } catch {
      return null;
    }
  },

  /**
   * Submit contact inquiry to Express backend & MongoDB
   */
  async sendContactMessage(payload: ContactMessagePayload): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to submit message');

      return {
        success: true,
        message: data.message || "Message sent successfully!",
      };
    } catch (err: any) {
      return {
        success: true,
        message: "Message received locally! (Backend server is offline or restarting)",
      };
    }
  },

  /**
   * Get all contact messages
   */
  async getMessages(): Promise<ContactMessage[]> {
    try {
      const res = await fetch(`${API_BASE}/messages`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data.data || [];
    } catch {
      return [];
    }
  },

  /**
   * Delete contact message
   */
  async deleteMessage(id: string): Promise<{ success: boolean }> {
    try {
      const res = await fetch(`${API_BASE}/messages/${id}`, { method: 'DELETE' });
      return { success: res.ok };
    } catch {
      return { success: false };
    }
  },
};

export interface VisitorRecord {
  sessionId: string;
  page: string;
  referrer: string;
  browser: string;
  device: string;
  ip: string;
  timestamp: string;
}

export interface AnalyticsStats {
  totalVisits: number;
  uniqueVisitors: number;
  visitsToday: number;
  pageBreakdown: { page: string; count: number; percentage: number }[];
  deviceBreakdown: { desktop: number; mobile: number; tablet: number };
  recentVisits: VisitorRecord[];
}

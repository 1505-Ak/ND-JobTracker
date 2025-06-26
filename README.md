# 🎯 Neurodivergent-Friendly Job Tracker

A **kindness-first** web application designed to help neurodivergent job-seekers plan, track, and celebrate their job-search journey with accessibility and usability at its core.

![Job Tracker Demo](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-blue)

## ✨ Key Features

### 🎨 **Accessibility First**
- **High Contrast Mode** - Enhanced visibility for users with visual impairments
- **Dyslexia-Friendly Font** - OpenDyslexic font with improved spacing
- **Dark Mode Support** - Reduces eye strain and improves readability
- **Large Text Option** - Scalable font sizes for better accessibility
- **Keyboard Navigation** - Full keyboard support with clear focus indicators
- **Screen Reader Compatible** - ARIA labels and semantic HTML structure

### 📋 **Application Management**
- **Smart Application List** - Color-coded priorities with inline status editing
- **Quick Status Updates** - One-click status changes (To Apply → Applied → Interview → etc.)
- **Application Notes** - Track important details, requirements, and follow-ups
- **Priority System** - Visual indicators to help focus on important applications

### 📅 **Calendar Integration**
- **Deadline Tracking** - Never miss application deadlines
- **Interview Scheduling** - Visual calendar view for upcoming interviews
- **Reminder System** - Stay on top of important dates and follow-ups

### 🔍 **Job Search Integration**
- **Multi-API Job Search** - Powered by Remotive, JSearch, and LinkedIn APIs
- **Advanced Filtering** - Filter by location, company, experience level, remote options
- **One-Click Tracking** - "Track ➕" button instantly adds jobs to your pipeline
- **Company Research** - Quick access to company information and job details

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm**, **pnpm**, or **yarn**
- **RapidAPI Key** (optional, for enhanced job search features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/job-tracker.git
   cd job-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env
   ```
   Then add your RapidAPI key to `.env`:
   ```
   VITE_RAPIDAPI_KEY=your_rapidapi_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   
5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run format` | Format code with Prettier |

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and building
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **State Management**: React hooks and local storage
- **Accessibility**: ARIA compliant with keyboard navigation

## 🎯 Accessibility Features

This application is built with neurodivergent users in mind:

- **WCAG 2.1 AA Compliant** - Meets accessibility standards
- **Customizable Interface** - Users can adjust the interface to their needs
- **Consistent Navigation** - Predictable UI patterns and interactions
- **Clear Visual Hierarchy** - Well-organized content with proper headings
- **Error Prevention** - Clear validation and helpful error messages
- **Flexible Input Methods** - Support for keyboard, mouse, and assistive technologies

## 🤝 Contributing

We welcome contributions that improve accessibility and user experience! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow accessibility best practices
- Test with keyboard navigation
- Ensure proper color contrast ratios
- Add appropriate ARIA labels
- Test with screen readers when possible

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/your-username/job-tracker/issues) page to report bugs or request features. When reporting bugs, please include:

- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with accessibility in mind for the neurodivergent community
- Inspired by the need for inclusive job search tools
- Thanks to all contributors who help make this project better

---

**Made with ❤️ for the neurodivergent community**

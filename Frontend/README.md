# Bhāga - Modern Blog Platform

A full-stack blog platform built with React and Node.js, featuring a beautiful forest-themed design, rich text editing, and comprehensive admin panel.

## 🌟 Features

### User Features
- **Modern UI/UX**: Beautiful forest-themed design with smooth animations
- **Rich Content**: Browse blog posts with categories, tags, and search functionality
- **User Authentication**: Secure login and registration system
- **Comments**: Engage with posts through the commenting system
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Profile Management**: Users can manage their profiles and upload avatars

### Admin Features
- **Dashboard**: Overview of posts, comments, and user statistics
- **Rich Text Editor**: TipTap-powered editor with modern toolbar and formatting options
- **Post Management**: Create, edit, delete, and manage blog posts
- **Category Management**: Organize content with categories and tags
- **Comment Moderation**: Approve or reject user comments
- **User Management**: Manage user accounts and permissions
- **Image Upload**: Upload and manage featured images for posts

## 🎨 Design System

### Color Palette
- **Forest Green**: Primary color (#166534) - Dark forest green
- **Earth Tones**: Warm browns and beiges for accents
- **Light Backgrounds**: Forest-50 to Earth-50 for subtle gradients

### Key Design Features
- Modern card-based layouts
- Smooth transitions and hover effects
- Gradient backgrounds and buttons
- Custom scrollbars
- Focus rings for accessibility
- Responsive typography

## 🚀 Tech Stack

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **React Router** - Navigation
- **TipTap** - Rich text editor
- **Tailwind CSS** - Styling
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Axios** - HTTP client

### Additional Libraries
- **React Easy Crop** - Image cropping
- **React Select** - Enhanced select inputs
- **Lowlight** - Code syntax highlighting

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/SumanthBHegde/my-blog.git
cd my-blog/Frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory (if needed):
```env
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

### `npm start` or `yarn start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.\
The page will reload when you make changes.

### `npm test` or `yarn test`
Launches the test runner in interactive watch mode.

### `npm run build` or `yarn build`
Builds the app for production to the `build` folder.\
Optimizes the build for best performance.\
The build is minified and filenames include hashes.

### `npm run eject` or `yarn eject`
**Note: This is a one-way operation!**

Ejects the build configuration for full customization control.

## 📁 Project Structure

```
Frontend/
├── public/
│   ├── Bhaga-Favicon.png    # Favicon
│   ├── hero.png              # Hero image
│   ├── index.html            # HTML template
│   └── manifest.json         # PWA manifest
├── src/
│   ├── assets/               # Images and static files
│   ├── components/           # Reusable components
│   │   ├── comments/         # Comment components
│   │   ├── crop/             # Image cropping
│   │   ├── editor/           # TipTap editor
│   │   └── select-dropdown/  # Custom dropdowns
│   ├── constants/            # Constants and config
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   │   ├── admin/            # Admin panel
│   │   ├── articleDetail/    # Post detail page
│   │   ├── blog/             # Blog listing
│   │   ├── home/             # Homepage
│   │   ├── login/            # Login page
│   │   ├── profile/          # User profile
│   │   └── register/         # Registration
│   ├── services/             # API services
│   ├── store/                # Redux store
│   ├── utils/                # Utility functions
│   ├── App.jsx               # Main app component
│   ├── index.css             # Global styles
│   └── index.js              # Entry point
└── package.json
```

## 🎯 Key Components

### Editor
Modern TipTap-based rich text editor with:
- Grouped toolbar sections
- Forest-themed styling
- Support for headings, lists, code blocks, images
- Syntax highlighting for code blocks

### Admin Panel
Comprehensive admin dashboard featuring:
- Statistics cards
- Data tables with search and pagination
- Post management with drag-and-drop image upload
- Category and tag management
- User and comment moderation

### Profile Management
- Avatar upload with cropping
- Profile information editing
- Password change functionality

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js` to customize the forest/earth color palette:
```javascript
colors: {
  forest: {
    50: '#f0fdf4',
    // ... up to 950
  },
  earth: {
    50: '#f5f0e8',
    // ... up to 950
  }
}
```

### Global Styles
Modify `src/index.css` for:
- Custom button styles
- Card components
- Animation classes
- Focus ring customization

## 🔧 Environment Variables

Create a `.env` file with:
```env
REACT_APP_API_URL=your_backend_url
```

## 📱 Progressive Web App

The app includes PWA support with:
- Custom manifest.json
- Forest-themed colors
- Installable on mobile devices

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 👨‍💻 Author

**Sumanth Hegde**
- GitHub: [@SumanthBHegde](https://github.com/SumanthBHegde)
- Email: sumanthhegde002@gmail.com
- Location: Sirsi, Karnataka

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Create React App for the initial setup
- Tailwind CSS for the styling framework
- TipTap for the rich text editor
- All the open-source libraries that made this project possible

---

Made with ❤️ by Sumanth Hegde


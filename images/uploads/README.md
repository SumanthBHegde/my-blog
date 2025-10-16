# Upload Images Storage

This directory stores uploaded images for the blog.

## Structure:
- `posts/` - Blog post featured images
- `avatars/` - User profile pictures

## Usage:
Since we're using GitHub Pages and Render (free tier doesn't persist files), all uploaded images are stored here and version-controlled.

### For Admins:
1. Upload images through the admin panel
2. The backend will save them temporarily on Render
3. Manually copy images from Render's `/uploads` folder to this directory
4. Commit and push to GitHub
5. Images will be available at: `https://sumanthbhegde.github.io/my-blog/images/uploads/...`

### Alternative (Recommended for Production):
For a fully automated solution, consider using:
- Cloudinary (Free tier: 25GB storage, 25GB bandwidth/month)
- AWS S3 (Very affordable, pay-as-you-go)
- ImgBB (Free image hosting with API)

## Current Setup:
Images are referenced from GitHub Pages in production and localhost in development.

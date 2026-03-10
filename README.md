# Personal Portfolio

My personal portfolio website featuring a blog, project showcase, and admin dashboard for managing blog posts.

## Tech Stack

**Frontend**

- React 18 + TypeScript
- Vite
- React Router v6
- SCSS
- react-markdown / @uiw/react-md-editor

**Backend**

- Express v5 + TypeScript
- MongoDB + Mongoose
- JSON Web Tokens (auth)

## Features

- Blog with life and coding categories, search, and tag filtering
- Posts stored as static `.tsx` files (existing) or markdown in MongoDB (new posts via admin)
- Password-protected admin dashboard at `/admin` to create, edit, and delete blog posts
- Markdown editor with live preview

## Project Structure

```md
personal-portfolio/
├── frontend/         # React + Vite app (deployed on Netlify)
└── backend/          # Express API server (deployed separately)
```

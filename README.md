# Console Archive v2 - Gaming Hardware Tracker
**Assignment 2: Web App Development 1**

## Project Overview
Console Archive is a web application for cataloguing gaming hardware history. Users can create an account, log in, and manage their own collection of manufacturers and consoles adding, editing, deleting, and searching entries. Manufacturer logos can be uploaded via Cloudinary.

Built with **Node.js**, **Express**, **Handlebars**, **LowDB**, and **Fomantic-UI**.

## Features

### Authentication
- Sign up / Login / Logout using cookie-based sessions
- Each user sees only their own collection

### Dashboard
- Add a new manufacturer (with optional logo image upload via Cloudinary)
- Delete a manufacturer
- Search manufacturers by name

### Console Details
- Add a new console to a manufacturer
- Edit a console inline (update fields directly in the table)
- Delete a console

### Stats Page
- Displays total manufacturers, total consoles, and average consoles per manufacturer

### About Page
- Developer info and app description

## Tech Stack
- **Backend:** Node.js, Express 5
- **Templating:** Handlebars (`.hbs`)
- **Database:** LowDB (JSON file-based)
- **Auth:** Cookie-based sessions (`cookie-parser`)
- **Image Upload:** Cloudinary + `express-fileupload`
- **Styling:** Fomantic-UI + custom dark CSS

## Setup

1. Clone the repository
2. Run `npm install`
3. Copy `.env` and fill in your Cloudinary credentials:
   ```
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
4. Run `npm start`
5. Open `http://localhost:3000`

**Default login:** `admin@consolearchive.com` / `admin`

---
**Author:** Nikita Zdunek
**Module:** Web App Development 1 — SETU Waterford

# Minimalist Dark UI/UX Projects Portfolio

A clean, modern, and minimalist dark-themed template designed to showcase UI/UX design projects.

## Features

- Dark mode design inspired by minimalist portfolio sites
- Focused solely on project presentation
- Responsive layout that works on all device sizes
- Project sections with support for images and videos
- Sections for functionality description and design process
- Clean, text-focused design emphasizing content over decoration

## Usage

1. **Customization**:
   - Replace placeholder project information in `index.html` with your own projects
   - Update images in the `images` folder (create this folder first)
   - Add your own videos in the `videos` folder (create this folder first)
   - Customize colors in the CSS variables at the top of `styles.css`
   - Update email address in the header section

2. **Project Structure**:
   - Each project entry includes:
     - Project title
     - Tags/categories
     - Functionality description
     - Design process explanation
     - Images or videos

3. **Images & Videos**:
   - Create an `images` folder and add your project images
   - Name them meaningfully (e.g., `project1.jpg`, `project2.jpg`)
   - Create a `videos` folder for your project videos
   - Recommended image dimensions: 800x600px or 16:9 ratio
   - Recommended video format: MP4, optimized for web

## Folder Structure

```
portfolio/
├── index.html
├── styles.css
├── images/
│   ├── project1.jpg
│   ├── project2.jpg
│   └── project3.jpg
└── videos/
    ├── project2.mp4
    └── project4.mp4
```

## Customization Tips

1. **Colors**: Edit the CSS variables at the top of `styles.css` to match your personal brand:
   ```css
   :root {
       --primary-color: #e4e4e4;
       --primary-light: #ffffff;
       --secondary-color: #121212;
       --text-light: #a0a0a0;
       --text-dark: #e4e4e4;
       --background: #000000;
       --card-bg: #111111;
       --accent-color: #4a4aff;
   }
   ```

2. **Fonts**: The template uses Inter from Google Fonts. To change it:
   - Find a font on Google Fonts
   - Update the link in the `<head>` of `index.html`
   - Change the font-family in the `body` selector in `styles.css`

3. **Adding More Projects**: Copy and paste an existing project card structure in the projects section and update content as needed.

## Browser Compatibility

This template works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Credits

- Fonts: [Google Fonts](https://fonts.google.com/)
- Design inspiration: [Paul Clay](https://www.paulclay.cc/)

---

Feel free to use and modify this template for your UI/UX portfolio. Happy showcasing! 
# Muscle Relax Guide

A static web app for daily muscle relaxation guidance and basic fitness form-check demos.

## Features

- Relax mode: select a muscle area, choose available equipment, and view verified relaxation instructions.
- Equipment safety guard: unavailable equipment is disabled for each muscle area.
- Source notes: relaxation methods include trusted health or rehab references in the UI.
- Fitness mode: biceps curl, triceps extension, and shoulder press demos with MediaPipe-based arm form checks.
- Fitness overlay: detected shoulder, elbow, wrist, and torso landmarks are drawn over the camera preview.
- Optimized images: PNG files are kept as fallback, with WebP versions loaded first in modern browsers.
- Separated assets: the body SVG, CSS, JavaScript, and images are split into deploy-friendly files.

## Project Structure

```text
final_project/
  index.html
  assets/
    app.js
    styles.css
    body-map.svg
  images/
    1.png ... 34.png
    webp/
      1.webp ... 34.webp
  docs/
    tasks.md
    missing_data.md
    direction_v2.md
    content_review.md
    project_plan.html
```

## Run Locally

Use a local server because the SVG is loaded with `fetch()`.

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Camera access for fitness form checks works on `localhost` or HTTPS, such as GitHub Pages.

## GitHub Pages

This project can be deployed as a static site. Set GitHub Pages to serve from the repository root, then open the generated Pages URL.

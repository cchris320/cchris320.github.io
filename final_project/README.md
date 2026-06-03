# Muscle Relax Guide

A static web app for daily muscle relaxation guidance and basic fitness form-check demos.

## Features

- Relax mode: select a muscle area, choose available equipment, and view verified relaxation instructions.
- Equipment safety guard: unavailable equipment is disabled for each muscle area.
- Source notes: relaxation methods include trusted health or rehab references in the UI.
- Fitness mode: biceps curl, triceps extension, and shoulder press demos with static illustrations and MediaPipe-based arm form checks.
- Fitness overlay: detected shoulder, elbow, wrist, and torso landmarks are drawn over the camera preview.
- Front-facing form check: the overlay keeps the full upper-body skeleton, and supported exercises are documented as front-facing camera use only.
- Fitness notes: form-check behavior is documented as browser-only auxiliary feedback, not diagnosis or formal coaching assessment.
- Robust form metrics: elbow stability uses trimmed motion windows and relative upper-body scaling to reduce noisy-frame warnings.
- Arm tracking: form check automatically uses the clearer visible arm and explains the overlay colors in the UI.
- Trust and accessibility polish: the UI shows update/version metadata, expanded safety disclaimers, and text labels for unavailable equipment.
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
    models/
      pose_landmarker_lite.task
  images/
    1.png ... 36.png
    webp/
      1.webp ... 36.webp
    fitness/
      biceps_curl.png
      triceps_extension.png
      shoulder_press.png
      webp/
        biceps_curl.webp
        triceps_extension.webp
        shoulder_press.webp
  docs/
    tasks.md
    missing_data.md
    direction_v2.md
    content_review.md
    fitness_form_check_notes.md
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

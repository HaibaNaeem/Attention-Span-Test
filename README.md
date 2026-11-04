# Attention-Span-Test

A simple browser-based Continuous Performance Test (CPT) built with vanilla HTML, CSS, and JavaScript to measure attention span and reaction accuracy.

**Live Demo:** [https://haibanaeem.github.io/Attention-Span-Test/](https://haibanaeem.github.io/Attention-Span-Test/)

## How It Works
* Characters flash on the screen one by one at a set speed and frequency.
* **Normal characters**: Press the spacebar or the on-screen button when they appear.
* **Target characters (H and B)**: Do not press anything.
* The test runs for 30 seconds and tracks correct hits, missed characters, and false alarms.

## Files
* `index.html`: Contains the layout for the home/settings screen, active test screen, and final results screen.
* `style.css`: Clean, responsive styling for the interface and character container.
* `app.js`: Game logic, timers, random target generation, and scoring mechanism.

## Running Locally
1. Clone the repository or download the files.
2. Open `index.html` in any web browser.
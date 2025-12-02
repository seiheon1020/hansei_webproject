# Esports Calendar

A simple static website to view esports tournament schedules and today’s matches for League of Legends, Valorant, and Overwatch.

## Structure
- `index.html`: Main page with calendar, filters, and today’s matches
- `pages/`: Game pages (`lol.html`, `valorant.html`, `overwatch.html`)
- `assets/css/styles.css`: Shared styles
- `assets/js/data.js`: Sample events/matches data
- `assets/js/main.js`: Calendar rendering, filters, and page logic

## Run
This is a static site. Open `index.html` directly in your browser.

On Windows PowerShell:
```
Start-Process "$PWD/index.html"
```

## Notes
- Dates and matches are sample data around Dec 2025.
- Filter checkboxes on the main page control which events/matches appear.

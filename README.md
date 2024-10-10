# Heroes Database

## Requirements / Purpose

- The purpose for this project is to demonstrate my familiartiy with Databases and APIs and my ability to both create my own database and pull from an external database.
- This is a full stack project with the front end built in Vite React with Typescript and the back end built in Java + Spring Boot.
- The source data is being pulled from Akabab's Superhero-API https://akabab.github.io/superhero-api/api/

---

## Build Steps

- download/clone repo
- go into heroesFrontEnd folder in your terminal/CLI and input

```bash
npm install
```

---

## Design Goals / Approach

- Design-wise I want the hero stats to be easily readable
  - I've acheived this with visual indicators like the colour coded stat-bars next to the stats.
- I'm also trying to go for a bit of a gaudy retro-tech aesthetic reminiscent of the early 2000's graphics used in superhero/geek media.
  - Think of brushed steel and black screens with green mono text.
  - It's ugly, yet charming.

---

## Features

- Ability to save Heroes from the source API into a collection in my database
- Search for heroes by name

---

## Known issues

- Front end still needs work
  - Styling is still too ugly to be called "charming", but we're getting there!
  - May add modals to bring up hero info
- Tests not yet implemented

---

## Future Goals

- I would really like to implement a battle system if I get time.

---

## Change logs

### 10/10/2024 - Front end styling and bug fixes

- Improves styling on the buttons and hero cards.
- fixed some bugs on the front end.

### 09/10/2024 - Delete and Edit features implemented

- Delete and Edit feature implemented
- Improved styling on form components and background
- Changed form input types to be range instead of number

### 08/10/2024 - Search feature implemented

- Search feature has been implemented

### 06/10/2024 - Database structure redone

- Have modified my original basic one table structure for the database so it more closely resembles the source database.

### 04/10/2024 - First Changelog

- Hero Cards now have a brushed steel background
- Other improved styling.

---

## What did you struggle with?

- My first struggle of this project was making sure the HeroCard component was able to interchangably take in both the source and saved proptypes/interfaces.

  - The issue being that currently my database has a different structure to the source database.
  - Typescript's static typing made this more of a challenge.
  - While I have fixed this issue on the front end I would like to modify my database/back end to more closely match the source. (This has been done now!)

- Implementing pagination on an API with no pageable results and IDs that do not match index (solved by filtering the data according to an offset of the index).

---

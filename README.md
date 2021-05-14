# PokéMe

![PokéMe Logo](https://pokeme-cards.netlify.app/images/logo/pokeme_logo.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4ba5ad2-ac42-487d-a086-e8eece57074c/deploy-status)](https://app.netlify.com/sites/pokeme-cards/deploys)

Deployed URL: [pokeme-cards.netlify.app](https://pokeme-cards.netlify.app/)

## What Worked Well

### Before Lab 5 work
- Styling with Sass preprocessor
- Used functional components with hooks
- Abstracted API logic into separate file
- Digitally reproduced a Pokémon card
- Used 3D card effect when the card is hovered
- Interacted with [a random user API](https://randomuser.me/)
- Made use of publically available resources for Pokémon data and cited in code
- Stitched together existing Pokémon logo with Pokéme name
- Created card background texture
- Implemented SVG background making use of [svgbackgrounds.com](https://www.svgbackgrounds.com/)

### With Lab 5 work
- Integrated with Platform API (Lab 5)
- Added filter for filtering by PokéMe type
- Improved 3D card look (required swapping out library) by making use of Sass mixins and the `transform: translateZ()` declaration
- 🥚 Added Easter egg for glass card style

## What Didn't

- Would have liked to refactor the card styling so that it scales well with the browser window size
- Did not add many styles for responsiveness
- With more time, I would have added a filter by type feature on the main cards page
- Would have liked to add download screenshot functionality, so users can "keep" their cards

### Refreshing the view once data was created or updated
It took several iterations to be able to get a specific card to render once it was either created or updated. I was able to write a small component (`RefreshCard`) for refreshing the UI once card creation or updates were made. This struck me as not the best solution to the problem.

As a note, I implemented logic to keep the Redux state and database in sync. 

## Extra Credit
- Added a toast component for notifying the user for errors with API calls
- Added lots of styling to give it a Pokémon-inspired look and feel
- Created functionality for generating a random PokéMe card
- Input validation for card fields

### Supercharged Title Field
I took the lab further by ⚡️ supercharging the `title` field with a stringified JSON object with all the data needed to render a PokéMe card. I then parsed the data comping back from the database in order to render it out into the `Card` component. This apprroach also allowed me to store an additional `message` key, where I could store Markdown to be rendered in the UI.

## Screenshots

Social Card  
![Social Card](https://pokeme-cards.netlify.app/images/social-card/social-card.png)

Social Card Preview  
![Social Card Preview](https://pokeme-cards.netlify.app/images/social-card/social-card-preview.png)

Create  
![Create](https://pokeme-cards.netlify.app/images/screenshots/create.gif)

Read  
![Read](https://pokeme-cards.netlify.app/images/screenshots/read.gif)

Update  
![Update](https://pokeme-cards.netlify.app/images/screenshots/update.gif)

Delete  
![Delete](https://pokeme-cards.netlify.app/images/screenshots/delete.gif)

Delete All  
![Delete All](https://pokeme-cards.netlify.app/images/screenshots/delete_all.gif)

Generate  
![Generate](https://pokeme-cards.netlify.app/images/screenshots/generate.gif)

3D Card  
![3D Card](https://pokeme-cards.netlify.app/images/screenshots/3d_card.gif)

Glass Card  
![Glass Card](https://pokeme-cards.netlify.app/images/screenshots/glass.gif)

Filter by Type 
![Filter by Type](https://pokeme-cards.netlify.app/images/screenshots/filter.gif)

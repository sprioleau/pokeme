# PokéMe

![PokéMe Logo](https://pokeme-cards.netlify.app/images/logo/pokeme_logo.png)

[![Netlify Status](https://api.netlify.com/api/v1/badges/e4ba5ad2-ac42-487d-a086-e8eece57074c/deploy-status)](https://app.netlify.com/sites/pokeme-cards/deploys)

Deployed URL: [pokeme-cards.netlify.app](https://pokeme-cards.netlify.app/)

## What Worked Well

- Styling with Sass preprocessor
- Digitally reproduced a Pokémon card
- Used 3D card effect when the card is hovered
- Interacted with [a random user API](https://randomuser.me/)
- Made use of publically available resources for Pokémon data and cited in code

## What Didn't

- Would have liked to refactor the card styling so that it scales well with the browser window size
- Did not add many styles for responsiveness
- With more time, I would have added a filter by type feature on the main cards page

### Refreshing the view once data was created or updated
It took several iterations to be able to get a specific card to render once it was either created or updated. I was able to write a small component (`RefreshCard`) for refreshing the UI once card creation or updates were made. This struck me as not the best solution to the problem.

As a note, I implemented logic to keep the Redux state and database in sync. 

## Extra Credit
- Added a toast component for notifying the user for errors with API calls
- Added lots of styling to give it a Pokémon-inspired look and feel
- Created functionality for generating a random PokéMe card

### Supercharged Title Field
I took the lab further by ⚡️ supercharging the `title` field with a stringified JSON object with all the data needed to render a PokéMe card. I then parsed the data comping back from the database in order to render it out into the `Card` component. This apprroach also allowed me to store an additional `message` key, where I could store Markdown to be rendered in the UI.

## Screenshots

Social Card  
![Social Card](https://pokeme-cards.netlify.app/images/social-card/social-card-preview.png)

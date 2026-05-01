# Forkify Recipe Search App

Recipe search application built with modern JavaScript.  
The project allows users to search recipes, view recipe details, manage bookmarks and interact with data from an external recipe API.

## Features

- Search recipes by keyword or ingredient
- Display recipe results dynamically
- View detailed recipe information
- Handle pagination for search results
- Save bookmarked recipes
- Persist bookmarks using local storage
- Modular JavaScript architecture
- API consumption with asynchronous JavaScript
- Bundling and build process with Parcel
- Styling with Sass/SCSS

## Technologies

- JavaScript
- HTML
- Sass / SCSS
- Parcel
- REST API
- LocalStorage
- Git & GitHub
- Netlify

## Project structure

```txt
forkify-recipe-search-app/
├── proyecto/
│   ├── img/
│   ├── js/
│   │   ├── views/
│   │   ├── config.js
│   │   ├── controller.js
│   │   ├── helpers.js
│   │   └── model.js
│   ├── sass/
│   └── index.html
├── dist/
├── package.json
└── package-lock.json
```

## Installation

Clone the repository:

```bash
git clone https://github.com/ArathJacobo061/forkify-recipe-search-app.git
```

Go to the project folder:

```bash
cd forkify-recipe-search-app
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm start
```

Build the project for production:

```bash
npm run build
```

## API usage

This project consumes a recipe API to search and display recipe information.

Main API-related features:

- Search recipes by query
- Load recipe details by ID
- Handle asynchronous requests
- Render loading states
- Render error messages
- Store bookmarked recipes locally

## Deployment

The project is deployed with Netlify.

Demo:

```txt
https://forkify-recipes-arath.netlify.app
```

## Main concepts practiced

- Modern JavaScript modules
- MVC-style project organization
- API consumption
- Async / await
- DOM manipulation
- Event handling
- Pagination
- LocalStorage persistence
- Parcel bundling
- Sass styling
- Frontend deployment with Netlify

## Author

**Arath Sebastian Jacobo Duran**  
GitHub: [@ArathJacobo061](https://github.com/ArathJacobo061)

## License

This project was created for learning and portfolio purposes.

# starwars-fun-react

A React app for browsing Star Wars characters. It fetches character data from
[swapi.info](https://swapi.info) (an unofficial SWAPI mirror), lets you search
by name, and click into a detail page for each character with their films,
species, vehicles, and starships resolved to readable names.

## Tech stack

- React 18 (`react-dom/client`, `createRoot`)
- React Router v6 (`react-router-dom`)
- Create React App (`react-scripts`)
- [Tachyons](https://tachyons.io/) for utility CSS

## Project structure

```
src/
  containers/
    App.js          # top-level component: fetches people list, search, routing
    PersonPage.js    # character detail page (/person/:id)
    app.css          # app styles + STARWARS/SEGA font faces
    STARWARS.woff
    SEGA.woff
  components/
    CardList.js       # renders a grid of Card components
    Card.js            # single character card, resolves related resource URLs
    SearchBox.js        # search input
    Scroll.js           # scrollable container
  index.js            # entry point, router setup
  index.css           # global styles
  registerServiceWorker.js
  robots.js            # static sample/fallback data (JSONPlaceholder-style)
public/
  index.html
```

## Running locally (without Docker)

```bash
npm install
npm start
```

The app runs at http://localhost:3000 with hot reload.

To build a production bundle:

```bash
npm run build
```

Output goes to `build/`.

## Running with Docker

This project has a multi-stage `Dockerfile` with two targets: `dev` (hot-reload
dev server) and `production` (static build served by Nginx).

### Development container

```bash
docker build --target dev -t starwars-fun-react:dev .
docker run --rm -it -p 3000:3000 -v "$(pwd)/src:/app/src" -v "$(pwd)/public:/app/public" starwars-fun-react:dev
```

Open http://localhost:3000. The bind mounts let you edit files on your host
and see changes reload in the container.

### Production container

```bash
docker build --target production -t starwars-fun-react:prod .
docker run --rm -p 8080:80 starwars-fun-react:prod
```

Open http://localhost:8080. This serves the optimized static build via Nginx,
with a SPA fallback so client-side routes like `/person/1` work on direct
load and refresh.

## Notes

- `public/index.html` was not part of the original file set and was added as
  a minimal CRA scaffold — replace it with your real one if it has custom
  meta tags, a favicon, or other head content.
- The app depends on `swapi.info` being reachable at runtime; there's no
  backend of its own.
# Boilerplate WebSite

Build a static website with quality and agility.

## Instructions

1. Install: [NodeJS](https://nodejs.org/en/download/) and [Gulp](https://gulpjs.com/)

2. Clone the project:
```sh
$ git clone https://github.com/damoclesgil/boilerplate-website.git
```

3. Then go to the project's folder:
```sh
$ cd boilerplate-website
```

4. Install dependencies:
```sh
$ npm install
```

5. run:
```sh
$ gulp
```

Now the local dev is running at localhost:8080 :smile:

### Tasks

- `gulp`: run all tasks for development and initialize watch for changes and a server
- `gulp -p`: run all tasks for production and initialize watch for changes and a server
- `gulp nunjucks`: compile html files
- `gulp js`: execute js files
- `gulp css`: compile css files
- `gulp images`: compress image files
- `gulp svgs`: minify svgs files
- `gulp sprite-svg`: generate sprite svg
- `gulp watch`: call for watch files
- `gulp browser-sync`: inicialize a server
- `gulp deploy-surge`: run all tasks and deploy files to surge
- `gulp deploy-gh`: run all tasks and deploy files to gh-pages

### NPM Scripts

- `npm run lint`: lint all js errors, prepush and precommit
- `npm run fix`: fix all js errors

### License

[MIT License](LICENSE.md) © [Dâmocles Gil](https://github.com/damoclesgil)

### Workspace Settings

* [Workspace Settings VSCode](https://github.com/damoclesgil/workspace-settings)

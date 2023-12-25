## EATY MERN FULL STACK APP DOCS

#### START BASIC EXPRESS APP CONFIGURATIONS

- tsc init
- npm init -y
- in tsconfig.json we should set rootDir to src "rootDir": "./src"
- mkdir src
- cd src
- touch index.ts

```
npm install express @types/express ts-node-dev
```

- create .gitignore file and add 'node_modules'

- in package.json file we should type dev and start commands

```json
"scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/index.ts",
    "start": "ts-node src/index.ts"
},
```

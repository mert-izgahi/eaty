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

#### Connect to Db

create new folder ./src/utils and inside it connectDb function

```js
import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/eaty");
    console.log(` Connected to MongoDB`);
  } catch (error) {
    console.log(error);
  }
};
```

and in src/index.ts

```js
async function startServer() {
  try {
    await connectDb();
    app.listen(3000, () => {
      console.log("Example app listening on port http://localhost:3000!");
    });
  } catch (error) {
    console.log(error);
  }
}

startServer();
```

#### Setup Environment Vars

create folder configs and then file with static name default.ts inside config folder

```js
export default {
  port: 5001,
  mongoUrl: "mongodb://127.0.0.1:27017/eaty",
};
```

and in index.ts we can modify startServer function

```js
async function startServer() {
  try {
    const port: number = config.get < number > "port";
    const mongoUrl: string = config.get < string > "mongoUrl";
    await connectDb(mongoUrl);
    app.listen(port, () => {
      console.log(
        "Example app listening on port" + ` http://localhost:${port}`
      );
    });
  } catch (error) {
    console.log(error);
  }
}
```

#### Modeling Menu Item

we can start building menu item model and define required properties that we will save it to database

- create new folder in src call it models
- inside model create new file with name menuItem.model.ts

```js
import mongoose from "mongoose";

export interface IMenuItem extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});

export default mongoose.model < IMenuItem > ("MenuItem", menuItemSchema);
```

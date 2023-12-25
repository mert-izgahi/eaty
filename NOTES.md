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

#### Start Our Menu Item Controller

in src folder create folder call it controllers and inside it new file with name menuItem.controller.ts, Now let's create first controller that we will use in api services

```js
import { Request, Response, NextFunction } from "express";
export async function getAllMenuItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.send("All menu items");
}
```

#### Create router.ts

in our src folder we will create new file and we will call it router.ts

```js
import { Express } from "express";

export default function router(app: Express) {
  app.get("/", (req, res) => {
    res.send("Hello World!");
  });
}
```

then we can connect menu controller with router by

```js
export default function router(app: Express) {
  app.get("/api/v1/menu-items", getAllMenuItems);
}
```

#### Setup Postman

- create new collection and inside it add folders (accounts,menu,orders)

- setup environment and endPoint

#### Error Handling

in get menu items service to test errors we can start with throwing new error

```js
// ***
throw new Error("Not implemented");
// ***
```

create folder in src call it middlewares and in index.ts
after router

```js
// ***
router(app);
app.use(errorHandlerMiddleware);
// ***
```

and menuItems.controller.ts

```js
export async function getAllMenuItems(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    throw new Error("Not implemented");
  } catch (error) {
    next(error);
  }
}
```

and in errorHandler middleware

```js
export default function errorHandlerMiddleware(
  error: Error,
  req: any,
  res: any,
  next: any
) {
  return res.status(500).json({
    state: "error",
    message: error.message,
    name: error.name,
  });
}
```

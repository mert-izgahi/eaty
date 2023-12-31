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

complete menuItems model and controller, and error handler middleware.

#### Start with User Model:

create user model and user controller also router for it

#### JWT and generate tokens

we will create new user schema method to generate token and return it in response

```js
userSchema.methods.generateToken = function () {
  try {
    const token = sign(
      { id: this._id },
      config.get < string > "jwtPrivateKey",
      {
        expiresIn: config.get < string > "jwtExpireIn",
      }
    );
    return token;
  } catch (error) {
    throw new BadRequestError("Could not generate token");
  }
};
```


#### Hash Password and keep it secret
using bcrypt and mongoose middleware we will hash password before saving it to db

### Login Service
```js
export async function LoginUserController(
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) {
  const { email, password } = req.body;
  const userDoc = await User.getOneUserByEmail(email);

  if (!userDoc) {
    throw new AuthenticationError("Invalid credentials, user not found");
  }

  const isCorrect = await userDoc.comparePassword(password);

  if (!isCorrect) {
    throw new AuthenticationError("Invalid credentials, wrong password");
  }

  const token = await userDoc.generateToken();

  return sendResponse(res, 200, "User logged in successfully", token);
}
```


#### DeserializeUser Middleware
```js
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import config from "config";

export default async function deserializerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const headers = req.headers;
    const authorization = headers.authorization;
    const token = authorization?.split(" ")[1] as string;
    if (!token) {
      return next();
    }
    const payload = verify(token, config.get<string>("jwtPrivateKey"));
    if (!payload) {
      return next();
    }

    // assign user to res.locals
    res.locals.user = payload;
    next();
  } catch (error) {
    return next(error);
  }
}
```
AFTER BUILDING ALL CONTROLLERS AND ROUTS WE WILL START WITH TESTS
#### TESTS

- `npm install --save-dev jest @types/jest ts-jest supertest @types/supertest`

- `npx ts-jest config:init`


- if we want to update tests automatically when files changes "test": "jest --watchAll",

- to set node env export NODE_ENV=test
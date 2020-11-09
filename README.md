# express-server-scaffold-typescript

A Scaffolding template based on Express and Typescript that already includes the following common features.

# common features
+ base [express](https://www.npmjs.com/package/express).
+ write by [TypeScript](https://www.npmjs.com/package/typescript).
+ divide global config and module config.
+ modularization development, use `user module` as example.

```
+---modules
|   \---user
|           user.config.ts
|           user.controller.ts
|           user.dto.error.ts
|           user.dto.ts
|           user.service.ts
|           user.types.ts
|   \---other module
```

+ use [class-validator](https://www.npmjs.com/package/class-validator) as dto validate http request body. you can use custom validator [is-match.custom.ts](./src/validator/is-match.custom.ts).
+ MongoDB(use [mongoose](https://www.npmjs.com/package/mongoose)).
+ global service, like `base.orm.service.ts` and `redis.service.ts`, you can import these common services to your module.
+ global unified response results, whatever normal response or error response. please click [unify-response.ts](./src/helper/unify-response.ts).
+ 404 and error handler.
+ logs([morgan](https://www.npmjs.com/package/morgan) and [debug](https://www.npmjs.com/package/debug) to terminal, [winston](https://www.npmjs.com/package/winston) to files).
+ environment variable config.
+ prettier format code.
+ nodemon dev and pm2 deploy.

# Q&A
+ why do it?

I want to have a standardized template for future Node development.

+ why dont use like `new HttpException(401, 'no authentication');` response error info?

I know a lot of people do, but I don't like this form, because I think every time `new` class object, it will request new memory, I think this is not necessary, based on js features, the most convenient method to call function directly.

Using a custom method to process http result will make it easy and fast, and we can ensure that the interface of the HTTP request response is consistent. It'll be friendlier to client.

+ why not suppose MySQL?

I'll add MySQL in the feature.

+ why not suppose server render? like ejs nunjucks and hbs?

I know now a lot of projects area using Node for server-side rendering, not including Vue react Angular, if I had time I'd do a new branch to support server-side rendering.

+ will if suppose Vue or react or Angular server render?

Maybe, I'm not sure, because the focus of this project is server end, not front end.

# todo
+ Use Winston to standardize the log information and write api to process the log information, write log info to database.
+ Performance monitoring and warning measures, use email notice project members.
+ API interface documentation for the project
+ File upload management, rather than simply upload files
+ ...

+ License

balabala balabala, I dont care, you can use this template do anything if you like.

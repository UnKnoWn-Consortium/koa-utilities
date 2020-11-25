# Utilities for koa

### Authenticator Koa Middleware Factory

* Fixed token

```javascript
import authenticator from "koa-utilities/dist/authenticator/fixed"; 
authenticator(<FIXED_TOKEN>); 
```

* Local PASETO token

```javascript
import authenticator from "koa-utilities/dist/authenticator/local"; 
authenticator(<PASETO_TOKEN>); 
```

* Remote PASETO token

```javascript
import authenticator from "koa-utilities/dist/authenticator/remote"; 
authenticator(<REMOTE_PATH>); 
```

### Image Transformer

```javascript
const promises = transformerBuilder(stream)
    .reduce(
        (acc, [ transformers, size ]) => acc.concat(
            transformers.map(
                async ([transformer, extension]) => {
                    try {
                        await pipeline(
                            transformer,
                            fs.createWriteStream(`${ __dirname }/somewhere.${ size }.${ extension }`)
                        );
                    } catch (e) {
                        throw e;
                    }
                    return (`${ __dirname }/somewhere.${ size }.${ extension }`);
                }
            )
        ),
        []
    );
```

### Logger Koa Middleware Factory

```javascript
// It requires a Winston logger instance declared by yourself
import loggerInstance from "./components/Winston";
import logger from "koa-utilities/dist/logger";
app.use(logger(loggerInstance)); 
```

### Rate Limiter Koa Middleware Factory

```javascript
import rateLimiter from "koa-utilities/dist/rateLimiter";
app.use(rateLimiter()); 
```

### Refresh Reminder Koa Middleware Factory

```javascript
import refreshReminder from "koa-utilities/dist/refreshReminder";
app.use(refreshReminder()); 
```

### Timer Koa Middleware

This timer middleware does not have a factory. 
The default export is the Koa middleware itself. 

```javascript
import timer from "koa-utilities/dist/timer";
app.use(timer); 
```

### User Prop Filter

```javascript

```

### Sentry Tracing Middleware
https://docs.sentry.io/platforms/node/guides/koa/

```javascript
import sentryTracer from "koa-utilities/dist/sentry/tracer";
app.use(sentryTracer(<Sentry_DSN>)); 
```

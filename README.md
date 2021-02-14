# Utilities for koa

### Authenticator Koa Middleware Factory

* Fixed token

It also accepts a second and a third augment at ```acceptCookie``` and ```acceptQueryString``` that controls whether
token included in cookie and then appended as query string is accepted as backup.

```javascript
import authenticator from "koa-utilities/dist/authenticator/fixed"; 
authenticator(<FIXED_TOKEN>, acceptCookie: boolean, acceptQueryString: boolean); 
```

* Local PASETO token

It also accepts a second and a third augment at ```acceptCookie``` and ```acceptQueryString``` that controls whether 
token included in cookie and then appended as query string is accepted as backup. 

```javascript
import authenticator from "koa-utilities/dist/authenticator/local"; 
authenticator(<PASETO_TOKEN>, acceptCookie: boolean, acceptQueryString: boolean); 
```

* Remote PASETO token

It also accepts a second and a third augment at ```acceptCookie``` and ```acceptQueryString``` that controls whether 
token included in cookie and then appended as query string is accepted as backup.

```javascript
import authenticator from "koa-utilities/dist/authenticator/remote"; 
authenticator(<REMOTE_PATH>, acceptCookie: boolean, acceptQueryString: boolean); 
```

### Token Issuer

* PASETO Token

```javascript
import Issuer from "koa-utilities/dist/tokenIssuer/PASETO";
const pasetoIssuer = new Issuer(
    <PASETO_HEX_KEY>,
    () => ({})
);
```

* JSON Web Token (Work-in-Progress)

```javascript
import Issuer from "koa-utilities/dist/tokenIssuer/JWT";
const jwtIssuer = new Issuer(
    <JWT_KEY>,
    () => ({})
);
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

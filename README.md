# Utilities for koa

### Authenticator

* Fixed token

```javascript
import authenticator from "koa-utilities/dist/authenticator/fixed"
authenticator(<FIXED_TOKEN>)
```

* Local PASETO token

```javascript
import authenticator from "koa-utilities/dist/authenticator/local"
authenticator(<PASETO_TOKEN>)
```

* Remote PASETO token

```javascript
import authenticator from "koa-utilities/dist/authenticator/remote"
authenticator(<REMOTE_PATH>)
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

### Logger

### Rate Limiter

### Refresh Reminder

### Timer

### User Prop Filter

# Winston React

The goal of this bundle is provide a [React] implementation for [Winston]

## Install

```bash
npm install winston-react
```

## Usage

in your `App.tsx`:

```tsx
import React from 'react';
import winston from 'winston';
import { WinstonProvider } from 'winston-react';

const logger = winston.createLogger({
  // ...
  transports: [
    // ...
    new winston.transports.Console()
  ]
});

const App: React.FC = () => (
  <WinstonProvider logger={logger}>
    <div>
      your awesome application
    </div>
  </WinstonProvider>
);
```

Using hooks:

```tsx
import React from 'react';
import { useWinstonLogger } from 'winston-logger';

const Component: React.FC = () => {
  const logger = useWinstonLogger();

  React.useEffect(() => {
    logger.info('your awesome information log!');
  });

  return (
    <div>
      your awesome component
    </div>
  );
};
```

Using consumer:

```tsx
import React from 'react';
import { WinstonConsumer } from 'winston-logger';

const Component: React.FC = () => {
  const logger = useWinstonLogger();

  return (
    <WinstonConsumer>
      {(logger) => (
        /* do stuff here */
        <div>
          we have access to the logger!
        </div>
      )}
    </WinstonConsumer>
  );
};
```

[React]: https://github.com/facebook/react
[WinstonJS]: https://github.com/winstonjs/winston

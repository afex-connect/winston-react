import { render } from '@testing-library/react';
import React from 'react';
import winston from 'winston';

import WinstonConsumer from '../../context/WinstonConsumer';
import { getWinstonContext } from '../../context/WinstonContext';
import WinstonProvider from '../../context/WinstonProvider';

describe('context.WinstonConsumer', () => {
  const logger = winston.createLogger();

  it('has a render prop', (done) => {
    render(
      <WinstonProvider logger={logger}>
        <WinstonConsumer>
          {loggerRender => {
            try {
              expect(loggerRender).toBe(logger);
              done();
            } catch (e) {
              done.fail(e);
            }
            return null;
          }}
        </WinstonConsumer>
      </WinstonProvider>
    );
  });

  it('renders the content in the children prop', () => {
    const { getByText } = render(
      <WinstonProvider logger={logger}>
        <WinstonConsumer>
          {() => (
            <div>Test</div>
          )}
        </WinstonConsumer>
      </WinstonProvider>
    );

    expect(getByText('Test')).toBeTruthy();
  });

  it('fails if there is no client in the context', () => {
    // Prevent Error about missing context type from appearing in the console.
    const errorLogger = console.error;
    console.error = () => {
      // disable output
    };

    expect(() => {
      // We're wrapping the `WinstonConsumer` component in a
      // `WinstonContext.Provider` component, to reset the context before
      // testing.
      const WinstonContext = getWinstonContext();

      render(
        <WinstonContext.Provider value={{}}>
          <WinstonConsumer>{() => null}</WinstonConsumer>
        </WinstonContext.Provider>
      );
    }).toThrowError(
      'Could not find "logger" in the context of WinstonConsumer. ' +
      'Wrap the root component in a <WinstonProvider>.'
    );

    console.error = errorLogger;
  });
});

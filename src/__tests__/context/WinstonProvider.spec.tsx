import { render } from '@testing-library/react';
import React from 'react';
import winston, { Logger } from 'winston';

import { getWinstonContext } from '../../context/WinstonContext';
import WinstonProvider from '../../context/WinstonProvider';

describe('context.WinstonProvider', () => {
  const logger = winston.createLogger();

  it('should render children components', () => {
    const rendered = render(
      <WinstonProvider logger={logger}>
        <div className="unique">Test</div>
      </WinstonProvider>
    );

    expect(rendered.getByText('Test')).toBeTruthy();
  });

  it('should require a logger', () => {
    const originalConsoleError = console.error;

    // disable default error logger
    console.error = () => {
      // disable output
    };

    expect(() => {
      // Before testing `WinstonProvider`, we first fully reset the
      // existing context using `WinstonContext.Provider` directly.
      const WinstonContext = getWinstonContext();
      render(
        <WinstonContext.Provider value={{}}>
          <WinstonProvider logger={undefined as unknown as Logger}>
            <div className="unique" />
          </WinstonProvider>
        </WinstonContext.Provider>
      );
    }).toThrowError(
      'WinstonProvider was not passed a logger instance. Make ' +
      'sure you pass in your logger via the "logger" prop.'
    );

    console.error = originalConsoleError;
  });

  it('should update props when the logger changes', () => {
    let loggerToCheck = logger;

    const TestChild = () => {
      const context = React.useContext(getWinstonContext());

      expect(context.logger).toBe(loggerToCheck);

      return null;
    };
    const { rerender } = render(
      <WinstonProvider logger={loggerToCheck}>
        <TestChild />
      </WinstonProvider>
    );

    const newLogger = winston.createLogger({
      level: 'error'
    });

    loggerToCheck = newLogger;

    rerender(
      <WinstonProvider logger={loggerToCheck}>
        <TestChild />
      </WinstonProvider>
    );
  });
});

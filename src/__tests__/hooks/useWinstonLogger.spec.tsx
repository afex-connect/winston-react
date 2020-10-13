import { render } from '@testing-library/react';
import React from 'react';
import winston from 'winston';

import { resetWinstonContext } from '../../context/WinstonContext';
import WinstonProvider from '../../context/WinstonProvider';
import useWinstonLogger from '../../hooks/useWinstonLogger';

describe('hooks.useWinstonLogger', () => {
  afterEach(() => {
    resetWinstonContext();
  });

  it('should return a client instance from the context if available', () => {
    const logger = winston.createLogger();

    function App () {
      expect(useWinstonLogger()).toEqual(logger);
      return null;
    }

    render(
      <WinstonProvider logger={logger}>
        <App />
      </WinstonProvider>
    );
  });

  it('should error if a client instance can\'t be found in the context', () => {
    function App () {
      expect(() => useWinstonLogger()).toThrow(Error);
      return null;
    }

    render(<App />);
  });
});

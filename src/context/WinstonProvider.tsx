import React from 'react';
import { Logger } from 'winston';

import { getWinstonContext } from './WinstonContext';

export interface WinstonProviderProps {
  logger: Logger;
  children: React.ReactNode | React.ReactNode[] | null;
}

const WinstonProvider: React.FC<WinstonProviderProps> = ({
  children,
  logger
}) => {
  const WinstonContext = getWinstonContext();

  return (
    <WinstonContext.Consumer>
      {(context: { logger?: Logger } = {}) => {
        if (logger && context.logger !== logger) {
          context = Object.assign({}, context, { logger });
        }

        if (!context.logger) {
          throw new Error(
            'WinstonProvider was not passed a logger instance. Make ' +
            'sure you pass in your logger via the "logger" prop.'
          );
        }

        return (
          <WinstonContext.Provider value={context}>
            {children}
          </WinstonContext.Provider>
        );
      }}
    </WinstonContext.Consumer>
  );
};

export default WinstonProvider;

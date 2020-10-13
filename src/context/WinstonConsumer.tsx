import React from 'react';
import { Logger } from 'winston';

import { getWinstonContext } from './WinstonContext';

export interface WinstonConsumerProps {
  children: (logger: Logger) => React.ReactChild | null;
}

export const WinstonConsumer: React.FC<WinstonConsumerProps> = (props) => {
  const WinstonContext = getWinstonContext();

  return (
    <WinstonContext.Consumer>
      {(context: { logger?: Logger}) => {
        if (!context || !context.logger) {
          throw new Error(
            'Could not find "logger" in the context of WinstonConsumer. ' +
            'Wrap the root component in a <WinstonProvider>.'
          );
        }

        return props.children(context.logger);
      }}
    </WinstonContext.Consumer>
  );
};

export default WinstonConsumer;

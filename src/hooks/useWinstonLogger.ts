import React from 'react';
import { Logger } from 'winston';

import { getWinstonContext } from '../context/WinstonContext';

export default function useWinstonLogger (): Logger {
  const { logger } = React.useContext(getWinstonContext());

  if (!logger) {
    throw new Error(
      'No Winston logger instance can be found. Please ensure that you ' +
      'have called `WinstonProvider` higher up in your tree.'
    );
  }

  return logger;
}

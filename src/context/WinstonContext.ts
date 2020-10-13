import React from 'react';
import { Logger } from 'winston';

export interface WinstonContextValue {
  logger?: Logger;
}

// To make sure Winston Client doesn't create more than one React context
// (which can lead to problems like having an Winston Client instance added
// in one context, then attempting to retrieve it from another different
// context), a single Winston context is created and tracked in global state.
// Since the created context is React specific, we've decided to attach it to
// the `React` object for sharing.

// If Symbol's aren't available, we'll use a fallback string as the context
// property (we're looking at you, IE11).
const contextSymbol = typeof Symbol === 'function' && Symbol.for
  ? Symbol.for('__WINSTON_CONTEXT__')
  : '__WINSTON_CONTEXT__';

export function resetWinstonContext (): void {
  Object.defineProperty(React, contextSymbol, {
    configurable: true,
    enumerable: false,
    value: React.createContext<WinstonContextValue>({}),
    writable: false
  });
}

export function getWinstonContext (): React.Context<WinstonContextValue> {
  if (!(React as Record<string, unknown>)[contextSymbol as string]) {
    resetWinstonContext();
  }

  return (
    React as Record<string, unknown>
  )[contextSymbol as string] as React.Context<WinstonContextValue>;
}

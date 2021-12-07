import React, { ChangeEventHandler, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react'
import { Integrations } from "@sentry/tracing"


Sentry.init({
  dsn: "https://262adcc6f52d4ea5b23aa95fd7ebd11b@o1017238.ingest.sentry.io/5982952",
  integrations: [new Integrations.BrowserTracing()],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export const ErrorExample =  () => {
  return <button onClick={
    e => {
      throw new Error("error goes")
    }
  }>点我触发错误</button>
  
}

export default {
  title: '监控',
}

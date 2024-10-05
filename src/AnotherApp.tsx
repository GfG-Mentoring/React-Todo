import React, { lazy, Suspense } from 'react';
// import App from './App';
// Lazy load the component
const MyComponent = lazy(() => import('./App'));

const AnotherApp = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MyComponent />
      </Suspense>
    </div>
  );
};

export default AnotherApp;

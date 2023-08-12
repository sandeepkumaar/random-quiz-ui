/**
 * fakeIndexedDb is imported before, since our mocks uses localforage
 * msw should be imported before others to take effect before loader calls
*/
import "fake-indexeddb/auto"; // cleanup is done domRender
import mockServer from '../mocks/node.js';

import setupDOM from './setup-dom'
import setupfakeIndexedDB from './setup-idb.js'



import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {
  RouterProvider,
  createMemoryRouter,
  MemoryRouter,
  useLocation,
} from 'react-router-dom'


export function domRender(jsx, teardown) {
  // setup
  mockServer.listen();
  let cleanupIndexedDB = setupfakeIndexedDB();
  let cleanupDom = setupDOM({
    url: 'http://localhost:5173'
  });
  const user = userEvent.setup({document: global.document}) // opts generally not needed. but throws error other

  teardown(() => {
    mockServer.close()
    cleanup();
    cleanupIndexedDB();
    cleanupDom();
  });

  return {
    screen: render(jsx),
    user,
  }
};

/**
 * Non-Data router
*/
export function domRenderWithRouter(jsx, teardown) {
  let jsxWithRouter = (
    <MemoryRouter  initialEntries={['/']}>
      {jsx}
    </MemoryRouter>
  );
  return domRender(jsxWithRouter, teardown);
}

/**
 * Testing Data router
*/
export function domRenderWithRouterProvider(routes, teardown) {
  let router = createMemoryRouter(routes);
  return domRender(<RouterProvider router={router} />, teardown);
};

/**
 * To test url change, this is the way
*/
export const LocationDisplay = () => {
  const { pathname, search } = useLocation();
  return (
    <div data-testid="location-display" >
      {pathname}{search}
    </div>
  )
};



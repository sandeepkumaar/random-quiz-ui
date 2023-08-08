/*msw should be imported before others to take effect before loader calls*/
import mockServer from '../mocks/node.js';

import { GlobalRegistrator } from '@happy-dom/global-registrator';
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
  //mockServer.printHandlers();
  GlobalRegistrator.register();
  //location.href = 'http://localhost:5173'
  const user = userEvent.setup({document: globalThis.document}) // opts generally not needed. but throws error other
  teardown(() => {
    mockServer.close()
    cleanup();
    GlobalRegistrator.unregister();
  });
  return {
    screen: render(jsx),
    user,
  }
};

/**
 * To test components which uses react router Componets like Link, etc
*/
export function domRenderWithRouter(jsx, teardown) {
  let jsxWithRouter = (
    <MemoryRouter  initialEntries={['/']}>
      {jsx}
    </MemoryRouter>
  );
  return domRender(jsxWithRouter, teardown);
}


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



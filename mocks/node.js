import { setupServer } from 'msw/node'
import handlers from './services';



const mockServer = setupServer(
  ...handlers,
);

/**
 * Start mockserver on import to avoid api calls before mock setup
*/
//const mockServer = server.listen();
export default mockServer;


import { GlobalWindow } from 'happy-dom';

let registered = [];
export default function setup(opts) {
  if (registered.length) {
    throw new Error('Failed to register. Happy DOM has already been globally registered.');
  }
  const window = new GlobalWindow({
    url: 'http://localhost:5173',
    ...opts,
  });

  for (const key of Object.keys(window)) {
    if (global[key] === undefined && key !== 'undefined') {
      global[key] = window[key];
      registered.push(key);
    }
  };
  return teardown;
};

export function teardown() {
  if (!registered.length) {
    throw new Error(
      'Failed to unregister. Happy DOM has not previously been globally registered.'
    );
  }
  while (registered.length) {
    const key = registered.pop();
    delete global[key];
  };

}


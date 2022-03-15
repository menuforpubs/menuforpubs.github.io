import { createBrowserHistory } from 'history';

const history = createBrowserHistory({});

export const navigateToPath = history.push;

export default history;

import app from './app';
import variables from './variables';
import { createServerInstance } from './utilities';

const server = createServerInstance(variables.app.port, 'signup-service:notification', app);

export default server;
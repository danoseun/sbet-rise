import variables from '../variables';
import Redis from 'ioredis';

const redis = new Redis(variables.services.redis as string);

export default redis;
import variables from '@src/variables';
import Redis from 'ioredis';

const redis = new Redis(variables.services.redis as string);

export default redis;
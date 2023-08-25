import { seedUsers } from './user';
import { logger } from '../../utilities'

(async () => {
    try {
      await seedUsers();
    } catch (error) {
      logger.error(`ERROR IN SEEDING DATA ${error}`);
    }
  })();
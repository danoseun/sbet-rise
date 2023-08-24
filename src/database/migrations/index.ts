import { createUserTable } from '../models';
import { logger } from '../../utilities'

(async () => {
    try {
      await createUserTable();
    //   await seedUsers();
    } catch (error) {
      logger.error(`ERROR IN MIGRATION ${error}`);
    }
  })();
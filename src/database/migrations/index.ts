import { createUserTable } from '../models';
import { createPostTable } from '../models';
import { createCommentTable } from '../models';
import { logger } from '../../utilities'

(async () => {
    try {
      await createUserTable();
      await createPostTable();
      await createCommentTable();
    } catch (error) {
      logger.error(`ERROR IN MIGRATION ${error}`);
    }
  })();
import { createUserTable } from '../models';
import { createPostTable } from '../models';
import { createCommentTable } from '../models';
import { indexPostTableCreator } from '../models';
import { indexCommentTableCreator } from '../models';
import { logger } from '../../utilities'

(async () => {
    try {
      await createUserTable();
      await createPostTable();
      await indexPostTableCreator();
      await createCommentTable();
      await indexCommentTableCreator();
    } catch (error) {
      logger.error(`ERROR IN MIGRATION ${error}`);
    }
  })();





  

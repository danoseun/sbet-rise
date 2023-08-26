import { celebrate, Joi, Segments } from 'celebrate';

export const createPostSchema = celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        content: Joi.string().required(),
        user_id:  Joi.number().positive().required()
      })
    },
    { abortEarly: false }
  );

  export const fetchPostsForUserSchema = celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys({
        user_id: Joi.number().positive().required()
      })
    },
    { abortEarly: false }
  );
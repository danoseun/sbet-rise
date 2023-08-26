import { celebrate, Joi, Segments } from 'celebrate';

export const createCommentSchema = celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        content: Joi.string().required(),
        user_id:  Joi.number().positive().required(),
        post_id:  Joi.number().positive().required()
      })
    },
    { abortEarly: false }
  );

  export const fetchCommentsForPostSchema = celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys({
        post_id: Joi.string().required()
      })
    },
    { abortEarly: false }
  );
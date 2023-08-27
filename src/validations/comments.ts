import { celebrate, Joi, Segments } from 'celebrate';

export const createCommentSchema = celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        content: Joi.string().trim().required()
      })
    },
    { abortEarly: false }
  );

  export const fetchCoomentsForPostSchema = celebrate(
    {
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().positive().required()
      })
    },
    { abortEarly: false }
  );
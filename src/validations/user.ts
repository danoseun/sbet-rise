import { celebrate, Joi, Segments } from 'celebrate';


export const createUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required().trim().lowercase().messages({
        'string.email': `{{#label}} should be a valid email`,
        'string.empty': `{{#label}} is not allowed to be empty`
      }),
      name: Joi.string().trim().required(),
      password: Joi.string()
        .required()
        .trim()
        .min(8)
        .max(25)
        .regex(/[A-Z]/, 'upper-case')
        .regex(/[a-z]/, 'lower-case')
        .regex(/[^\w]/, 'special character')
        .regex(/[0-9]/, 'digits')
        .messages({
          'string.min': `{{#label}} should be a minimum of 8 characters`,
          'string.max': `{{#label}} should be a maximum of 25 characters`,
          'string.empty': `{{#label}} is not allowed to be empty`
        })
    })
  },
  {
    abortEarly: false
  }
);


export const loginUserSchema = celebrate(
    {
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().email().required().trim().lowercase().messages({
          'string.email': `{{#label}} should be a valid email`,
          'string.empty': `{{#label}} is not allowed to be empty`
        }),
        password: Joi.string()
          .required()
          .trim()
      })
    },
    {
      abortEarly: false
    }
  );



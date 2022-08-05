import Joi from "joi";

const signupSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required(),
    confirmPassword: Joi.string().trim().required()
});

export default signupSchema;
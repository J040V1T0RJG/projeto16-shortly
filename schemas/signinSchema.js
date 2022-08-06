import Joi from "joi";

const signinSchema = Joi.object({
    email: Joi.string().email().trim().required(),
    password: Joi.string().trim().required()
});

export default signinSchema;
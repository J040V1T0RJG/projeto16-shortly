import Joi from "joi";

const urlSchema = Joi.object({
    url: Joi.string().uri().trim().required()
});

export default urlSchema;
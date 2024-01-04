import Joi from "joi";

export const structure = [
  {
    name: "name",
    type: "text",
    label: "name",
    required: true,
    block: false,
  },
  {
    name: "author",
    type: "text",
    label: "author",
    required: true,
    block: false,
  },
  {
    name: "category",
    type: "text",
    label: "category",
    required: true,
    block: true,
  },
  {
    name: "price",
    type: "number",
    label: "price",
    required: true,
    block: false,
  },
  {
    name: "image",
    type: "file",
    label: "image",
    required: true,
    block: false,
  },
  {
    name: "condition",
    type: "text",
    label: "condition",
    required: true,
    block: false,
  },
  {
    name: "book_parts",
    type: "number",
    label: "book_parts",
    required: true,
    block: false,
  },
  {
    name: "stock",
    type: "number",
    label: "stock",
    required: true,
    block: false,
  },
  {
    name: "hand",
    type: "number",
    label: "hand",
    required: true,
    block: false,
  },
  {
    name: "publishing_year",
    type: "number",
    label: "publishing_year",
    required: true,
    block: false,
  },
  {
    name: "translation",
    type: "text",
    label: "translation",
    required: true,
    block: false,
  },

  {
    name: "publisher",
    type: "text",
    label: "publisher",
    required: true,
    block: false,
  },
  {
    name: "description",
    type: "text",
    label: "description",
    required: true,
    block: false,
  },
];

export const pattern = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!#.])[A-Za-z\\d$@$!%*?&.]{8,20}"
);

export const signupSchema = Joi.object({
  name: Joi.string().min(2).required(),
  author: Joi.string().min(2).required(),
  category: Joi.string().min(2).required(),
  price: Joi.number().min(1).required(),
  image: Joi.string().required(),
  condition: Joi.string().min(2).required(),
  book_parts: Joi.number().min(1).required(),
  stock: Joi.number().min(1).required(),
  hand: Joi.number().min(1).required(),
  publishing_year: Joi.number().min(1000).max(9999).required(),
  translation: Joi.string().min(2).required(),
  publisher: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
});

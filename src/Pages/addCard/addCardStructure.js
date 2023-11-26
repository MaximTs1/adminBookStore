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
    type: "text",
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
  name: Joi.string().required(),
  author: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  condition: Joi.string().required(),
  book_parts: Joi.number().required(),
  stock: Joi.number().required(),
  hand: Joi.number().required(),
  publishing_year: Joi.number().required(),
  translation: Joi.string().required(),
  publisher: Joi.string().required(),
  description: Joi.string().required(),
});

export const authors = [
  {
    value: "Choose a Author",
    label: "Choose a Author",
  },
  {
    value: "J.K Rollings",
    label: "J.K Rollings",
  },
  {
    value: "Harlen Koban",
    label: "Harlen Koban",
  },
  {
    value: "Yuval Noah Harari",
    label: "Yuval Noah Harari",
  },
  {
    value: "פאולו קואלו",
    label: "פאולו קואלו",
  },
];

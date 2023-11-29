import Joi from "joi";

export const structure = [
  {
    name: "firstName",
    type: "text",
    label: "firstName",
    required: true,
    block: false,
  },
  {
    name: "lastName",
    type: "text",
    label: "lastName",
    required: true,
    block: false,
  },
  {
    name: "phone",
    type: "tel",
    label: "phone",
    required: true,
    block: false,
  },
  {
    name: "email",
    type: "email",
    label: "email",
    required: true,
    block: false,
  },

  {
    name: "city",
    type: "text",
    label: "city",
    required: true,
    block: false,
  },
  {
    name: "street",
    type: "text",
    label: "street",
    required: true,
    block: false,
  },
  {
    name: "houseNumber",
    type: "number",
    label: "houseNumber",
    required: true,
    block: false,
  },
  {
    name: "zip",
    type: "number",
    label: "zip",
    required: true,
    block: false,
  },
];

export const pattern = new RegExp(
  "(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!#.])[A-Za-z\\d$@$!%*?&.]{8,20}"
);

export const UserManageSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.number().required(),
  city: Joi.string().required(),
  street: Joi.number().required(),
  houseNumber: Joi.number().required(),
  zip: Joi.number().required(),
});

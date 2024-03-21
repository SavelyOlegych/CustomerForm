import { helpers } from "vuelidate/lib/validators";

export const isDate = (value) => {
  const dateRegex = /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/;

  return !helpers.req(value) || dateRegex.test(value);
}

export const isPhone = (value) => {
  return !helpers.req(value) || String(value)[0] === "7";
}

export const isArrayNotEmpty = (value) => {
  return value.length > 0;
}
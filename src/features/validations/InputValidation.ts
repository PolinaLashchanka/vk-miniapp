import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z]+$/, "Only English letters can be used"),
});

export const inputResolver = yupResolver(schema);

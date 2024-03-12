import { userErrors } from "./users.errors";
import { campingErrors } from "./camping.errors";
const errorDictinoray = {
  userErros: {
    ...userErrors,
  },
  campingErrors: {
    ...campingErrors,
  },
};

export default errorDictinoray;

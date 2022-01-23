import { genSalt, hash } from "bcrypt";

const encryptString = async (text: string) => {
  const salt = await genSalt(10);
  return hash(text, salt);
};

export { encryptString };

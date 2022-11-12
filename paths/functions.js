import { userModel } from "../UserClass/User";
import { encryptPassword } from "../utility/bcrypt";
import { sendErrorResponse, sendSuccessResponse } from "../utility/response";
import { passwordStrength } from "check-password-strength";

export const createUserFunction = async (req, res) => {
  try {
    const { name, email, paHassword } = req.body;
    if (email === undefined || password === undefined) {
      throw new Error("Arguments Missing");
    }
    const ans = passwordStrength(password).value;
    if (ans === "Weak") throw new Error("Password is Weak");
    const hashPassword = await encryptPassword(password);
    console.log(hashPassword)
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });
    console.log(user)
    sendSuccessResponse(res, user);
  } catch (error) {
    sendSuccessResponse(res, error.message);
  }
};

export const updateFunction = async (req, res) => {
  try {
    const { oldEmail, name, password } = req.body;
    if (
      oldEmail === undefined ||
      password === undefined
    ) {
      throw new Error("Arguments Missing");
    }
    const user = await userModel.findOne({ email: oldEmail });
    if (user === null) throw new Error("User Not Found");

    if (password !== undefined) {
      const hashPassword = await encryptPassword(password);
      user.password = hashPassword;
    }
    if (name !== undefined) {
      user.full_name = name;
    }

    await user.save();
    sendSuccessResponse(res, user);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const deleteFunction = async (req, res) => {
  try {
    const { email } = req.body;
    if (email === undefined) {
      throw new Error("Arguments Missing");
    }
    const user = await userModel.findOne({ email });
    if (user === null) throw new Error("User Not Found");
    await user.remove();
    sendSuccessResponse(res, "Successfully Removed");
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    sendSuccessResponse(res, users);
  } catch (error) {
    sendErrorResponse(res, error.message);
  }
};

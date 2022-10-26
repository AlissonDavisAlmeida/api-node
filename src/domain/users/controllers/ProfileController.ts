import { Request, Response } from "express";
import { instanceToInstance } from "class-transformer";
import { ShowProfile } from "../services/showProfile";
import { UpdateProfile } from "../services/updateProfile";

export class ProfileController {
  async show(request: Request, response: Response) {
    const showProfile = new ShowProfile();

    const user_id = request.user.id;

    const user = await showProfile.execute({ user_id });

    return response.json(instanceToInstance(user));
  }

  async update(request: Request, response: Response) {
    const {
      name, email, password, old_password,
    } = request.body;

    const user_id = request.user.id;

    const updateProfile = new UpdateProfile();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(instanceToInstance(user));
  }
}

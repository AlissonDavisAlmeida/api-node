import { Request, Response } from "express";
import { UpdateAvatar } from "../services/updateAvatar";

export class AvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateAvatar();

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename || "",
    });

    return response.json(user);
  }
}

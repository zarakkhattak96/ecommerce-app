import { LoginDto } from "@app/dto/auth/auth.dto";
import { AuthResponseType, AuthService } from "@app/services/auth/auth.service";
import authConfig from "@infra/config/auth.config";
import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

@injectable()
export class AuthController {
  constructor(@inject("AuthService") private readonly authServ: AuthService) {}

  login = async (req: Request, res: Response) => {
    const dto = LoginDto.create(req.body, req._user);

    const resp = await this.authServ.login(dto);

    const resps = resp as AuthResponseType;

    if (resps) {
      if (resps.redirectUrl) {
        res.status(307).send(resp); // temporary redirect
      }
    }

    if (!resps.authToken && !resps.redirectUrl) {
      return res.status(500).send({
        message: "Could not encode auth token", //internal server error
        code: "authentication_failed",
      });
    }

    if (resp.status === "fail") {
      res.status(404).send(resps);
    }

    const { authToken, message, status } = resps;

    if (authToken) {
      res.cookie("token", authToken, {
        httpOnly: true,
        maxAge: authConfig.JWT_EXPIRATION_SECONDS,
        secure: true,
        sameSite: "none",
        path: "/login",
        domain: req.hostname,
      });
    }

    return res.status(200).send({ message, status });
  };
}

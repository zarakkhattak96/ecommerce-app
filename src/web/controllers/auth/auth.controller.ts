import { LoginDto } from "@app/dto/auth/auth.dto";
import { AuthResponseType, AuthService } from "@app/services/auth/auth.service";
import authConfig from "@infra/config/auth.config";
import { TOKEN_COOKIE_NAME } from "@shared/constants";
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
      res.cookie(TOKEN_COOKIE_NAME, authToken, {
        httpOnly: true,
        maxAge: authConfig.JWT_EXPIRATION_SECONDS,
        secure: true,
        sameSite: "none",
        path: "/",
        domain: req.hostname,
      });
    }

    return res.status(200).send({ message, status });
  };

  logout = (req: Request, res: Response) => {
    const respObject = {
      type: "logout",
      status: "success",
      messages: "User has been logged out successfully",
    };

    return res
      .clearCookie(TOKEN_COOKIE_NAME, {
        httpOnly: true,
        // maxAge: 0,
        secure: true,
        expires: new Date(),
        domain: req.hostname,
        path: "/",
      })
      .status(200)
      .send(respObject);
  };
}

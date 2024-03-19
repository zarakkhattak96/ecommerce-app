import { JwtPayload, JwtService } from '@app/services/jwt.service';
import authConfig from '@infra/config/auth.config';
import { createSigner, createVerifier } from 'fast-jwt';
import { Provider } from 'tsyringe';

const signer = createSigner({
  expiresIn: authConfig.JWT_EXPIRATION_SECONDS,
  key: authConfig.JWT_SECRET,
  algorithm: 'HS256',
});

const verifier = createVerifier({
  key: authConfig.JWT_SECRET,
  cache: true,
});

export class JwtServiceProv extends JwtService {
  async sign(payload: JwtPayload): Promise<string> {
    return signer(payload);
  }

  async verify(
    token: string,
  ): Promise<{ payload: JwtPayload; expiresAt: number }> {
    const res = verifier(token);

    return { payload: res as JwtPayload, expiresAt: res.exp };
  }
}

// export const JwtServiceProvider: Provider<JwtService> = {
//   useClass: JwtServiceProv,
// };

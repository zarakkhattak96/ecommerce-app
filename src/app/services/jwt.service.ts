export interface JwtPayload {
  sub: string;
  // secret: string;
}

export abstract class JwtService {
  abstract sign(payload: JwtPayload): Promise<string>;

  abstract verify(
    token: string,
  ): Promise<{ payload: JwtPayload; expiresAt: number }>;
}

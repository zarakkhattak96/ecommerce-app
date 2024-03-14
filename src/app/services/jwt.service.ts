export interface JwtPayload {
  sub: string;
  //   app_metadata?: { organization_ids: number[] };
}

export abstract class JwtService {
  abstract sign(payload: JwtPayload): Promise<string>;

  abstract verify(
    token: string,
  ): Promise<{ payload: JwtPayload; expiresAt: number }>;
}

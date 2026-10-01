import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from 'src/features/users/users.service';

export interface JwtPayload {
  sub: number;
}

export interface JwtUser {
  userId: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtUser> {
    // la fonction validate de passeport retourne req.user par convention
    // Flow:
    // 1. le client envoie un token JWT
    // 2. le JwtAuthGuard intercepte la requête
    // 3. la stratégie JWT valide le token
    // 4. validate() est exécuté
    // 5. ce que validate() retourne devient req.user
    // 6. tes endpoints utilisent req.user pour savoir qui appelle l’API

    return {
      userId: payload.sub,
    };
  }
}

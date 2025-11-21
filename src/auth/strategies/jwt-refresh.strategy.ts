import { Injectable, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';
import { StrategyOptionsWithRequest } from "passport-jwt";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        const secret = process.env.JWT_REFRESH_SECRET;
        if(!secret) throw new NotFoundException('Envirnoment variable missing');

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: secret,
            passReqToCallback: true,
        } as StrategyOptionsWithRequest);
    }

    async validate(req: Request, payload: any) {
        const refreshToken = req.body.refresh_token;

        if(!refreshToken) throw new UnauthorizedException('Refresh token no válido');

        return {
            ...payload,
            refreshToken,
        }
    }
}
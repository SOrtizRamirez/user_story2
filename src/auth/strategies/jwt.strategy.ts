import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        const secret = process.env.JWT_SECRET;
        if(!secret) throw new NotFoundException('Envirnoment variable missing')

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // si el token está vencido: 401
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        // payload es el contenido del token: { id, email, role, etc }
        console.log(payload);
        return {
            id: payload.sub,
            email: payload.email,
            role: payload.role
        };
    }
}

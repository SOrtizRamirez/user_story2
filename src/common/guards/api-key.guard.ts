import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyService } from '../../api-key/api-key.service';
import { API_KEY_SCOPES_KEY } from '../decorators/api-key-scopes.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly apiKeyService: ApiKeyService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request & any>();

    const apiKeyHeader =
      request.headers['x-api-key'] || request.headers['X-API-KEY'];

    if (!apiKeyHeader) {
      throw new UnauthorizedException('x-api-key header is missing');
    }

    const apiKey = await this.apiKeyService.validateApiKey(
      String(apiKeyHeader),
    );

    if (!apiKey) {
      throw new UnauthorizedException('Invalid API key');
    }

    const requiredScopes =
      this.reflector.getAllAndOverride<string[]>(API_KEY_SCOPES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) || [];

    const hasScopes =
      this.apiKeyService.hasRequiredScopes(apiKey, requiredScopes);

    if (!hasScopes) {
      throw new ForbiddenException(
        'API key does not have the required scopes',
      );
    }

    (request).apiKey = apiKey;

    return true;
  }
}

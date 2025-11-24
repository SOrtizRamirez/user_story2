import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiKey } from './api-key.entity';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private readonly apiKeyRepository: Repository<ApiKey>,
  ) {}

  async validateApiKey(key: string): Promise<ApiKey | null> {
    if (!key) return null;

    const apiKey = await this.apiKeyRepository.findOne({
      where: { key, isActive: true },
    });

    return apiKey || null;
  }

  hasRequiredScopes(apiKey: ApiKey, requiredScopes: string[]): boolean {
    if (!requiredScopes || requiredScopes.length === 0) return true;

    const keyScopes = apiKey.scopes
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    return requiredScopes.every((scope) => keyScopes.includes(scope));
  }
}

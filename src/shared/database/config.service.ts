import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { join } from 'path';

config();
export class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return <string>value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.getValue('DATABASE_URL'),
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [join(__dirname, '../../', '**', '*.entity.{ts,js}')], // ✅ Auto-detect entities
      synchronize: true, // ⚠️ DEV ONLY: Auto-creates tables
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DATABASE_URL',
]);
export { configService };

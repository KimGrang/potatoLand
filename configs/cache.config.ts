import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";

export const cacheModuleOptions: CacheModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get<string>("REDIS_HOST"),
    port: configService.get<number>("REDIS_PORT"),
    username: configService.get<string>("REDIS_USERNAME"),
    password: configService.get<string>("REDIS_PASSWORD"),
    no_ready_check: true,
  }),
};

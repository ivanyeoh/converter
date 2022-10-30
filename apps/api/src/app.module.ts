import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocConvertController } from './doc-convert.controller';
import { DocConvertService } from './doc-convert.service';
import config from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [DocConvertController],
  providers: [DocConvertService],
})
export class AppModule {}

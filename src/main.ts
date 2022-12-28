import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3030;

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.setGlobalPrefix('/api');

  await app.listen(port);
}
bootstrap();

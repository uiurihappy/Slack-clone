import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3030;

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //   }),
  // );
  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  app.setGlobalPrefix('/api');

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Slack API')
    .setDescription('Slack API Docs')
    .setVersion('0.0.1')
    .addCookieAuth('connect.sid')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(port);
}
bootstrap();

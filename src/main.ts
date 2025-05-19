import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request, Response, NextFunction } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  //Create Nest factory for run the Auto Refresh Pipeline
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  ); //Enabling CORS for localhost 3000 only
  app.enableCors({
    //This Allows Only locahost 3000
    origin: 'http://localhost:3000',
    //This Allows only GET and POST Method which we define in this
    methods: ['GET', 'POST'],
    //This Allows particular header which we define in this
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('File Upload Microservice')
    .setDescription('Secure file upload and async processing API')
    .setVersion('1.0')
    .addBearerAuth() // Adds Authorization: Bearer <token> globally
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  //Setting Up the Res Header
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  //Listen on this Particular PORT
  await app.listen(process.env.PORT);
}
bootstrap();

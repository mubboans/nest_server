import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { RouteNotFoundMiddleware } from './common/middlewares/route-not-found.middleware';
import { GlobalExceptionFilter } from './common/filters/global-exception/global-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true, // Allow all origins (or specify your frontend URL)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization, Content-Type',
    credentials: true,
  });
  // Add all middleware and filters BEFORE app.listen()
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter());

  const options = new DocumentBuilder()
  .setTitle('Nest JS Example')
  .setDescription('Nest API description')
  .setVersion('1.0')
  .addBearerAuth({
    type:'http',
    scheme:'bearer',
    bearerFormat:'JWT',
    name:'Bearer Token',
    description:'Enter Bearer Token',
    in:'headers'
  },"JWT-auth")
  .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Listen should be the last call
  await app.listen(process.env.PORT ?? 3002);
  app.use(new RouteNotFoundMiddleware().use);
}
bootstrap();

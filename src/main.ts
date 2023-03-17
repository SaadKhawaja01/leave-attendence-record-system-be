import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //addBearerAuth is added for jwt
  const config = new DocumentBuilder().addBearerAuth()
  //for swagger config
  .setTitle('Leave-Attendence-Record-System')
  .setDescription('My University Project')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();

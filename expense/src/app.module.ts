import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus'
import { LoggerMiddleware } from './middleware/logger.middleware';


@Module({
  imports: [
    PrometheusModule.register({
      defaultMetrics: {
        enabled: false,
      }
    }),
    ConfigModule.forRoot({
      envFilePath: '.env.' + process.env.NODE_ENV,
    }),
    ExpenseModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT as unknown as number,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true, // wird auf false gesetzt, wenn wird das deployen werden
    }),
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

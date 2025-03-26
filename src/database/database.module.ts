import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DatabaseService } from "./database.service";
import { User } from "./entities/user.entity";
import { Address } from "./entities/address.entity";
import { Category } from "./entities/category.entity";
import { Discount } from "./entities/discount.entity";
import { OrderItem } from "./entities/order-item.entity";
import { Order } from "./entities/order.entity";
import { Payment } from "./entities/payment.entity";
import { PaymentMethod } from "./entities/payment-method.entity";
import { ProductVariant } from "./entities/product-variant.entity";
import { Product } from "./entities/product.entity";
import { Review } from "./entities/review.entity";
import { Shipping } from "./entities/shipping.entity";
import { Tag } from "./entities/tag.entity";
import { Wishlist } from "./entities/wishlist.entity";
import { RefreshToken } from "./entities/refreshToken.entity";
import * as crypto from 'crypto';
// (global as any).crypto = crypto;

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(
          "Database Config:",
          configService.get<string>("DB_HOST"),
          configService.get<string>("DB_PORT"),
          configService.get<string>("DB_USERNAME"),
          configService.get<string>("DB_PASSWORD"),
          configService.get<string>("DB_NAME")
        );

        return {
          type: "postgres",
          host: configService.get<string>("DB_HOST"),
          port: Number(configService.get<string>("DB_PORT")),
          username: configService.get<string>("DB_USERNAME"),
          password: configService.get<string>("DB_PASSWORD"),
          database: configService.get<string>("DB_NAME"),
          autoLoadEntities: true,
          synchronize: true,
          entities: [
            User,
            Address,
            Category,
            Discount,
            OrderItem,
            Order,
            Payment,
            PaymentMethod,
            ProductVariant,
            Product,
            Review,
            Shipping,
            Tag,
            Wishlist,
            RefreshToken
          ],
          // migrations: ["src/database/migrations/*.ts"],
          migrations: [__dirname + "/migrations/*.{js}"] 
        };
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

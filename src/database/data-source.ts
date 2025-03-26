// import "reflect-metadata";
// import { DataSource, DataSourceOptions } from "typeorm";
// import * as dotenv from "dotenv";
// import { Client } from "pg"; // Import pg Client for manual database creation
// import { User } from "./entities/user.entity";
// import { Address } from "./entities/address.entity";
// import { Category } from "./entities/category.entity";
// import { Discount } from "./entities/discount.entity";
// import { OrderItem } from "./entities/order-item.entity";
// import { Order } from "./entities/order.entity";
// import { Payment } from "./entities/payment.entity";
// import { PaymentMethod } from "./entities/payment-method.entity";
// import { ProductVariant } from "./entities/product-variant.entity";
// import { Product } from "./entities/product.entity";
// import { Review } from "./entities/review.entity";
// import { Shipping } from "./entities/shipping.entity";
// import { Tag } from "./entities/tag.entity";
// import { Wishlist } from "./entities/wishlist.entity";
// import { RefreshToken } from "./entities/refreshToken.entity";


// dotenv.config();

// // Database configuration
// const databaseConfig: DataSourceOptions = {
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   entities: [
//     User,
//   Address,
//   Category,
//   Discount,
//   OrderItem,
//   Order,
//   Payment,
//   PaymentMethod,
//   ProductVariant,
//   Product,
//   Review,
//   Shipping,
//   Tag,
//   Wishlist,
//   RefreshToken,
//   ],
//   migrations: [__dirname + "/../migrations/*.{ts,js}"],
//   synchronize: false,
//   logging: process.env.NODE_ENV === "development",
//   ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
//   migrationsTableName: "custom_migrations_table",
// };

// // Function to check and create the database if it doesn't exist
// async function ensureDatabaseExists() {
//   const client = new Client({
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     user: process.env.DB_USERNAME, // Use `user` instead of `username` for `pg`
//     password: process.env.DB_PASSWORD,
//     database: "postgres", // Connect to default `postgres` DB to check existence
//   });

//   try {
//     await client.connect();

//     // Check if the database exists
//     const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [process.env.DB_NAME]);

//     if (result.rowCount === 0) {
//       console.log(`Database "${process.env.DB_NAME}" does not exist. Creating...`);
//       await client.query(`CREATE DATABASE "${process.env.DB_NAME}";`);
//       console.log(`Database "${process.env.DB_NAME}" created successfully.`);
//     } else {
//       console.log(`Database "${process.env.DB_NAME}" already exists.`);
//     }
//   } catch (error) {
//     console.error("Error checking/creating database:", error);
//   } finally {
//     await client.end();
//   }
// }

// // Initialize database connection
// async function initializeDatabase() {
//   await ensureDatabaseExists(); // First, ensure the database exists

//   const AppDataSource = new DataSource(databaseConfig);
//   try {
//     await AppDataSource.initialize();
//     console.log("Database connected successfully!");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     process.exit(1); // Exit the process if DB fails to connect
//   }
// }

// export { initializeDatabase, databaseConfig };


import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { Client } from "pg"; 
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

dotenv.config();

const databaseConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
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
    RefreshToken,
  ],
  migrations: [__dirname + "/../migrations/*.{ts,js}"],
  synchronize: false,
  logging: process.env.NODE_ENV === "development",
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  migrationsTableName: "custom_migrations_table",
};

// ✅ Explicitly export AppDataSource
export const AppDataSource = new DataSource(databaseConfig);

// ✅ Ensure database creation before initializing TypeORM
async function ensureDatabaseExists() {
  const client = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "postgres", // Connect to default DB
  });

  try {
    await client.connect();
    const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [process.env.DB_NAME]);

    if (result.rowCount === 0) {
      console.log(`Database "${process.env.DB_NAME}" does not exist. Creating...`);
      await client.query(`CREATE DATABASE "${process.env.DB_NAME}";`);
      console.log(`Database "${process.env.DB_NAME}" created successfully.`);
    } else {
      console.log(`Database "${process.env.DB_NAME}" already exists.`);
    }
  } catch (error) {
    console.error("Error checking/creating database:", error);
  } finally {
    await client.end();
  }
}

// ✅ Initialize Database
async function initializeDatabase() {
  await ensureDatabaseExists();
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

export { initializeDatabase };

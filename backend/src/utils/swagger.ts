// src/swagger.ts
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Real State API",
    version: "1.0.0",
    description: "API documentation for Real Estate app"
  },
  servers: [
    {
      url: process.env.SERVER_URL || "http://localhost:8000"
    }
  ],
  components: {
    schemas: {
      Role: {
        type: "string",
        enum: ["SUPER_ADMIN", "ADMIN", "USER"],
        description: "User roles"
      },
      Types: {
        type: "string",
        enum: ["SELL", "RENT"],
        description: "Property types"
      },
      Status: {
        type: "string",
        enum: ["SUCCESS", "PENDING", "CANCELLED"],
        description: "Status for booking and payment"
      },
      PaymentMethods: {
        type: "string",
        enum: ["ESEWA", "KHALTI", "CASH"],
        description: "Payment methods"
      },
      DuratinType: {
        type: "string",
        enum: ["NIGHT", "DAY", "MONTH", "YEAR", "LIFE_TIME"],
        description: "Duration types for properties"
      },

      Users: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          fullName: { type: "string" },
          email: { type: "string", format: "email" },
          password: { type: "string" },
          otp: { type: "string" },
          otpExpires: { type: "string", format: "date-time" },
          isVerified: { type: "boolean" },
          role: { $ref: "#/components/schemas/Role" },
          status: { type: "boolean" },
          isDelete: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "fullName", "email", "password"]
      },

      UsersDetail: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          phoneNumber: { type: "string", nullable: true },
          address: { type: "string", nullable: true },
          userId: { type: "integer", format: "int32" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "userId"]
      },

      Properties: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          title: { type: "string" },
          price: { type: "integer" },
          location: { type: "string" },
          description: { type: "string" },
          map: { type: "string" },
          userId: { type: "integer", format: "int32" },
          categoryId: { type: "integer", format: "int32" },
          type: { $ref: "#/components/schemas/Types" },
          status: { type: "boolean" },
          isDelete: { type: "boolean" },
          isHotel: { type: "boolean" },
          duration: { type: "integer" },
          durationType: { $ref: "#/components/schemas/DuratinType" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "title", "price", "location", "description", "userId", "categoryId", "type"]
      },

      Category: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          name: { type: "string" },
          isActive: { type: "boolean" },
          isDelete: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "name"]
      },

      Images: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          image: { type: "string" },
          serviceId: { type: "integer", format: "int32", nullable: true },
          propertyId: { type: "integer", format: "int32", nullable: true },
          userDetailId: { type: "integer", format: "int32", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "image"]
      },

      WishList: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          propertyId: { type: "integer", format: "int32" },
          userId: { type: "integer", format: "int32" },
          isDelete: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "propertyId", "userId"]
      },

      Booking: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          propertyId: { type: "integer", format: "int32" },
          userId: { type: "integer", format: "int32" },
          checkIn: { type: "string", format: "date-time", nullable: true },
          checkout: { type: "string", format: "date-time", nullable: true },
          status: { $ref: "#/components/schemas/Status" },
          isDelete: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "propertyId", "userId", "status"]
      },

      Reviews: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          rating: { type: "number", format: "float" },
          message: { type: "string" },
          propertyId: { type: "integer", format: "int32" },
          userId: { type: "integer", format: "int32" },
          status: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "rating", "message", "propertyId", "userId"]
      },

      Payment: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          status: { $ref: "#/components/schemas/Status" },
          paymentAmount: { type: "number", format: "float" },
          paymentMethod: { $ref: "#/components/schemas/PaymentMethods" },
          userId: { type: "integer", format: "int32" },
          bookingId: { type: "integer", format: "int32" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "status", "paymentAmount", "paymentMethod", "userId", "bookingId"]
      },

      Services: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          name: { type: "string" },
          userId: { type: "integer", format: "int32" },
          status: { type: "boolean" },
          isDelete: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "name", "userId"]
      },

      PropertyService: {
        type: "object",
        properties: {
          id: { type: "integer", format: "int32" },
          propertyId: { type: "integer", format: "int32" },
          serviceId: { type: "integer", format: "int32" },
          status: { type: "boolean" },
          isDelete: { type: "boolean" },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" }
        },
        required: ["id", "propertyId", "serviceId"]
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts'], // your route files with swagger comments
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express): void {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

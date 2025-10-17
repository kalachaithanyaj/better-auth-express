import { betterAuth } from "better-auth";
import { createPool } from "mysql2/promise";
import { toNodeHandler } from "better-auth/node";
import dotenv from "dotenv";

dotenv.config();

const baseAuth = betterAuth({
  database: createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: "Z",
  }),

  jwt: {
    enabled: true,
    secret: process.env.AUTH_SECRET,
    expiresIn: "1d",
  },

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },


  emailVerification: {
    enabled: true,
    sendVerificationEmail: async (params) => {
      const { user, token, url } = params; 
      
      if (token) {
        console.log(` Verification token for ${user.email}: ${token}`);
       
      } else {
        console.log('ERROR: Verification token is undefined!');
        
      }
    },
  },
  
  providers: [
    {
      type: "credentials",
      authorize: async (credentials, db) => {
        const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
          credentials.email,
        ]);

        const user = rows[0];
        if (!user) return null;

        if (credentials.password !== user.password) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    },
  ],
});


export const auth = toNodeHandler(baseAuth);

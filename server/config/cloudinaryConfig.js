import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

cloudinary.config({
  cloud_name: "dq8hfq1hm",
  api_key: "351783882612451",
  api_secret: "NDymMD5gosICvwoZ448M_Rkj8lw",
});

export default cloudinary;

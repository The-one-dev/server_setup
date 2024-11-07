// export const BASE_URL = "/api/v1";

import { getEnvironment } from "../functions/global-utilities";

// export const ROLES = ["superadmin", "user"];

// export const GENDERS = ["Male", "Female", "Other"];

// export const EMPLOYMENT_TYPE = [
//   "Full-time",
//   "Part-time",
//   "Contract",
//   "Internship",
// ];

// export const WORK_MODE = ["Remote", "On-site", "Hybrid"];

const baseUrl = "/api/v1";

const roles = {
  superAdmin: "super admin",
  user: "user",
};

const saltRounds = 15;

const environment = getEnvironment();

export const CONSTANTS = {
  baseUrl,
  roles,
  environment,
  saltRounds,
};

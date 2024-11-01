export const BASE_URL = "/api/v1";

export const ROLES = ["superadmin", "organization", "employee"];

export const GENDERS = ["Male", "Female", "Other"];

export const EMPLOYMENT_TYPE = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
];

export const WORK_MODE = ["Remote", "On-site", "Hybrid"];

export const ERRORS = {
  notAuthenticated: "You are not authenticated",
  notPermitted: "You are not permitted",
  invalidCredentials: "Invalid credentials",
  serverError:
    "An error occurred and this is our fault, please try again later",
};

// import Joi from "joi";
// import {
//   EMPLOYMENT_TYPE,
//   GENDERS,
//   WORK_MODE,
// } from "../../../utilities/constants";

// const name = Joi.string()
//   .pattern(/^([a-z]|[A-Z])+$/)
//   .min(3)
//   .max(30)
//   .trim();

// const gender = Joi.string()
//   .trim()
//   .valid(...GENDERS)
//   .messages({
//     "string.base": "Gender must be a string",
//     "any.only": `Gender must be one of ${GENDERS}`,
//     "any.required": "Gender is required",
//   });

// const email = Joi.string().email().trim().lowercase().messages({
//   "string.email": "Email must be a valid email address",
//   "string.empty": "Email cannot be empty",
//   "any.required": "Email is required",
// });

// const employmentType = Joi.string()
//   .trim()
//   .valid(...EMPLOYMENT_TYPE)
//   .messages({
//     "string.base": "Employment type must be a string",
//     "any.only": `Employment type must be one of ${EMPLOYMENT_TYPE}`,
//     "any.required": "Employment type is required",
//   });

// const date = Joi.date().iso();

// export const teamValidatorSchemas = {
//   createTeamMember: Joi.object().keys({
//     personalDetails: Joi.object().keys({
//       firstName: name.required().messages({
//         "string.base": "First name must be a string",
//         "string.empty": "First name cannot be empty",
//         "string.min": "First name should have at least 3 characters",
//         "string.max": "First name should not exceed 30 characters",
//         "any.required": "First name is required",
//       }),
//       lastName: name.required().messages({
//         "string.base": "Last name must be a string",
//         "string.empty": "Last name cannot be empty",
//         "string.min": "Last name should have at least 3 characters",
//         "string.max": "Last name should not exceed 30 characters",
//         "any.required": "Last name is required",
//       }),
//       gender: gender.required().lowercase(),
//       country: name.required().messages({
//         "string.base": "Country must be a string",
//         "string.empty": "Country cannot be empty",
//         "string.min": "Country should have at least 3 characters",
//         "string.max": "Country should not exceed 30 characters",
//         "any.required": "Country is required",
//       }),
//       state: name.required().messages({
//         "string.base": "State must be a string",
//         "string.empty": "State cannot be empty",
//         "string.min": "State should have at least 3 characters",
//         "string.max": "State should not exceed 30 characters",
//         "any.required": "State is required",
//       }),
//       address: Joi.string().min(10).max(100).required().messages({
//         "string.base": "Address must be a string",
//         "string.empty": "Address cannot be empty",
//         "string.min": "Address should have at least 10 characters",
//         "string.max": "Address should not exceed 100 characters",
//         "any.required": "Address is required",
//       }),
//     }),
//     employmentDetails: Joi.object()
//       .required()
//       .keys({
//         employmentType: employmentType.required(),
//         startDate: date.required().messages({
//           "date.base": "Start date must be a valid date",
//           "date.format": "Start date must be in ISO format",
//           "any.required": "Start date is required",
//         }),
//         endDate: date.greater(Joi.ref("startDate")).allow(null).messages({
//           "date.base": "End date must be a valid date",
//           "date.greater": "End date must be later than the start date",
//         }),
//         resumptionTime: Joi.string()
//           .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
//           .required()
//           .trim()
//           .messages({
//             "string.base": "Resumption time must be a string",
//             "string.empty": "Resumption time cannot be empty",
//             "string.pattern.base": "Resumption time must be in HH:mm format",
//             "any.required": "Resumption time is required",
//           }),
//         workMode: Joi.string()
//           .valid(...WORK_MODE)
//           .trim()
//           .required()
//           .messages({
//             "string.base": "Work mode must be a string",
//             "any.only": `Work mode must be one of ${WORK_MODE}`,
//             "any.required": "Work mode is required",
//           }),
//         jobTitle: Joi.string().min(3).max(50).required().trim().messages({
//           "string.base": "Job title must be a string",
//           "string.empty": "Job title cannot be empty",
//           "string.min": "Job title should have at least 3 characters",
//           "string.max": "Job title should not exceed 50 characters",
//           "any.required": "Job title is required",
//         }),
//         team: Joi.string().min(3).max(50).required().trim().messages({
//           "string.base": "Team must be a string",
//           "string.empty": "Team cannot be empty",
//           "string.min": "Team should have at least 3 characters",
//           "string.max": "Team should not exceed 50 characters",
//           "any.required": "Team is required",
//         }),
//         workEmail: email.required().messages({
//           "string.base": "Work email must be a string",
//           "string.email": "Work email must be a valid email address",
//           "string.empty": "Work email cannot be empty",
//           "any.required": "Work email is required",
//         }),
//         lineManager: name.messages({
//           "string.base": "Line manager must be a string",
//           "string.empty": "Line manager cannot be empty",
//           "string.min": "Line manager should have at least 3 characters",
//           "string.max": "Line manager should not exceed 30 characters",
//           "any.required": "Line manager is required",
//         }),
//       }),
//   }),
// };

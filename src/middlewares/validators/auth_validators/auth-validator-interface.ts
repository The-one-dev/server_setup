export interface RegistrationPayload {
  firstName: string;
  lastName: string;
  email: string;
  organizationName: string;
  password: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  password: string;
}

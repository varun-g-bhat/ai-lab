export interface loginData {
  email: string;
  password: string;
}

export interface ErrorResponse {
  message: string;
}

export interface UserDetails {
  name: string;
  profileUrl?: string;
  dob?: Date;
  role: string;
}

export interface signupData {
  email: string;
  password: string;
  userDetails: UserDetails;
}

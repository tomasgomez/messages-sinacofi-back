export interface UserInfo {
  user:        User;
  permissions: { [key: string]: boolean };
}

export interface User {
  role:            string;
  name:            string;
  institutionCode: string;
  area:            string;
  email:           string;
  status:          string;
}
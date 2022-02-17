export interface User {
  name: string;
  email: string;
  id: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}

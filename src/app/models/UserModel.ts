export interface UserModel {
    id: string;
    username: string;
    fname?: string;
    lname?: string;
    email?: string;
    ref_role_id?: string;
    role_name?: string;
    authToken?: string;
  }
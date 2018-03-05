export interface UserInfo {
  id?: string;
  username?: string;
  realname?: string;
  mobileNumber?: string;
  email?: string;
  avatarId?: string;
  departmentId?: string;
  departmentName?: string;
  roles?: Array<string>;

  avatarPath?: string;
}

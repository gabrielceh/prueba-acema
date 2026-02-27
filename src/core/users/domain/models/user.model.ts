import type { UserLocation } from './user-location.model';
import type { UserName } from './user-name.model';
import type { UserPicture } from './user-picture.module';

export interface User {
  user: UserClass;
}

export interface UserClass {
  gender:     string;
  name:       UserName;
  location:   UserLocation;
  email:      string;
  username:   string;
  password:   string;
  salt:       string;
  md5:        string;
  sha1:       string;
  sha256:     string;
  registered: number;
  dob:        number;
  phone:      string;
  cell:       string;
  PPS:        string;
  picture:    UserPicture;
}




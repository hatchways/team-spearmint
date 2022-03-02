export interface Profile {
  userId: string;
  name: string;
  description: string;
  gender: ['male', 'female', 'other'];
  address: string;
  telephone: string;
  birthday: Date;
  photo: string;
  accountType: string;
  price: number;
  caption: string;
  _id: string;
}

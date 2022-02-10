export interface Profile {
  userId: string;
  name: string;
  description: string;
  gender: ['male', 'female', 'other'];
  address: string;
  telephone: string;
  birthday: Date;
  photo: string;
  accountType: ['pet_sitter', 'pet_owner'];
  _id: string;
}

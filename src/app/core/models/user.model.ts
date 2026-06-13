export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company?: {
    name: string;
    catchPhrase: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

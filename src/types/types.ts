export type User = {
  id: string;
  username: string;
  password?: string;
};

export type Transaction = {
  description: string;
  amount: number;
  type: string;
  date: Date;
};


export interface JwtPayload {
  id: string;
  username: string;
  password: string;
}
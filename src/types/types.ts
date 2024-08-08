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

export interface SimpleTransaction {
  id: string;
  amount: number;
  type: string;
  description: string;
  date: Date;
}

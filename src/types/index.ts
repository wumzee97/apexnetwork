export interface IOptions {
  text: string;
  value: string;
  marked: boolean;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    status: string;
    last_login_at: string;
    created_at: string;
    updated_at: string;
}

export interface IPaymentData {
  id: number;
  user_id: number;
  amount: number;
  currency: string;
  payment_expected_at: string;
  payment_made_at: string;
  created_at: string;
  updated_at: string;
  status: string;
  user: IUser;
}

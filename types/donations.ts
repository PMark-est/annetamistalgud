export interface Goal {
  amountDonated: number;
  donationGoal: number;
  color: string;
  name: string;
  code: string;
  unit: string;
  link: string;
  message: string;
  description: string;
  amountOfDonations: number;
}

export interface SheetsGoals {
  type: string;
  amountDonated: number;
  donationGoal: number;
}

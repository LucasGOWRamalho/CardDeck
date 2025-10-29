export class CreateCardDto {
  holderName: string;
  number: string;
  validThru: string;
  cvv: string;
  brand: 'Visa' | 'Elo';
  bank: string;
  balance: number;
  creditLimit: number;
}
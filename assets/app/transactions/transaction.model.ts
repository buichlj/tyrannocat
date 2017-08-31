import { Account } from '../accounts/account.model'

export class Transaction {
    date: string;
    amount: number;
    note: string;
    category: string;
    account: Account;
    user: string;
    id: string;

    constructor(date: string, amount: number, note: string, category: string, account: Account, user: string, id?: string){
        this.date = date;
        this.amount = amount;
        this.note = note;
        this.category = category;
        this.account = account;
        this.user = user;
        this.id = id;
    }

    static convert (tempTransaction: string){
        let tempArray: string[] = tempTransaction.split(",");
        let num: number = tempArray.length - 10;
        let date: string = tempArray[1+num];
        let amount: number = Number(tempArray[3+num]);
        let note: string = tempArray[6+num];
        let category: string = "";
        let account: Account = null;
        let user: string = "";

        return new Transaction(date, amount, note, category, account, user);
    }

}

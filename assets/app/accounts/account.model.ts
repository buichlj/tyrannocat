import { AccountCategory } from '../categories/account_category.model';
export class Account {
    name: string;
    amount: number;
    account: Account;
    category: AccountCategory;
    user: string;
    id: string;

    constructor(name: string, amount: number, account: Account, category: AccountCategory, user: string, id?: string){
        this.name = name;
        this.amount = amount;
        this.category = category;
        this.account = account;
        this.user = user;
        this.id = id;
    }
}

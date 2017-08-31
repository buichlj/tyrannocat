import { Component, OnInit } from '@angular/core'

import { Account } from '../accounts/account.model'
import { AccountService } from '../accounts/account.service'

import { TransactionCategory } from '../categories/transaction_category.model'
import { CategoryService } from '../categories/category.service'

import { Transaction } from './transaction.model'
import { TransactionService } from './transaction.service'

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction-input.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%
        }
        .config{
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%
        }    
    `]
})

export class TransactionComponent implements OnInit{
    private accounts: Account[];
    private transactionCategories: TransactionCategory[];
    private transactionCategoryId: string;
    private accountId: string;
    private amount: string;
    private date: string;
    private note: string;

    constructor(private categoryService: CategoryService, private accountService: AccountService, private transactionService: TransactionService){

    }

    ngOnInit(){
        this.categoryService.getTransactionCategories().subscribe(
            (transactionCategories: TransactionCategory[]) => {
                this.transactionCategories = transactionCategories;
            }
        );

        this.accountService.getAccounts().subscribe(
            (accounts: Account[]) => {
                this.accounts = accounts;
            }
        );
    }

    onSubmit(){
        var amount: number = +this.amount;
        var transactions: Transaction[] = [];
        var account = new Account('', 0, null, null, '', this.accountId);
        transactions.push(new Transaction(this.date, amount, this.note, this.transactionCategoryId, account, ""));
        this.transactionService.addTransactions(transactions)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }

}
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Transaction } from './transaction.model'
import { TransactionService } from './transaction.service'

import { Account } from '../accounts/account.model'
import { AccountService } from '../accounts/account.service'

import { CategoryService } from '../categories/category.service'
import { TransactionCategory } from '../categories/transaction_category.model'

@Component({
    selector: 'app-transaction-upload',
    templateUrl: './transaction-upload.component.html',
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

export class TransactionUploadComponent implements OnInit{
    transactionText: string = "";
    isHidden: boolean = true;
    transactions: Transaction[];
    account: string;
    accounts: Account[];
    transactionCategories: TransactionCategory[];

    constructor(private accountService: AccountService, private categoryService: CategoryService, private transactionService: TransactionService){
        
    }

    ngOnInit(){
         this.accountService.getAccounts().subscribe(
            (accounts: Account[]) => {
                this.accounts = accounts;
            }
        );
        this.categoryService.getTransactionCategories().subscribe(
            (transactionCategories: TransactionCategory[]) => {
                this.transactionCategories = transactionCategories;
            }
        );
    }

    onSubmit(){
        this.transactionService.addTransactions(this.transactions)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }

    convert() {
        var account = this.account.split(',');
        console.log(account);
        this.transactions = new Array<Transaction>();
        this.transactionText = this.transactionText.split('"').join("");
        let tempArray: string[] = this.transactionText.split(/\r\n|\r|\n/g);
        for (let i: number = 1; i < tempArray.length; i++){
            if (tempArray[i].split(',').length > 10){
                var transaction = Transaction.convert(tempArray[i]);
                transaction.account = new Account(account[1], 0, null, null, '', account[0]);
                this.transactions.push(transaction);
            }
        }
        if (this.transactions.length > 0){
            this.isHidden = false;
        }
        console.log(this.transactions);
    }
}
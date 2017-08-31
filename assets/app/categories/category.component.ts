import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AccountCategory } from './account_category.model'
import { TransactionCategory } from './transaction_category.model'

import { CategoryService } from '../categories/category.service'

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
    private hideAccountCategoryAdd: Boolean = true;
    private hideTransactionCategoryAdd: Boolean = true;

    private transactionCategories: AccountCategory[] = [];
    private accountCategories: AccountCategory[] = [];

    private newAccountCategoryName: string;
    private parentAccountCategoryId: string;

    private newTransactionCategoryName: string;
    private parentTransactionCategoryId: string;


    constructor(private categoryService: CategoryService){

    }

    ngOnInit(){
        this.categoryService.getAccountCategories().subscribe(
            (accountCategories: AccountCategory[]) => {
                this.accountCategories = accountCategories;
            }
        );

        this.categoryService.getTransactionCategories().subscribe(
            (transactionCategories: TransactionCategory[]) => {
                this.transactionCategories = transactionCategories;
            }
        );
    }

    onAccountCategorySubmit(){
        this.categoryService.addAccountCategory(
            new AccountCategory(
                this.newAccountCategoryName, 
                this.parentAccountCategoryId, 
                "Test"
            )
        )
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }

    onAccountCategoryDelete(accountCategoryId: string){
        this.categoryService.removeAccountCategory(accountCategoryId)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }

    onTransactionCategorySubmit(){
        this.categoryService.addTransactionCategory(
            new TransactionCategory(
                this.newTransactionCategoryName, 
                this.parentTransactionCategoryId, 
                "Test"
            )
        )
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }

    onTransactionCategoryDelete(transactionCategoryId: string){
        this.categoryService.removeTransactionCategory(transactionCategoryId)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }

    showAccountCategoryAdd(){
        this.hideAccountCategoryAdd = false;
    }

    showTransactionCategoryAdd(){
        this.hideTransactionCategoryAdd = false;
    }

}
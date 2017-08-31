import { Component, Input, OnInit } from '@angular/core';

import { Account } from './account.model';
import { AccountService } from './account.service';
import { AccountCategory } from '../categories/account_category.model'

import { CategoryService } from '../categories/category.service'

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
    accounts: Account[];
    accountCategories: AccountCategory[];
    hideAccountAdd: Boolean = true;
    parentAccountId: string;
    accountCategoryId: string;
    newAccountName: string;

    constructor(private accountService: AccountService, private categoryService: CategoryService){

    }

    ngOnInit(){
        this.accountService.getAccounts().subscribe(
            (accounts: Account[]) => {
                this.accounts = accounts;
            }
        );

        this.categoryService.getAccountCategories().subscribe(
            (accountCategories: AccountCategory[]) => {
                this.accountCategories = accountCategories;
            }
        );

        this.parentAccountId = "";

    }

    showAccountAdd(){
        this.hideAccountAdd = false;
    }

    onAccountDelete(accountId : string){
        this.accountService.removeAccount(accountId)
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }

    onAccountSubmit(){
        if(!this.accountCategoryId){
            console.error("No accountCategory for the save.");
            return;
        }
        var accountCategory = new AccountCategory("", "", "", this.accountCategoryId);
        this.accountService.addAccount(
            new Account(
                this.newAccountName,
                0,
                this.parentAccountId ? new Account("", 0, null, null, "", this.parentAccountId) : null,
                accountCategory,
                "Test"
            )
        )
        .subscribe(
            data => console.log(data),
            error => console.error(error)
        );
    }
}
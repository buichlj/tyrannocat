import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Account } from './account.model';
import { AccountCategory } from '../categories/account_category.model'

@Injectable()
export class AccountService {
    private accounts: Account[] = [];

    constructor(private http: Http){}

    getAccounts() {
        return this.http.get('http://localhost:3000/accounts')
            .map((response: Response) => {
                const accounts = response.json().obj;
                let transformedAccounts: Account[] = [];
                for(let account of accounts){
                    console.log(accounts);
                    transformedAccounts.push(new Account(
                        account.name, 
                        account.amount, 
                        account.account, 
                        new AccountCategory(account.category.name, account.category.category, account.category._id), 
                        account.user._id,
                        account._id));
                }
                this.accounts = transformedAccounts;
                return transformedAccounts;
            }).catch((error: Response) => Observable.throw(error.json()));
    }

    addAccount(account: Account) {
        const body = JSON.stringify(account);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/accounts', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const account = new Account(result.obj.name, result.obj.amount, result.obj.account, result.obj.category, result.obj.user, result.obj._id);
                this.accounts.push(account);
                return account;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    removeAccount(accountId: string){
        const body = JSON.stringify({'id': accountId});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.delete('http://localhost:3000/accounts', new RequestOptions({
            headers: headers,
            body: body
        }))
        .catch((error: Response) => Observable.throw(error));
    }

}
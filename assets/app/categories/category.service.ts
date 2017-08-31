import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { AccountCategory } from './account_category.model'
import { TransactionCategory } from './transaction_category.model'

@Injectable()
export class CategoryService {
    private accountCategories: AccountCategory[] = [];
    private transactionCategories: TransactionCategory[] = [];

    constructor(private http: Http){}

    getAccountCategories(){
        return this.http.get('http://localhost:3000/categories/accountCategories')
            .map((response: Response) => {
                const accountCategories = response.json().obj;
                let transformedAccountCategories: AccountCategory[] = [];
                for(let accountCategory of accountCategories){
                    console.log(accountCategories);
                    transformedAccountCategories.push(new AccountCategory(
                        accountCategory.name,
                        accountCategory.category,
                        "Test",
                        accountCategory._id
                    ));
                }
                this.accountCategories = transformedAccountCategories;
                return transformedAccountCategories;
            })
    }

    addAccountCategory(accountCategory: AccountCategory){
        const body = JSON.stringify(accountCategory);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/categories/accountCategories', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const accountCategory = new AccountCategory(result.obj.name, result.obj.category, result.obj._id);
                this.accountCategories.push(accountCategory);
                return accountCategory;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    removeAccountCategory(accountCategoryId: string){
        const body = JSON.stringify({'id': accountCategoryId});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.delete('http://localhost:3000/categories/accountCategories', new RequestOptions({
            headers: headers,
            body: body
        }))
        .catch((error: Response) => Observable.throw(error));;
    }

    getTransactionCategories(){
        return this.http.get('http://localhost:3000/categories/transactionCategories')
            .map((response: Response) => {
                const transactionCategories = response.json().obj;
                let transformedTransactionCategories: TransactionCategory[] = [];
                for(let transactionCategory of transactionCategories){
                    console.log(transactionCategories);
                    transformedTransactionCategories.push(new TransactionCategory(
                        transactionCategory.name,
                        transactionCategory.category,
                        "Test",
                        transactionCategory._id
                    ));
                }
                this.transactionCategories = transformedTransactionCategories;
                return transformedTransactionCategories;
            })
    }

    addTransactionCategory(transactionCategory: TransactionCategory){
        const body = JSON.stringify(transactionCategory);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/categories/transactionCategories', body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const transactionCategory = new AccountCategory(result.obj.name, result.obj.category, result.obj._id);
                this.transactionCategories.push(transactionCategory);
                return transactionCategory;
            })
            .catch((error: Response) => Observable.throw(error));
    }

    removeTransactionCategory(transactionCategoryId: string){
        const body = JSON.stringify({'id': transactionCategoryId});
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.delete('http://localhost:3000/categories/transactionCategories', new RequestOptions({
            headers: headers,
            body: body
        }))
        .catch((error: Response) => Observable.throw(error));
    }
}
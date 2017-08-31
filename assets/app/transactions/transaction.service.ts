import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

import { Transaction } from './transaction.model'

@Injectable()
export class TransactionService {
    private transactions: Transaction[] = [];

    constructor(private http: Http){}

    getTransactions(){
        //TODO: This
    }

    addTransactions(transactions: Transaction[]){
        const body = JSON.stringify(transactions);
        console.log(body);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/transactions', body, {headers: headers})
            .catch((error: Response) => Observable.throw(error));
    }

    removeTransaction(accountCategoryId: string){
        //TODO: This
    }
}
import { Component } from '@angular/core';

import { AccountService } from './accounts/account.service'
import { CategoryService } from './categories/category.service'
import { TransactionService } from './transactions/transaction.service'

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [AccountService, CategoryService, TransactionService]
})
export class AppComponent {
    
}
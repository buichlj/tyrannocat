import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from './dashboard/dashboard.component'
import { TransactionComponent } from './transactions/transaction.component'
import { TransactionUploadComponent } from './transactions/transaction-upload.component'
import { AccountComponent } from './accounts/account.component'
import { CategoryComponent } from './categories/category.component'

const APP_ROUTES: Routes = [
    {path: 'category', component: CategoryComponent},
    {path: 'transaction', component: TransactionComponent},
    {path: 'upload', component: TransactionUploadComponent},
    {path: 'account', component: AccountComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: '**', redirectTo: '/dashboard'}
];

export const routing = RouterModule.forRoot(APP_ROUTES);
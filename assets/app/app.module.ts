import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';

import { AppComponent } from "./app.component";

import { routing } from './app.routing'
import { HeaderComponent } from './header.component'

import { DashboardComponent } from './dashboard/dashboard.component'
import { TransactionComponent } from './transactions/transaction.component'
import { TransactionUploadComponent } from './transactions/transaction-upload.component'

import { AccountComponent } from './accounts/account.component'

import { CategoryComponent } from './categories/category.component'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DashboardComponent,
        TransactionComponent,
        TransactionUploadComponent,
        AccountComponent,
        CategoryComponent
    ],
    imports: [
        BrowserModule, 
        FormsModule, 
        routing, 
        ReactiveFormsModule,
        HttpModule
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
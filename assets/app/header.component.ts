import { Component } from "@angular/core";

@Component({
    selector: 'app-header',
    template: `
        <header class="row">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-pills">
                    <li routerLinkActive="active"><a [routerLink]="['/dashboard']">Dashboard</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/transaction']">Transactions</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/upload']">Upload</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/account']">Accounts</a></li>
                    <li routerLinkActive="active"><a [routerLink]="['/category']">Categories</a></li>
                </ul>
            </nav>
        </header>
    `
})
export class HeaderComponent {

}
import { Component } from '@angular/core'

@Component({
    selector: 'app-dashboard',
    template: '<chart [options]="options"></chart>'
})

export class DashboardComponent{
    constructor () {
        this.options = {
            title : { text: 'simple chart' },
            series: [{
                data: [29.9, 71.5, 106.4, 129.2],
            }]
        };
    }
    options: Object;
}
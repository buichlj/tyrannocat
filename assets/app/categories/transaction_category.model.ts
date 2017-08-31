export class TransactionCategory {
    name: string;
    category: string;
    id: string;

    constructor(name: string, category: string, user: string, id?: string){
        this.name = name;
        this.category = category;
        this.id = id;
    }
}
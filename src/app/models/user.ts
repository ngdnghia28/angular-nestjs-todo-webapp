export class User {
    id: string;
    name: string;
    picture: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

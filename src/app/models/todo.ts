import { User } from './user';

export class Todo {
    user: User;
    id: string;
    name: string;
    startDate: Date;
    endDate: Date;
    effort: number;
    assignedUser: User;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

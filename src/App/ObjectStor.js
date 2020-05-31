export class Chore {
    constructor(id, hid, pid, completed, weekNum, title, description) {
        this.id = id;
        this.hid = hid;
        this.pid = pid;
        this.completed = completed;
        this.weekNum = weekNum;
        this.title = title;
        this.description = description;
    }
}

export class House {
    constructor(id, title, members, weekNum, startDate) {
        this.id = id;
        this.title = title;
        this.members = members;
        this.weekNum = weekNum;
        this.startDate = startDate;
    }
}

export class User {
    constructor(id, username, first_name, last_name, hid) {
        this.id = id;
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.hid = hid;
    }
}
export class Chore {
    constructor(id, name, weekNum, title, supplies, description, members) {
        this.id = id;
        this.name = name;
        this.weekNum = weekNum;
        this.title = title;
        this.supplies = supplies;
        this.description = description;
        this.members = members;
    }
}

export class House {
    constructor(id, name, weekNum, startDate) {
        this.id = id;
        this.name = name;
        this.weekNum = weekNum;
        this.startDate = startDate;
    }
}
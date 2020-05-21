export class Chore {
    constructor(id, completed, weekNum, title, supplies, description, assignedTo) {
        this.id = id;
        this.completed = completed
        this.weekNum = weekNum;
        this.title = title;
        this.supplies = supplies;
        this.description = description;
        this.assignedTo = assignedTo;
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
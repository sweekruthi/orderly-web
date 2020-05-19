export class Chore {
    constructor(id, title, supplies, description, start, duration, members) {
        this.id = id;
        this.title = title;
        this.supplies = supplies;
        this.description = description;
        this.start = start;
        this.duration = duration;
        this.members = members;
    }
}
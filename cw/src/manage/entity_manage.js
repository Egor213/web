


export class Entity {
    constructor(data) {
        this.coord_x = data.x
        this.coord_y = data.y
        this.entity_width = data.width
        this.entity_height = data.height
        this.gid = data.gid
    }
}
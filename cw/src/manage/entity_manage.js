


export class Entity {
    constructor(data) {
        this.coord_x = data.x
        this.coord_y = data.y
        this.entity_width = data.width
        this.entity_height = data.height
        this.gid = data.gid
        this.map_canvas = document.getElementById('game-canvas')
        this.ctx_canvas = this.map_canvas.getContext('2d')
    }
}

import { Entity  } from "./entity_manage.js"
import { find_source, open_tsx, draw_block } from "../tools.js"
import { BASE_PATH_TILED } from "../paths.js"
const HEAL = 100

export class HeroManager extends Entity {
    constructor(data, obj_map) {
        super(data)
        this.heal = HEAL
        this.obj_map = obj_map
    }

    get get_coords() {
        return {x: this.coord_x, y: this.coord_y}
    }

    damage(hp) {
        this.heal -= hp
    }

    move_left() {
        this.obj_map[this.coord_y][this.coord_x] = 0
        this.coord_x -= 1;
        this.obj_map[this.coord_y][this.coord_x] = 1
    }

    move_right() {
        this.obj_map[this.coord_y][this.coord_x] = 0
        this.coord_x += 1;
        this.obj_map[this.coord_y][this.coord_x] = 1
    }

    move_down() {
        this.obj_map[this.coord_y][this.coord_x] = 0
        this.coord_y -= 1;
        this.obj_map[this.coord_y][this.coord_x] = 1
    }

    move_up() {
        this.obj_map[this.coord_y][this.coord_x] = 0
        this.coord_y += 1;
        this.obj_map[this.coord_y][this.coord_x] = 1
    }

    
}
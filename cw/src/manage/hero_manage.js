
import { Entity  } from "./entity_manage.js"
import { find_source, open_tsx, draw_block } from "../tools.js"
import { BASE_PATH_TILED } from "../paths.js"
const HEAL = 100

export class HeroManager extends Entity {
    constructor(data, obj_map) {
        super(data)
        this.heal = HEAL
        this.obj_map = obj_map
        this.metka = 1;
    }

    damage(hp) {
        this.heal -= hp
    }

    
    
}
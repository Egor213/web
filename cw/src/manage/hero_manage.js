
import { Entity  } from "./entity_manage.js"
import { HERO_METKA } from "../paths.js"
const HEAL = 100

export class HeroManager extends Entity {
    constructor(data, obj_map) {
        super(data)
        this.heal = HEAL
        this.obj_map = obj_map
        this.metka = HERO_METKA;
    }

    damage(hp) {
        this.heal -= hp
    }

    add_hp(value) {
        this.heal += value
        console.log(this.heal)
    }
    
    
}
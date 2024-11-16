import { Entity  } from "./entity_manage.js"
import { HEAL_METKA } from "../paths.js"


export class HealEntity extends Entity {
    constructor(data, heal, score) {
        super(data)
        this.heal = heal
        this.metka = HEAL_METKA
        this.score = score
    }
}
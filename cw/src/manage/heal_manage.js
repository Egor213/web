import { Entity  } from "./entity_manage.js"
import { HEAL_METKA } from "../paths.js"


export class HealManager extends Entity {
    constructor(data, heal) {
        super(data)
        this.heal = heal
        this.metka = HEAL_METKA
    }
}
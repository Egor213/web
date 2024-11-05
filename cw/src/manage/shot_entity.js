import { Entity  } from "./entity_manage.js"
import { SHOT_METKA } from "../paths.js"



export class ShotEntity extends Entity {
    constructor(data) {
        super(data)
        this.metka = SHOT_METKA
    }
}
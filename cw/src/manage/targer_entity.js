import { Entity  } from "./entity_manage.js"
import { TARGET_METKA } from "../paths.js"



export class TargetEntity extends Entity {
    constructor(data, score) {
        super(data)
        this.metka = TARGET_METKA
        this.score = score
    }
}
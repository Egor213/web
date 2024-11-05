import { SHOT_METKA, HEAL_METKA } from "../paths.js";

export class PhysicManager {
    constructor(move_manager, map_manager) {
        this.move_manager = move_manager;
        this.map_manager = map_manager;
    }

    async make_shot(obj, side) {
        let count_iter = 0;
        const delay = 100;
        const offset = {
            up: { x: 0, y: 32 },
            down: { x: 0, y: -32 },
            left: { x: 32, y: 0 },
            right: { x: -32, y: 0 }
        };

        while (true) {
            let result = this.move_manager.move(obj, side);

            if (result === true || result === HEAL_METKA) {
                const { x: dx, y: dy } = count_iter === 0 ? { x: 0, y: 0 } : offset[side];
                this.update_shot(dx, dy, SHOT_METKA, obj);
                count_iter++;
                await this.delay(delay);
            } else {
                this.clear_shot(obj);
                break;
            }
            if (result === HEAL_METKA) {
                this.clear_shot(obj);
                break;
            }
        }
    }

    update_shot(dop_x, dop_y, metka, obj) {
        this.map_manager.clear_entity(
            obj.coord_x * this.map_manager.block_size.x + dop_x,
            obj.coord_y * this.map_manager.block_size.y + dop_y,
            obj.entity_width,
            obj.entity_height,
            this.map_manager.ctx_canvas
        );
        
        this.map_manager.draw_entity(
            obj.gid,
            obj.coord_x,
            obj.coord_y,
            metka
        );
    }

    clear_shot(obj) {
        this.map_manager.clear_entity(
            obj.coord_x * this.map_manager.block_size.x,
            obj.coord_y * this.map_manager.block_size.y,
            obj.entity_width,
            obj.entity_height,
            this.map_manager.ctx_canvas
        );
        this.map_manager.object_field[obj.coord_y][obj.coord_x] = 0;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

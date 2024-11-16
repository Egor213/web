import { TARGET_METKA, SHOT_METKA, HERO_METKA } from "../paths.js";

export class MoveManager {
    constructor(obj_field, map_field) {
        this.obj_field = obj_field;
        this.map_field = map_field;
    }

    move(obj, side) {
        const { new_x, new_y } = this.calculate_new_position(obj, side);

        const move_result = this.check_coords(new_x, new_y);
        if (move_result == TARGET_METKA) return move_result

        if (obj.metka == SHOT_METKA && this.obj_field[obj.coord_y][obj.coord_x] == HERO_METKA) {
            obj.coord_x = new_x;
            obj.coord_y = new_y;
            this.obj_field[obj.coord_y][obj.coord_x] = obj.metka;
            return move_result;
            
        }else if (move_result) {
            this.update_position(obj, new_x, new_y);
            return move_result;
        }
        console.log(this.obj_field)
        return false;
    }

    calculate_new_position(obj, side) {
        let new_x = obj.coord_x;
        let new_y = obj.coord_y;
        switch (side) {
            case 'up': new_y -= 1; break;
            case 'left': new_x -= 1; break;
            case 'right': new_x += 1; break;
            case 'down': new_y += 1; break;
        }
        return { new_x, new_y };
    }

    check_coords(x, y) {
        if (this.map_field[y][x] !== -1) {
            return this.obj_field[y][x] == 0 ? true : this.obj_field[y][x];
        }
        return false;
    }

    update_position(obj, new_x, new_y) {
        this.obj_field[obj.coord_y][obj.coord_x] = 0;
        obj.coord_x = new_x;
        obj.coord_y = new_y;
        this.obj_field[obj.coord_y][obj.coord_x] = obj.metka;
    }
}




export class MoveManager {
    constructor(obj_field, map_field) {
        this.obj_field = obj_field,
        this.map_field = map_field
    }

    

    async move(obj, side) {
        let new_x = obj.coord_x
        let new_y = obj.coord_y
        switch (side){
            case 'up':
                new_y -= 1
                break;
            case 'left':
                new_x -= 1
                break;
            case 'right':
                new_x += 1
                break;
            case 'down':
                new_y += 1
                break;
        }

        if (this.check_coords(new_x, new_y)) {
            this.obj_field[obj.coord_y][obj.coord_x] = 0
            obj.coord_x = new_x
            obj.coord_y = new_y
            this.obj_field[obj.coord_y][obj.coord_x] = obj.metka
            console.log(this.obj_field)
            return true;
        }
        return false
    }

    check_coords(x, y) {
        if (this.obj_field[y][x] != 2 && this.map_field[y][x] != -1)
            return true
        return false
    }
}
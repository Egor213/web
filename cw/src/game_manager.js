import { MapManager } from "./manage/map_manage.js";
import { HeroManager } from "./manage/hero_manage.js";
import { PATH_MAP_ONE, PATH_MAP_TWO } from "./paths.js";
import { MoveManager } from "./manage/move_manage.js";

class GameManager {
    constructor() {
        this.cur_lvl = 1
        this.map_manager = new MapManager(this.cur_lvl);
        
    }

    async open_json(path) 
    {
        let response_json = null
        await fetch(path,
            {
                headers:
                {
                    'Content-Type': 'application/json',
                },
                method: "GET"
            }
        )
        .then(response => response.json())
        .then(response => {
            response_json = response
        })
        return response_json
    }

    start_game() {
        this.init()
    }

    async init() {
        let json_lvl = await this.open_json(PATH_MAP_ONE);
        await this.map_manager.parseMap(json_lvl)
        this.hero_manager = new HeroManager(this.get_hero_data(), this.map_manager.object_field)
        this.map_manager.draw_hero(this.hero_manager.gid, this.hero_manager.coord_x, this.hero_manager.coord_y)

        this.movement(
            this.map_manager.object_field, 
            this.map_manager.matrix_field, 
            this.hero_manager
        )



        
    }


    get_hero_data() {
        let objects = this.map_manager.object_data
        for (let obj of objects) {
            if (obj.name == 'hero') {
                return {
                    width: obj.objects[0].width,
                    height: obj.objects[0].height,
                    x: obj.objects[0].x / this.map_manager.block_size.x,
                    y: obj.objects[0].y / this.map_manager.block_size.y,
                    gid: obj.objects[0].gid
                }
            }
        }
    }
    

movement(obj_field, map_field, obj) {
        let is_moving = false;
        
        document.addEventListener('keydown', (event) => {
            if (is_moving) return;
            is_moving = true;
            
            this.move_manager = new MoveManager(obj_field, map_field);
            
            switch (event.code) {
                case 'ArrowUp':
                    if (this.move_manager.move(obj, 'up')) {
                        this.update_hero(0, this.map_manager.block_size.y);
                    }
                    break;
                case 'ArrowDown': 
                    if (this.move_manager.move(obj, 'down')) {
                        this.update_hero(0, -1 * this.map_manager.block_size.y);
                    }
                    break;
                case 'ArrowLeft':
                    if (this.move_manager.move(obj, 'left')) {
                        this.update_hero(this.map_manager.block_size.x, 0);
                    }
                    break;
                case 'ArrowRight':
                    if (this.move_manager.move(obj, 'right')) {
                        this.update_hero(-1 * this.map_manager.block_size.x, 0);
                    }
                    break;
                default:
                    break;
            }
            setTimeout(() => {
                is_moving = false;
            }, 50); 
        });
    }
    update_hero(dop_x, dop_y) {
        this.map_manager.clear_entity(
            this.hero_manager.coord_x * this.map_manager.block_size.x + dop_x,
            this.hero_manager.coord_y * this.map_manager.block_size.y + dop_y,
            this.hero_manager.entity_width,
            this.hero_manager.entity_height,
            this.map_manager.ctx_canvas
        )
        this.map_manager.draw_hero(
            this.hero_manager.gid, 
            this.hero_manager.coord_x, 
            this.hero_manager.coord_y
        )
    }

    

}

let game = new GameManager()
game.start_game();



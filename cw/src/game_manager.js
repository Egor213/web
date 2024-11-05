import { MapManager } from "./manage/map_manage.js";
import { HeroManager } from "./manage/hero_manage.js";
import { PATH_MAP_ONE, PATH_MAP_TWO, HEAL_METKA, HERO_METKA, HEAL_VALUE } from "./paths.js";
import { MoveManager } from "./manage/move_manage.js";
import { SpriteManage } from "./manage/sprite_manage.js";
import { HealEntity } from "./manage/heal_entity.js";

class GameManager {
    constructor() {
        this.cur_lvl = 1
        this.map_manager = new MapManager(this.cur_lvl);
        this.game_score = 0 
    }

    async open_json(path) 
    {
        let response_json = null
        await fetch(path,
            {
                headers: {'Content-Type': 'application/json',},
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
        this.hero_manager = new HeroManager(this.get_entity_data('hero')[0], this.map_manager.object_field)
        this.map_manager.draw_entity(
            this.hero_manager.gid, 
            this.hero_manager.coord_x, 
            this.hero_manager.coord_y,
            HERO_METKA
        )
        this.sprite_manager = new SpriteManage()

        this.movement(
            this.map_manager.object_field, 
            this.map_manager.matrix_field, 
            this.hero_manager
        )
               
        this.bonuses = this.create_bonuses()
        this.draw_bonuses()
        
        
    }

    create_bonuses() {
        let temp = []
        const bonuses = this.get_entity_data('bonus')
        for (let i in bonuses)
            temp.push(new HealEntity(bonuses[i], HEAL_VALUE))
        return temp
    }

    draw_bonuses() {
        for (let bonus of this.bonuses) {
            this.map_manager.draw_entity(
                bonus.gid, 
                bonus.coord_x, 
                bonus.coord_y,
                HEAL_METKA
            )
        }
    }

    get_entity_data(type) {
        let objects = this.map_manager.object_data
        let temp_arr = []
        for (let obj of objects) {
            if (obj.name == type) {
                for (let value of obj.objects) {
                    temp_arr.push({
                        width: value.width,
                        height: value.height,
                        x: value.x / this.map_manager.block_size.x,
                        y: value.y / this.map_manager.block_size.y,
                        gid: value.gid
                    })
                }
                return temp_arr
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
                    this.process_movement(obj, 'up', 0, this.map_manager.block_size.y, 'up');
                    break;
                case 'ArrowDown':
                    this.process_movement(obj, 'down', 0, -this.map_manager.block_size.y, 'down');
                    break;
                case 'ArrowLeft':
                    this.process_movement(obj, 'left', this.map_manager.block_size.x, 0, 'left');
                    break;
                case 'ArrowRight':
                    this.process_movement(obj, 'right', -this.map_manager.block_size.x, 0, 'right');
                    break;
                default:
                    break;
            }
        
            setTimeout(() => {
                is_moving = false;
            }, 150); 
        });
    }

    process_movement(obj, side, x, y, sprite) {
        this.game_score += 1
        let is_move = this.move_manager.move(obj, side);
        this.check_move_hp(is_move);
        this.update_entity(x, y, HERO_METKA, this.sprite_manager.get_next_value(sprite));
    }

    check_move_hp(is_move) {
        if (is_move == HEAL_METKA) {
            this.hero_manager.add_hp(HEAL_VALUE)
            this.game_score += 10
            this.clear_bonus()
        }
    }


    clear_bonus() {
        for (let bonus of this.bonuses) {
            if (bonus.coord_x == this.hero_manager.coord_x &&
                bonus.coord_y == this.hero_manager.coord_y
            ) {
                this.map_manager.clear_entity(
                    bonus.coord_x * this.map_manager.block_size.x,
                    bonus.coord_y * this.map_manager.block_size.y,
                    bonus.entity_width,
                    bonus.entity_height,
                    this.map_manager.ctx_canvas
                )
            }
        }
    }
    

    update_entity(dop_x, dop_y, metka, spriter = 0) {
        this.map_manager.clear_entity(
            this.hero_manager.coord_x * this.map_manager.block_size.x + dop_x,
            this.hero_manager.coord_y * this.map_manager.block_size.y + dop_y,
            this.hero_manager.entity_width,
            this.hero_manager.entity_height,
            this.map_manager.ctx_canvas
        )
        this.map_manager.draw_entity( 
            this.hero_manager.gid + spriter, 
            this.hero_manager.coord_x, 
            this.hero_manager.coord_y,
            metka
        )
    }

    

}


let game = new GameManager()
game.start_game();



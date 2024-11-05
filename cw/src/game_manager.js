import { MapManager } from "./manage/map_manage.js";
import { HeroManager } from "./manage/hero_manage.js";
import { PATH_MAP_ONE, PATH_MAP_TWO, HEAL_METKA, HERO_METKA, HEAL_VALUE, HEAL_SCORE, TARGET_SCORE, TARGET_METKA } from "./paths.js";
import { MoveManager } from "./manage/move_manage.js";
import { SpriteManage } from "./manage/sprite_manage.js";
import { HealEntity } from "./manage/heal_entity.js";
import { TargetEntity } from "./manage/targer_entity.js";

class GameManager {
    constructor() {
        this.cur_lvl = 1
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
        this.init(1)
    }

    async init(lvl) {
        this.map_manager = new MapManager(lvl);
        let json_lvl = null
        if (lvl == 1)
            json_lvl = await this.open_json(PATH_MAP_ONE);
        else
            json_lvl = await this.open_json(PATH_MAP_TWO);

        await this.map_manager.parseMap(json_lvl)
        
        this.hero_manager = new HeroManager(this.get_entity_data('hero')[0], this.map_manager.object_field)
        this.map_manager.draw_entity(
            this.hero_manager.gid, 
            this.hero_manager.coord_x, 
            this.hero_manager.coord_y,
            HERO_METKA
        )
        this.map_manager.update_fog(
            this.hero_manager.coord_x,
            this.hero_manager.coord_y
        )
        this.sprite_manager = new SpriteManage()

        this.movement(
            this.map_manager.object_field, 
            this.map_manager.matrix_field, 
            this.hero_manager
        )
               
        this.bonuses = this.create_bonuses()
        this.draw_bonuses()

        this.target = this.create_targets()
        this.draw_targets()
        
    }

    draw_targets() {
        for (let target of this.target) {
            this.map_manager.draw_entity(
                target.gid, 
                target.coord_x, 
                target.coord_y,
                TARGET_METKA
            )
        }
    }

    create_targets() {
        let temp = []
        const targets = this.get_entity_data('reward')
        for (let i in targets)
            temp.push(new TargetEntity(targets[i], TARGET_SCORE))
        return temp
    }

    create_bonuses() {
        let temp = []
        const bonuses = this.get_entity_data('bonus')
        for (let i in bonuses)
            temp.push(new HealEntity(bonuses[i], HEAL_VALUE, HEAL_SCORE))
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
    
        const handle_key_down = (event) => {
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
        };

        document.addEventListener('keydown', handle_key_down);
    
        this.stop_movement = () => {
            document.removeEventListener('keydown', handle_key_down);
        };
    }
    

    process_movement(obj, side, x, y, sprite) {
        let is_move = this.move_manager.move(obj, side);
        this.check_move_entity(is_move);
        this.update_entity(x, y, HERO_METKA, this.sprite_manager.get_next_value(sprite));
        this.map_manager.update_fog(
            this.hero_manager.coord_x,
            this.hero_manager.coord_y
        )
    }

    check_move_entity(is_move) {
        if (is_move)
            this.game_score += 1
        if (is_move == TARGET_METKA) {
            alert("You win!")
            // this.stop_movement()
            // this.init(2)
        } else if (is_move == HEAL_METKA) {
            this.hero_manager.add_hp(HEAL_VALUE)
            this.clear_bonus()
        }
    }


    clear_bonus() {
        let bonus = this.get_bonus_by_coords(
            this.hero_manager.coord_x,
            this.hero_manager.coord_y
        )
        if (bonus == null)
            return
        this.game_score += bonus.score
        this.map_manager.clear_entity(
            bonus.coord_x * this.map_manager.block_size.x,
            bonus.coord_y * this.map_manager.block_size.y,
            bonus.entity_width,
            bonus.entity_height,
            this.map_manager.ctx_canvas
        )
    }

    get_bonus_by_coords(x, y) {
        for (let bonus of this.bonuses) {
            if (bonus.coord_x == x &&
                bonus.coord_y == y
            ) {
               return bonus
            }
        }
        return null
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



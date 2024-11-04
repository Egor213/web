import { MapManager } from "./manage/map_manage.js";
import { HeroManager } from "./manage/hero_manage.js";
import { PATH_MAP_ONE, PATH_MAP_TWO } from "./paths.js";


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
        
    }


    get_hero_data() {
        let objects = this.map_manager.object_data
        for (let obj of objects) {
            if (obj.name == 'hero') {
                return {
                    width: obj.objects[0].width,
                    height: obj.objects[0].height,
                    x: obj.objects[0].x,
                    y: obj.objects[0].y,
                    gid: obj.objects[0].gid
                }
            }
        }
    }


    

}

let game = new GameManager()
game.start_game();



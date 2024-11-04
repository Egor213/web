import { IMG_PATH, BASE_PATH_TILED } from "../paths.js"
import { find_source, open_tsx, draw_block } from "../tools.js"

export class MapManager 
{
    constructor(lvl) 
    {
        this.map_data = null
        this.tile_layers = null 
        this.object_data = []
        this.count_block = {x: 0, y: 0}
        this.block_size = {x: 0, y: 0}
        this.map_size = {x: 0, y: 0}
        this.json_loaded = false
        this.map_canvas = document.getElementById('game-canvas')
        this.ctx_canvas = this.map_canvas.getContext('2d')
        this.map_canvas_bg = document.getElementById('game-canvas-background')
        this.ctx_canvas_bg = this.map_canvas.getContext('2d')
        this.matrix_field = this.create_empty_map(30, 20)
        this.object_field = this.create_empty_map(30, 20)
        
        
    }



    create_empty_map(width, height) {
        let temp = new Array(height)
        for (let i=0; i < height; i++)
        {
            temp[i] = new Array(width)
        }

        for (let i=0; i < height; i++)
        {
            for (let j=0; j < width; j++)
                temp[i][j] = 0
        }     
        return temp;
    }



    async parseMap(JSON_map)
    {
        this.map_data = JSON_map
        this.count_block = {x: this.map_data.width, y: this.map_data.height}
        this.block_size = {x: this.map_data.tilewidth, y: this.map_data.tileheight }
        this.map_size.x = this.count_block.x * this.block_size.x
        this.map_size.y = this.count_block.y * this.block_size.y
        this.map_canvas.width = this.map_size.x
        this.map_canvas.height = this.map_size.y
        this.map_canvas_bg.width = this.map_size.x
        this.map_canvas_bg.height = this.map_size.y
        this.tile_layers = this.map_data.layers              
        await this.make_background()  
        this.json_loaded = true
        console.log(this.matrix_field)
        console.log(this.object_data)
    }


    async make_background()
    {
        
        for(let idx = 0; idx < this.tile_layers.length; idx++)
        {
            if(this.tile_layers[idx].name === 'walls')
            {
                let count = 0
                for (let i = 0; i < this.tile_layers[idx].data.length; i++) 
                {
                    if (i >= this.count_block.x * (count + 1))
                        count += 1
                    this.matrix_field[count][i % this.count_block.x] = this.tile_layers[idx].data[i];
                }
                
            }
            if (this.tile_layers[idx].type === 'objectgroup') 
            {
                this.object_data.push(this.tile_layers[idx])
            }
        }
    
        let last_source = null
        let last_data = null
        for (let i = 0; i < this.matrix_field.length; i++) 
            {
            for (let j = 0; j < this.matrix_field[i].length; j++) 
            {
                
                let block_id = this.matrix_field[i][j];
                if (last_source == null || last_source != find_source(this.map_data.tilesets, block_id)) 
                {
                    last_source = find_source(this.map_data.tilesets, block_id)
                    block_id = block_id - last_source.firstgid
                    last_source = last_source.source
                    last_data = await open_tsx(BASE_PATH_TILED + last_source);
                }
                draw_block(block_id, j * this.block_size.x, i * this.block_size.y, last_data, this.ctx_canvas_bg)
            }
        }
    }

    async draw_hero(gid, x, y) {
        let source = find_source(this.map_data.tilesets, gid);
        gid = gid - source.firstgid
        let data_img = await open_tsx(BASE_PATH_TILED + source.source);
        draw_block(gid, x, y, data_img, this.ctx_canvas) 
        this.object_field[y / this.block_size.y][x / this.block_size.x] = 1
    }

    

    
    
}
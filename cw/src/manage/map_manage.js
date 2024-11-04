import { IMG_PATH, BASE_PATH_TILED } from "../paths.js"


export class MapManager 
{
    constructor(lvl) 
    {
        this.map_data = null
        this.tile_layers = null 
        this.count_block = {x: 0, y: 0}
        this.block_size = {x: 0, y: 0}
        this.map_size = {x: 0, y: 0}
        this.json_loaded = false
        this.map_canvas = document.getElementById('game-canvas')
        this.ctx_canvas = this.map_canvas.getContext('2d')
        this.matrix_field = this.create_empty_map(30, 20)
        if (lvl == 1) {
            this.reward_coords = {x: 4, y: 1}
            this.spawn_coords = {x: 28, y: 18}
        } else {
            this.reward_coords = {x: 26, y: 5}
            this.spawn_coords = {x: 1, y: 18}
        }
        
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



    parseMap(JSON_map)
    {
        this.map_data = JSON_map
        this.count_block = {x: this.map_data.width, y: this.map_data.height}
        this.block_size = {x: this.map_data.tilewidth, y: this.map_data.tileheight }
        this.map_size.x = this.count_block.x * this.block_size.x
        this.map_size.y = this.count_block.y * this.block_size.y
        this.map_canvas.width = this.map_size.x
        this.map_canvas.height = this.map_size.y
        this.tile_layers = this.map_data.layers               
        this.make_background()  
        this.json_loaded = true
        console.log(this.matrix_field)
    }


    async make_background()
    {
        
        for(let idx = 0; idx < this.tile_layers.length; idx++)
        {
            if(this.tile_layers[idx].name === 'walls')
            {
                let count = 0
                for (let i = 0; i < this.tile_layers[idx].data.length; i++) {
                    if (i >= this.count_block.x * (count + 1)) {
                        count += 1
                    }
                    this.matrix_field[count][i % this.count_block.x] = this.tile_layers[idx].data[i];
                }
                
            }
        }
    
        let last_source = null
        let last_data = null
        for (let i = 0; i < this.matrix_field.length; i++) {
            for (let j = 0; j < this.matrix_field[i].length; j++) {
                
                let block_id = this.matrix_field[i][j];
                if (last_source == null || last_source != this.find_source(this.map_data.tilesets, block_id)) {
                    last_source = this.find_source(this.map_data.tilesets, block_id)
                    last_data = await this.open_tsx(BASE_PATH_TILED + last_source);
                }
                this.draw_block(block_id, j * this.block_size.x, i * this.block_size.y, last_data)
            }
        }

        
    }

    async draw_block(test_id, x, y, data) {
        const image = new Image();
        image.src = IMG_PATH + data.source;
        image.onload = () => {
            const row = Math.floor(test_id / data.columns); 
            const col = test_id % data.columns; 
            const sx = col * data.width;
            const sy = row * data.height; 
            this.ctx_canvas.drawImage(image, sx, sy, data.width, data.height, x, y, data.width, data.height);
        };  
    }

    find_source(array, number) {
        for (let i = 0; i < array.length - 1; i++) {
            const current = array[i];
            const next = array[i + 1];
            
            if (number >= current.firstgid && number < next.firstgid) {
                return current.source;
            }
        }
        if (number >= array[array.length - 1].firstgid) 
            return array[array.length - 1].source 
    }

    async open_tsx(path) {
        let data_file = null;
        await fetch(path, {
            headers: {
                'Content-Type': 'application/xml',
            },
            method: "GET"
        })
        .then(response => response.text()) 
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, 'application/xml');
            const tileset_element = xmlDoc.getElementsByTagName('tileset')[0];
            const image_element = xmlDoc.getElementsByTagName('image')[0];

            data_file = {
                columns: tileset_element.getAttribute('columns'),
                width: tileset_element.getAttribute('tilewidth'),
                height: tileset_element.getAttribute('tileheight'),
                source: image_element.getAttribute('source')
            }
        })
        return data_file; 
    }
    
}

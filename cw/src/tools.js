import { IMG_PATH, BASE_PATH_TILED } from "./paths.js"
export function find_source(array, number) 
{
    for (let i = 0; i < array.length - 1; i++) 
    {
        const current = array[i];
        const next = array[i + 1];
        
        if (number >= current.firstgid && number < next.firstgid) 
            return current;
    }
    if (number >= array[array.length - 1].firstgid) 
        return array[array.length - 1]
}

export async function open_tsx(path) {
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

    
    
export function draw_block(test_id, x, y, data, ctx) 
{
    const image = new Image();
    image.src = IMG_PATH + data.source;
    image.onload = () => {
        const row = Math.floor(test_id / data.columns); 
        const col = test_id % data.columns; 
        const sx = col * data.width;
        const sy = row * data.height;
    // console.log(image, sx, sy)

        ctx.drawImage(image, sx, sy, data.width, data.height, x, y, data.width, data.height);
    };  
}
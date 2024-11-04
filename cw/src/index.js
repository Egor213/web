import { MapManager } from "./manage/map_manage.js";
import { PATH_MAP_ONE } from "./paths.js";

let temp = new MapManager(1);

async function loadMap(path) 
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

await loadMap(PATH_MAP_ONE).then((json) => temp.parseMap(json))
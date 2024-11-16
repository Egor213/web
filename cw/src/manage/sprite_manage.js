export class SpriteManage {
    constructor() {
        this.generators = {
            "up": this.create_generator([35, 36, 37]),
            "left": this.create_generator([11, 12, 13]),
            "right": this.create_generator([23, 24, 25]),
            "down": this.create_generator([-1, 0, 1]),
        };
    }

    *create_generator(sequence) {
        let index = 0;
        while (true) {
            yield sequence[index];
            index = (index + 1) % sequence.length;
        }
    }

    get_next_value(type) {
        const generator = this.generators[type];
        return generator ? generator.next().value : null;
    }
}


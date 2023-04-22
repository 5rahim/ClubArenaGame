///<reference path="../Canvas/Canvas.ts"/>
class EntitiesController {

    private indexes: Array<number>;

    constructor() {

        this.indexes = []

    }

    public drawEntities(ctx, entities, player) {

        ctx.clearRect(0, 0, Canvas.window.width, Canvas.window.height)

        for(var i in entities) {

            this.indexes.push(entities[i].self.index)

        }

        this.indexes.sort((a, b) => { return a-b })

        // Dessiner les entités par ordre Y
        for(let i = 0; i < this.indexes.length; i++) {

            for(var k in entities) {

                if(entities[k].self.index == this.indexes[i]) {

                    if(entities[k].type == 'player') {

                        GameController.getPlayerController().drawAvatar(ctx, entities[k].avatar, entities[k].self.direction, entities[k].self.flip, entities[k].self.position.currentX, entities[k].self.position.currentY, 0)

                    }

                }

            }

        }

        this.indexes = []

    }

}
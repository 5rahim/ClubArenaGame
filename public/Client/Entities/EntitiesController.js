///<reference path="../Canvas/Canvas.ts"/>
var EntitiesController = /** @class */ (function () {
    function EntitiesController() {
        this.indexes = [];
    }
    EntitiesController.prototype.drawEntities = function (ctx, entities, player) {
        ctx.clearRect(0, 0, Canvas.window.width, Canvas.window.height);
        for (var i in entities) {
            this.indexes.push(entities[i].self.index);
        }
        this.indexes.sort(function (a, b) { return a - b; });
        // Dessiner les entités par ordre Y
        for (var i_1 = 0; i_1 < this.indexes.length; i_1++) {
            for (var k in entities) {
                if (entities[k].self.index == this.indexes[i_1]) {
                    if (entities[k].type == 'player') {
                        GameController.getPlayerController().drawAvatar(ctx, entities[k].avatar, entities[k].self.direction, entities[k].self.flip, entities[k].self.position.currentX, entities[k].self.position.currentY, 0);
                    }
                }
            }
        }
        this.indexes = [];
    };
    return EntitiesController;
}());

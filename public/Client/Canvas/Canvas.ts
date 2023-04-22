///<reference path="../CST.ts"/>
class _Canvas {

    public window

    public init() {

        this.window = {}
        this.window.width = window.innerWidth
        this.window.height = window.innerHeight

    }

}

const Canvas = new _Canvas()
Canvas.init()
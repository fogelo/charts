//это про то как создавать цепочки, которые реализованы в d3 и в jquery

export const scatterPlot = () => {
    let width

    const my = () => {}

    //здесь вместо function мы не можем использовать стрелку, так как в стрелке нет доступа к arguments
    my.width = function (_) {
        return arguments.length
            ? ((width = +_), my) // здесь вернется только то что стоит после последней запятой, остальное просто выполнится (width=_)
            : width
    }
}
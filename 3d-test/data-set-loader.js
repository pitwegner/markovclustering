function getGraphDataSets() {

    const loadMiserables = function(Graph) {
        Graph
            .cooldownTicks(200)
            .nodeLabel('id')
            .nodeAutoColorBy('group')
            .forceEngine('ngraph')
            .jsonUrl('.miserables.json');
    };
    loadMiserables.description = "<em>Les Miserables</em> data (<a href='https://bl.ocks.org/mbostock/4062045'>4062045</a>)";
    return [loadMiserables];
}

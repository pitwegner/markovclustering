const Graph = ForceGraph3D()
	(document.getElementById("3d-graph"));
let node_positions = []
Graph.resetProps();
Graph.cooldownTicks(200)
  .nodeLabel('name')
  .nodeAutoColorBy('position')
  .linkDirectionalParticles('weight')
  .forceEngine('ngraph')
  .graphData(data)
  .linkPositionUpdate((obj, {start, end}, link) => {
    node_positions[link.source] = new THREE.Vector3(start.x, start.y, start.z)
    node_positions[link.target] = new THREE.Vector3(end.x, end.y, end.z)
    return false
  }).onEngineStop(() => {
    const scene = Graph.scene()
    var geometry = new THREE.ConvexGeometry(node_positions);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00, transparent: true, opacity: 0.2});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  })

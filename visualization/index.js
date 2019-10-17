let clusterMaterial = {color: 0xffff00, transparent: true, opacity: 0.7}
let data
if (cluster === 'weight') {
  data = weight_clustered_data
} else if (cluster === 'uniform') {
  data = clustered_data
} else {
  data = clustered_data
  data.clusters = []
}

//expandedable node
const rootId = 2
for(var i in data.nodes) {
  data.nodes[i].childlink = []
}
for(var i in data.nodes) {
  data.nodes[i].collapsed= !(i ==rootId)
}


nodeColors = {
  'Director': 0x6baed6,
  'CEO': 0x2171b5,
  'Business Support Unit': 0x74c476,
  'Business Control Unit': 0x9e9ac8,
  'Business Development Unit': 0xfd8d3c,
  'Business Support Manager': 0x238b45,
  'Business Control Manager': 0x6a51a3,
  'Business Development Manager': 0xd94701
}

const Graph = ForceGraph3D()
	(document.getElementById("3d-graph"));
Graph.resetProps();
Graph.cooldownTicks(200)
  .nodeLabel('name')
  .nodeColor((node) => nodeColors[node.position_in_structure])
  // .nodeRelSize(3)
  .linkWidth(0.0001)
  .linkColor(0x999999)
  .linkOpacity(1)
  .nodeOpacity(1)

  //click to focus on node
  .onNodeClick(node => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
    Graph.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      3000  // ms transition duration
    );
  })

  //use text node
  .nodeThreeObject(node => {
    // use a sphere as a drag handle
    const obj = new THREE.Mesh(
      new THREE.SphereGeometry(10),
      new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
    );
    // add text sprite as child
    const sprite = new SpriteText(node.name);
    sprite.color = 'white';
    sprite.textHeight = 2;
    obj.add(sprite);
    return obj;
  })

  //.linkMaterial((link) => {
  //  if (data.clusters.filter((cluster) => {
  //    return cluster.length === 2 && cluster[0] === link.source && cluster[1] === link.target
  //  }).length > 0) return new THREE.MeshLambertMaterial(clusterMaterial)
  //})
  .linkDirectionalParticleWidth(0.5)
  .linkDirectionalParticles(link=>link.weight*2)
  .linkDirectionalParticleSpeed(0.002)
  .forceEngine('d3')
  .graphData(data)
  // .onEngineStop(() => {
  //   data.clusters.map((cluster) => {
  //     const scene = Graph.scene()
  //     const node_positions = scene.children
  //       .find((c) => c.type == "Group").children
  //       .filter((c) => c.__graphObjType == "node")
  //       .filter((c) => cluster.includes(c.__data.id))
  //       .map((n) => n.position)

  //     let material = {...clusterMaterial}
  //     let geometry
  //     if (node_positions.length > 3) {
  //       geometry = new THREE.ConvexGeometry(node_positions)
  //       const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(material))
  //       mesh.renderOrder = 999
  //       scene.add(mesh)
  //     } else if(node_positions.length === 3) {
  //       geometry = new THREE.Geometry();
  //       geometry.vertices.push(...node_positions)
  //       geometry.faces.push(new THREE.Face3(0, 1, 2))
  //       material.side = THREE.DoubleSide
  //       const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(material))
  //       mesh.renderOrder = 999
  //       scene.add(mesh)
  //     } else if(node_positions.length === 2) {

  //       const r = 2.5;
  //       const geometry = new THREE.CylinderBufferGeometry(r, r, 1, 10, 1, false);
  //       geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 1 / 2, 0));
  //       geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));

  //       const line = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(material))
  //       line.renderOrder = 999

  //       const start = node_positions[0]
  //       const end = node_positions[1]
  //       const vStart = new THREE.Vector3(start.x, start.y || 0, start.z || 0);
  //       const vEnd = new THREE.Vector3(end.x, end.y || 0, end.z || 0);
  //       const distance = vStart.distanceTo(vEnd);

  //       line.position.x = vStart.x;
  //       line.position.y = vStart.y;
  //       line.position.z = vStart.z;

  //       line.scale.z = distance;

  //       scene.add(line);

  //       line.parent.localToWorld(vEnd); // lookAt requires world coords
  //       line.lookAt(vEnd);


  //     } else {
  //       // Dunno..? -> Doesn't occur
  //     }
  //   })
  // })

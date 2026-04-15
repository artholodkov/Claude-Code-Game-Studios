# Three.js — Version Reference

| Field | Value |
|-------|-------|
| **Engine Version** | Three.js r170+ |
| **Project Pinned** | 2026-04-16 |
| **Last Docs Verified** | 2026-04-16 |
| **LLM Knowledge Cutoff** | May 2025 |
| **Risk Level** | MEDIUM — r160+ may have API changes beyond training data |

## Knowledge Gap Warning

Three.js releases frequently (minor versions every ~2 months). LLM training
likely covers up to ~r160. Always verify API calls against the official docs
at https://threejs.org/docs/ before using.

## Key APIs for This Project

### Isometric Camera Setup
```js
const camera = new THREE.OrthographicCamera(
  width / -2, width / 2,
  height / 2, height / -2,
  0.1, 1000
);
// Isometric angle: rotate 45° on Y, ~35.26° on X
camera.rotation.order = 'YXZ';
camera.rotation.y = Math.PI / 4;
camera.rotation.x = Math.atan(-1 / Math.sqrt(2));
```

### Voxel (Box) Geometry
```js
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
const voxel = new THREE.Mesh(geometry, material);
scene.add(voxel);
```

### InstancedMesh (performance — for many voxels)
```js
const mesh = new THREE.InstancedMesh(geometry, material, MAX_VOXELS);
// Set per-instance transform via dummy object
const dummy = new THREE.Object3D();
dummy.position.set(x, y, z);
dummy.updateMatrix();
mesh.setMatrixAt(index, dummy.matrix);
mesh.instanceMatrix.needsUpdate = true;
```

## Verified Sources

- Official docs: https://threejs.org/docs/
- Examples: https://threejs.org/examples/
- Changelog: https://github.com/mrdoob/three.js/releases
- Migration guides: https://github.com/mrdoob/three.js/wiki/Migration-Guide

## Notes for This Project

- Use `OrthographicCamera` for true isometric projection (no perspective distortion)
- Use `InstancedMesh` for board voxels — can have 200+ blocks at once
- `MeshLambertMaterial` gives decent lighting at low cost; `MeshToonMaterial` for pixel/cel-shading look
- Pixel art aesthetic: use `NearestFilter` on textures to prevent blurring
  ```js
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  ```

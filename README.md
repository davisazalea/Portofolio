# Interactive 3D Event Badge

Implementasi badge lanyard 3D interaktif di dalam portofolio web menggunakan React Three Fiber.

## Fitur

- **Physics Simulation**: Menggunakan Rapier physics engine untuk simulasi tali dan badge yang realistis
- **Interactive Dragging**: Badge dapat di-drag dengan mouse untuk interaksi langsung
- **3D Model**: Menggunakan model GLTF untuk badge yang detail
- **Textured Band**: Tali dengan tekstur yang dapat diulang
- **Smooth Animations**: Animasi yang halus dengan Framer Motion

## Teknologi

- React Three Fiber
- Three.js
- @react-three/drei
- @react-three/rapier
- Meshline
- Framer Motion

## Struktur File

```
public/assets/
├── 3d/card.glb          # Model 3D badge
└── images/tag_texture.png # Tekstur untuk tali

src/components/
└── Badge3D.jsx          # Komponen badge 3D utama
```

## Cara Kerja

1. **Physics Bodies**: Badge dan segmen tali menggunakan RigidBody dari Rapier
2. **Joints**: RopeJoint dan SphericalJoint menghubungkan segmen-segmen tali
3. **Curve Generation**: CatmullRomCurve3 menghasilkan kurva tali yang halus
4. **Interaction**: Pointer events menangani drag dan drop badge
5. **Rendering**: MeshLine untuk render tali dengan tekstur

## Inspirasi

Berdasarkan [Interactive 3D Event Badge](https://github.com/daffahaidar/interactive-3d-event-badge) oleh Daffa Haidar.
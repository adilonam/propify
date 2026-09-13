import {
  Renderer,
  Camera,
  Transform,
  Program,
  Mesh,
  Box,
  Plane,
  Vec2,
  Vec3,
  Post,
  Color,
} from "ogl"

export type SkylineQuality = "high" | "lite" | "min"

export type SkylineHandle = {
  canvas: HTMLCanvasElement
  resize: (width: number, height: number) => void
  setPointer: (nx: number, ny: number) => void
  setScroll: (t: number) => void
  setPaused: (paused: boolean) => void
  destroy: () => void
}

export type SkylineOptions = {
  /** @deprecated prefer `quality` + `maxDpr` */
  dpr?: number
  /** @deprecated prefer `quality` */
  buildingCount?: number
  /** @deprecated prefer `quality` */
  enableBloom?: boolean
  quality?: SkylineQuality
  maxDpr?: number
  /** Subtle idle forward drift when true */
  flow?: boolean
  onFirstFrame?: () => void
  onContextLost?: () => void
}

const buildingVertex = /* glsl */ `
  attribute vec3 position;
  attribute vec3 normal;
  attribute vec3 offset;
  attribute vec3 scale;
  attribute float shade;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat3 normalMatrix;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vShade;
  varying vec3 vViewDir;
  varying float vHeightNorm;

  void main() {
    // Silk / candle ripple — displace sideways with height-based waves
    float hNorm = position.y + 0.5;
    float ripple =
      sin(hNorm * 9.0 + offset.x * 3.0 + uTime * 0.35) * 0.045 +
      sin(hNorm * 17.0 + offset.z * 2.5) * 0.022;
    vec3 local = position;
    local.x += ripple * (1.0 - abs(position.x) * 0.35);
    local.z += ripple * 0.55 * (1.0 - abs(position.z) * 0.35);

    // Soften normals with ripple derivative so specular follows folds
    vec3 n = normal;
    float dr =
      cos(hNorm * 9.0 + offset.x * 3.0 + uTime * 0.35) * 0.4 +
      cos(hNorm * 17.0 + offset.z * 2.5) * 0.25;
    n.x += dr * 0.35;
    n = normalize(n);

    vec3 pos = local * scale + offset;
    vec4 world = modelViewMatrix * vec4(pos, 1.0);
    vWorldPos = pos;
    vNormal = normalize(normalMatrix * n);
    vShade = shade;
    vViewDir = normalize(-world.xyz);
    vHeightNorm = hNorm;
    gl_Position = projectionMatrix * world;
  }
`

const buildingFragment = /* glsl */ `
  precision highp float;

  varying vec3 vNormal;
  varying vec3 vWorldPos;
  varying float vShade;
  varying vec3 vViewDir;
  varying float vHeightNorm;

  uniform vec3 uColorDeep;
  uniform vec3 uColorMid;
  uniform vec3 uColorHi;
  uniform vec3 uLightDir;
  uniform float uReflectStrength;
  uniform float uMirror;

  void main() {
    vec3 n = normalize(vNormal);
    vec3 l = normalize(uLightDir);
    float ndl = max(dot(n, l), 0.0);
    float fresnel = pow(1.0 - max(dot(n, normalize(vViewDir)), 0.0), 2.6);
    float rim = pow(1.0 - max(n.y * 0.5 + 0.5, 0.0), 1.45);

    float heightGlow = smoothstep(0.0, 10.0, vWorldPos.y) * 0.4;

    // Neon base bloom where pillars meet the floor
    float baseGlow = exp(-abs(vWorldPos.y) * 1.8) * (1.0 - uMirror * 0.35);
    baseGlow += exp(-max(vWorldPos.y, 0.0) * 3.2) * 0.55;

    vec3 base = mix(uColorDeep, uColorMid, ndl * 0.5 + vShade * 0.4);
    base = mix(base, uColorHi, fresnel * 0.8 + heightGlow);
    base += uColorHi * rim * 0.28;
    base += vec3(0.62, 0.38, 1.0) * fresnel * uReflectStrength;

    // Specular glints along glass folds
    vec3 h = normalize(l + normalize(vViewDir));
    float spec = pow(max(dot(n, h), 0.0), 56.0);
    base += vec3(0.9, 0.75, 1.0) * spec * 0.75;

    // Hot purple emissive at bases (feeds bloom)
    base += vec3(0.75, 0.25, 1.15) * baseGlow * (uMirror > 0.5 ? 0.55 : 1.35);
    base += vec3(0.45, 0.15, 0.85) * baseGlow * baseGlow * 0.8;

    gl_FragColor = vec4(base, 1.0);
  }
`

const floorVertex = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying vec2 vUv;
  varying vec3 vPos;

  void main() {
    vUv = uv;
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const floorFragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vPos;

  uniform vec3 uGridColor;
  uniform float uTime;

  float gridLine(vec2 uv, float scale, float width) {
    vec2 g = abs(fract(uv * scale) - 0.5);
    vec2 line = smoothstep(width, 0.0, g);
    return max(line.x, line.y);
  }

  void main() {
    vec2 uv = vPos.xz * 0.5;
    float dist = length(vPos.xz);

    float g1 = gridLine(uv, 1.0, 0.032);
    float g2 = gridLine(uv, 4.0, 0.018);
    float grid = g1 * 0.6 + g2 * 0.3;

    float fade = 1.0 - smoothstep(3.5, 24.0, dist);
    float pulse = 0.82 + 0.18 * sin(uTime * 0.7 + dist * 0.4);

    vec3 col = vec3(0.015, 0.008, 0.04);
    // Mirror sheen under buildings
    col += vec3(0.18, 0.06, 0.32) * fade * 0.55;
    col += uGridColor * grid * fade * pulse;
    // Corridor vanishing-point glow
    col += vec3(0.42, 0.14, 0.72) * (1.0 - smoothstep(0.0, 12.0, dist)) * 0.45;
    // Soft reflection wash
    col += vec3(0.14, 0.05, 0.28) * fade * 0.5;

    gl_FragColor = vec4(col, 1.0);
  }
`

const chevronVertex = /* glsl */ `
  attribute vec3 position;
  attribute vec3 normal;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform mat3 normalMatrix;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`

const chevronFragment = /* glsl */ `
  precision highp float;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  uniform vec3 uColor;
  uniform float uIntensity;

  void main() {
    vec3 n = normalize(vNormal);
    float fresnel = pow(1.0 - max(dot(n, normalize(vViewDir)), 0.0), 2.0);
    vec3 col = uColor * uIntensity;
    col += vec3(1.0, 0.88, 1.0) * fresnel * 0.9;
    gl_FragColor = vec4(col * 1.55, 1.0);
  }
`

const glowVertex = /* glsl */ `
  attribute vec3 position;
  attribute vec2 uv;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const glowFragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uIntensity;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p);
    float a = smoothstep(1.0, 0.0, d);
    a = pow(a, 1.65);
    vec3 col = uColor * a * uIntensity;
    gl_FragColor = vec4(col, a * 0.9);
  }
`

const rayFragment = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uIntensity;

  void main() {
    // Vertical god-ray streak
    float x = abs(vUv.x * 2.0 - 1.0);
    float y = vUv.y;
    float a = smoothstep(0.55, 0.0, x) * smoothstep(0.0, 0.15, y) * smoothstep(1.0, 0.35, y);
    a = pow(a, 1.4);
    vec3 col = uColor * a * uIntensity;
    gl_FragColor = vec4(col, a * 0.55);
  }
`

const brightPassFragment = /* glsl */ `
  precision highp float;
  uniform sampler2D tMap;
  uniform float uThreshold;

  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(tMap, vUv);
    float lum = length(tex.rgb) / 1.73205;
    vec4 bright = tex * step(uThreshold, lum);
    gl_FragColor = bright;
  }
`

const blurFragment = /* glsl */ `
  precision highp float;

  vec4 blur5(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
    vec4 color = vec4(0.0);
    vec2 off1 = vec2(1.3333333333333333) * direction;
    color += texture2D(image, uv) * 0.29411764705882354;
    color += texture2D(image, uv + (off1 / resolution)) * 0.35294117647058826;
    color += texture2D(image, uv - (off1 / resolution)) * 0.35294117647058826;
    return color;
  }

  uniform sampler2D tMap;
  uniform vec2 uDirection;
  uniform vec2 uResolution;

  varying vec2 vUv;

  void main() {
    gl_FragColor = blur5(tMap, vUv, uResolution, uDirection);
  }
`

const compositeFragment = /* glsl */ `
  precision highp float;

  uniform sampler2D tMap;
  uniform sampler2D tBloom;
  uniform float uBloomStrength;

  varying vec2 vUv;

  void main() {
    vec4 base = texture2D(tMap, vUv);
    vec4 bloom = texture2D(tBloom, vUv);
    gl_FragColor = base + bloom * uBloomStrength;
  }
`

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function resolveQuality(options: SkylineOptions) {
  const quality: SkylineQuality =
    options.quality ??
    (options.enableBloom === false
      ? "lite"
      : options.buildingCount && options.buildingCount < 80
        ? "lite"
        : "high")

  const presets = {
    high: { buildingCount: 140, bloom: true, dprCap: 1.75, rays: 5 },
    lite: { buildingCount: 72, bloom: true, dprCap: 1.25, rays: 3 },
    min: { buildingCount: 40, bloom: false, dprCap: 1, rays: 0 },
  } as const

  const preset = presets[quality]
  return {
    quality,
    buildingCount: options.buildingCount ?? preset.buildingCount,
    enableBloom: options.enableBloom ?? preset.bloom,
    dprCap:
      options.dpr ??
      Math.min(
        options.maxDpr ?? preset.dprCap,
        typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
      ),
    rays: preset.rays,
  }
}

function buildInstanceData(count: number, mirror: boolean) {
  const offset = new Float32Array(count * 3)
  const scale = new Float32Array(count * 3)
  const shade = new Float32Array(count)
  const rand = seededRandom(42)

  let i = 0
  const rows = 16
  const colsPerSide = Math.ceil(count / (rows * 2))

  for (let row = 0; row < rows && i < count; row++) {
    const z = -row * 1.28 - 0.55
    const depthFade = row / rows

    for (let side = -1; side <= 1; side += 2) {
      for (let col = 0; col < colsPerSide && i < count; col++) {
        // Tight corridor near center, wider outer columns
        const lane = 0.95 + col * 0.78 + rand() * 0.16
        const x = side * lane
        // Front candles taller — canyon vanishing point
        const h = 2.1 + rand() * 7.8 * (0.55 + (1 - depthFade) * 1.05)
        const w = 0.28 + rand() * 0.42
        const d = 0.28 + rand() * 0.32
        const y = mirror ? -h * 0.5 - 0.015 : h * 0.5

        offset.set(
          [x + (rand() - 0.5) * 0.08, y, z + (rand() - 0.5) * 0.12],
          i * 3
        )
        scale.set([w, h, d], i * 3)
        shade[i] = 0.2 + rand() * 0.8
        i++
      }
    }
  }

  while (i < count) {
    const side = rand() > 0.5 ? 1 : -1
    const z = -rand() * 20 - 1
    const h = 1.6 + rand() * 5.5
    offset.set([side * (1.1 + rand() * 3.2), mirror ? -h * 0.5 : h * 0.5, z], i * 3)
    scale.set([0.35 + rand() * 0.25, h, 0.35 + rand() * 0.25], i * 3)
    shade[i] = rand()
    i++
  }

  return { offset, scale, shade }
}

export function createSkyline(
  container: HTMLElement,
  options: SkylineOptions = {}
): SkylineHandle {
  const { buildingCount, enableBloom, dprCap, rays } = resolveQuality(options)
  const flow = options.flow ?? true

  const renderer = new Renderer({
    dpr: dprCap,
    alpha: false,
    antialias: true,
    powerPreference: "high-performance",
  })
  const gl = renderer.gl
  gl.clearColor(0.008, 0.004, 0.018, 1)
  container.appendChild(gl.canvas)
  Object.assign(gl.canvas.style, {
    position: "absolute",
    inset: "0",
    display: "block",
    width: "100%",
    height: "100%",
  })

  const onContextLost = (e: Event) => {
    e.preventDefault()
    options.onContextLost?.()
  }
  gl.canvas.addEventListener("webglcontextlost", onContextLost)

  const camera = new Camera(gl, { fov: 40, near: 0.1, far: 90 })
  camera.position.set(0, 1.75, 6.2)

  const scene = new Transform()
  const lightDir = { value: new Vec3(0.28, 0.9, 0.4).normalize() }
  const timeUniform = { value: 0 }

  const makeBuildings = (mirror: boolean) => {
    const data = buildInstanceData(buildingCount, mirror)
    const geometry = new Box(gl, {
      width: 1,
      height: 1,
      depth: 1,
      attributes: {
        offset: { instanced: 1, size: 3, data: data.offset },
        scale: { instanced: 1, size: 3, data: data.scale },
        shade: { instanced: 1, size: 1, data: data.shade },
      },
    })

    const program = new Program(gl, {
      vertex: buildingVertex,
      fragment: buildingFragment,
      uniforms: {
        uColorDeep: {
          value: mirror ? new Color("#140822") : new Color("#1a0833"),
        },
        uColorMid: {
          value: mirror ? new Color("#3d1568") : new Color("#5b1f96"),
        },
        uColorHi: {
          value: mirror ? new Color("#7a4aa8") : new Color("#d4b0ff"),
        },
        uLightDir: lightDir,
        uReflectStrength: { value: mirror ? 0.3 : 0.95 },
        uMirror: { value: mirror ? 1 : 0 },
        uTime: timeUniform,
      },
    })

    const mesh = new Mesh(gl, { geometry, program })
    mesh.setParent(scene)
    return mesh
  }

  makeBuildings(false)
  makeBuildings(true)

  // Floor
  const floorGeo = new Plane(gl, { width: 52, height: 52, widthSegments: 1, heightSegments: 1 })
  const floorProgram = new Program(gl, {
    vertex: floorVertex,
    fragment: floorFragment,
    uniforms: {
      uGridColor: { value: new Color("#c084fc") },
      uTime: timeUniform,
    },
  })
  const floor = new Mesh(gl, { geometry: floorGeo, program: floorProgram })
  floor.rotation.x = -Math.PI / 2
  floor.position.y = 0
  floor.setParent(scene)

  // Chevron emblem (upward V) at vanishing point
  const chevronProgram = new Program(gl, {
    vertex: chevronVertex,
    fragment: chevronFragment,
    uniforms: {
      uColor: { value: new Color("#c084fc") },
      uIntensity: { value: 1.7 },
    },
  })

  const barGeo = new Box(gl, { width: 1.05, height: 0.16, depth: 0.16 })
  const leftBar = new Mesh(gl, { geometry: barGeo, program: chevronProgram })
  const rightBar = new Mesh(gl, { geometry: barGeo, program: chevronProgram })
  const chevronZ = -17.2
  leftBar.position.set(-0.32, 1.05, chevronZ)
  rightBar.position.set(0.32, 1.05, chevronZ)
  leftBar.rotation.z = Math.PI / 4
  rightBar.rotation.z = -Math.PI / 4
  leftBar.setParent(scene)
  rightBar.setParent(scene)

  const glowGeo = new Plane(gl, { width: 5.5, height: 5.5 })
  const glowProgram = new Program(gl, {
    vertex: glowVertex,
    fragment: glowFragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColor: { value: new Color("#9333ea") },
      uIntensity: { value: 2.0 },
    },
  })
  const glow = new Mesh(gl, { geometry: glowGeo, program: glowProgram })
  glow.position.set(0, 1.15, chevronZ + 0.35)
  glow.setParent(scene)

  const groundGlow = new Mesh(gl, {
    geometry: new Plane(gl, { width: 10, height: 14 }),
    program: new Program(gl, {
      vertex: glowVertex,
      fragment: glowFragment,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new Color("#7c3aed") },
        uIntensity: { value: 1.25 },
      },
    }),
  })
  groundGlow.rotation.x = -Math.PI / 2
  groundGlow.position.set(0, 0.025, -13)
  groundGlow.setParent(scene)

  // Soft vertical god-rays rising from taller corridor pillars
  const rayProgram = new Program(gl, {
    vertex: glowVertex,
    fragment: rayFragment,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColor: { value: new Color("#a855f7") },
      uIntensity: { value: 1.1 },
    },
  })
  const rayGeo = new Plane(gl, { width: 0.55, height: 9 })
  const rayMeshes: Mesh[] = []
  const rayRand = seededRandom(99)
  for (let r = 0; r < rays; r++) {
    const side = r % 2 === 0 ? -1 : 1
    const mesh = new Mesh(gl, { geometry: rayGeo, program: rayProgram })
    mesh.position.set(
      side * (1.4 + rayRand() * 2.2),
      4.2 + rayRand() * 2.5,
      -2 - rayRand() * 10
    )
    mesh.setParent(scene)
    rayMeshes.push(mesh)
  }

  // Post / bloom
  let postComposite: Post | null = null
  let postBloom: Post | null = null
  let compositePass: { enabled: boolean } | null = null
  const resolution = { value: new Vec2() }
  const bloomResolution = { value: new Vec2() }

  if (enableBloom) {
    postComposite = new Post(gl)
    postBloom = new Post(gl, { dpr: 0.5, targetOnly: true })

    postBloom.addPass({
      fragment: brightPassFragment,
      uniforms: { uThreshold: { value: 0.55 } },
    })
    const horizontalPass = postBloom.addPass({
      fragment: blurFragment,
      uniforms: {
        uResolution: bloomResolution,
        uDirection: { value: new Vec2(2.2, 0) },
      },
    })
    const verticalPass = postBloom.addPass({
      fragment: blurFragment,
      uniforms: {
        uResolution: bloomResolution,
        uDirection: { value: new Vec2(0, 2.2) },
      },
    })
    for (let i = 0; i < 4; i++) {
      postBloom.passes.push(horizontalPass, verticalPass)
    }

    compositePass = postComposite.addPass({
      fragment: compositeFragment,
      uniforms: {
        uResolution: resolution,
        tBloom: postBloom.uniform,
        uBloomStrength: { value: 0.95 },
      },
    })
  }

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  let scrollT = 0
  let paused = false
  let raf = 0
  let firstFrame = true
  let startTime = performance.now()
  const lookTarget = new Vec3(0, 1.15, -19)
  const baseCam = { x: 0, y: 1.75, z: 6.2 }

  function resize(width: number, height: number) {
    const w = Math.max(1, width)
    const h = Math.max(1, height)
    renderer.setSize(w, h)
    camera.perspective({ aspect: w / h })
    if (postComposite) postComposite.resize()
    if (postBloom) postBloom.resize()
    resolution.value.set(w, h)
    if (postBloom) {
      bloomResolution.value.set(postBloom.resolutionWidth, postBloom.resolutionHeight)
    }
  }

  function renderFrame(t: number) {
    const elapsed = (t - startTime) * 0.001
    timeUniform.value = elapsed

    pointer.x += (pointer.tx - pointer.x) * 0.055
    pointer.y += (pointer.ty - pointer.y) * 0.055

    const flowZ = flow ? Math.sin(elapsed * 0.22) * 0.35 + elapsed * 0.04 : 0
    const scrollPull = scrollT * 2.4

    camera.position.x = baseCam.x + pointer.x * 0.6
    camera.position.y = baseCam.y + pointer.y * 0.28 + scrollT * 0.12
    camera.position.z = baseCam.z - scrollPull - flowZ

    lookTarget.set(pointer.x * 0.4, 1.05 + pointer.y * 0.18, -19)
    camera.lookAt(lookTarget)

    const pulse = 1.55 + Math.sin(elapsed * 1.35) * 0.22
    chevronProgram.uniforms.uIntensity.value = pulse
    glowProgram.uniforms.uIntensity.value = 1.75 + Math.sin(elapsed * 1.15) * 0.3
    rayProgram.uniforms.uIntensity.value = 0.95 + Math.sin(elapsed * 0.9) * 0.2

    for (let i = 0; i < rayMeshes.length; i++) {
      rayMeshes[i].rotation.z = Math.sin(elapsed * 0.4 + i) * 0.04
    }

    if (postComposite && postBloom && compositePass) {
      compositePass.enabled = false
      postComposite.targetOnly = true
      postComposite.render({ scene, camera })

      postBloom.render({ texture: postComposite.uniform.value })

      compositePass.enabled = true
      postComposite.targetOnly = false
      postComposite.render({ texture: postComposite.uniform.value })
    } else {
      renderer.render({ scene, camera })
    }

    if (firstFrame) {
      firstFrame = false
      options.onFirstFrame?.()
    }
  }

  function update(t: number) {
    raf = requestAnimationFrame(update)
    if (paused) return
    renderFrame(t)
  }

  raf = requestAnimationFrame(update)

  const rect = container.getBoundingClientRect()
  resize(rect.width || window.innerWidth, rect.height || window.innerHeight)
  renderFrame(performance.now())

  return {
    canvas: gl.canvas as HTMLCanvasElement,
    resize,
    setPointer(nx: number, ny: number) {
      pointer.tx = Math.max(-1, Math.min(1, nx))
      pointer.ty = Math.max(-1, Math.min(1, ny))
    },
    setScroll(t: number) {
      scrollT = Math.max(0, Math.min(1, t))
    },
    setPaused(value: boolean) {
      paused = value
      if (!value) {
        startTime = performance.now() - timeUniform.value * 1000
      }
    },
    destroy() {
      cancelAnimationFrame(raf)
      gl.canvas.removeEventListener("webglcontextlost", onContextLost)
      if (gl.canvas.parentElement === container) {
        container.removeChild(gl.canvas)
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext()
    },
  }
}

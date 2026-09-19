declare module 'vanta/dist/vanta.net.min' {
  const NET: (options: Record<string, unknown>) => { destroy: () => void }
  export default NET
}

declare module 'vanta/dist/vanta.globe.min' {
  const GLOBE: (options: Record<string, unknown>) => { destroy: () => void }
  export default GLOBE
}

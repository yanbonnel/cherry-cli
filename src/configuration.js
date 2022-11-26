export const { default: configuration } = await import(`${process.cwd()}/.cherry.js`)

export const getRepo = (configuration) => configuration.repo

export const getMetrics = (configuration) => configuration.metrics

import configFile from "../.cherry.js";

export const getRepo = (configuration) => configuration.repo;

export const getMetrics = (configuration) => configuration.metrics;

export const configuration = configFile;

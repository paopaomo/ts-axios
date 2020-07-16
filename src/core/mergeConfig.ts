import { AxiosRequestConfig } from '../types';

function defaultStrategy(val1: any, val2: any): any {
  return typeof val2 === 'undefined' ? val1 : val2;
}

function fromVal2Strategy(val1: any, val2: any): any {
  return val2;
}

const strategy = Object.create(null);

const strategyKeysFromVal2 = ['url', 'params', 'data'];

strategyKeysFromVal2.forEach(key => {
  strategy[key] = fromVal2Strategy;
});

export default function mergeConfig(config1: AxiosRequestConfig, config2?: AxiosRequestConfig) {
  if (!config2) {
    config2 = {};
  }

  const config = Object.create(null);

  for (const key in config2) {
    mergeField(key);
  }

  for (const key in config1) {
    if (!config2[key]) {
      mergeField(key);
    }
  }

  function mergeField(key: string): void {
    const strategyFunc = strategy[key] || defaultStrategy;
    config[key] = strategyFunc(config1[key], config2[key]);
  }

  return config;
}

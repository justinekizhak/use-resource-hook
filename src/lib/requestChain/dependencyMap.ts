import {
  DependencyMap_T,
  CreateDependencyMapReturn_T
} from "../types/requestChain/dependencyMap.type";
import type { ChainedRequestConfig_T } from "../types/useResource.type";
import { getAllDependencyName, getName } from "../utils/requestChain";

export const createDependencyMap = (
  requestChain: ChainedRequestConfig_T[]
): CreateDependencyMapReturn_T => {
  const map: DependencyMap_T = {};
  let start: string = "";
  let previousDep: string | null = null;
  requestChain.forEach((request, index) => {
    const dependencyName: string = getName(request, index);
    let dependencyList: string[] | null | undefined = request?.dependencyList;
    if (!dependencyList && previousDep) {
      dependencyList = [previousDep];
    }
    request.requestName = dependencyName;
    map[dependencyName] = dependencyList || null;
    previousDep = dependencyName;
    if (!start) {
      start = dependencyName;
    }
  });
  return { dependencyMap: map, start };
};

export const validateRequestChain = (
  requestChain: ChainedRequestConfig_T[]
) => {
  const invalidDeps: string[] = [];
  // Check for valid dependencies
  const allDependencyNames = getAllDependencyName(requestChain);
  requestChain.forEach((request) => {
    const dependencyList = request?.dependencyList || [];
    dependencyList.forEach((depName) => {
      if (!allDependencyNames.includes(depName)) {
        invalidDeps.push(depName);
      }
    });
  });

  if (invalidDeps.length > 0) {
    throw new Error(`Invalid deps: ${JSON.stringify(new Set(invalidDeps))}`);
  }
  return true;

  // // Check for circular dependencies
  // const { dependencyMap, start } = createDependencyMap(requestChain);
  // const visitedDeps = [];
};

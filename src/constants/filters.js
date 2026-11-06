import { DARK_PRESETS } from "./filterPresets.js";

export const CAMERA_FILTERS = DARK_PRESETS;
export const DEFAULT_FILTER_ID = "abismo";

const FILTERS_BY_ID = new Map(
  CAMERA_FILTERS.map((filter) => [filter.id, filter]),
);
const DEFAULT_FILTER = FILTERS_BY_ID.get(DEFAULT_FILTER_ID);

export function getFilterById(filterId) {
  return FILTERS_BY_ID.get(filterId) || DEFAULT_FILTER;
}

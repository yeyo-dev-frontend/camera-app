import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DEFAULT_FILTER_ID, getFilterById } from "../../constants/filters";
import { hapticsService } from "../../services/haptics/hapticsService";
import { clampIntensity, resolveFilter } from "../../utils/filterSettings";

export function useCameraFilters(disabled) {
  const [activeFilterId, setActiveFilterId] = useState(DEFAULT_FILTER_ID);
  const [filterIntensity, setFilterIntensity] = useState(1);
  const disabledRef = useRef(disabled);

  useEffect(() => {
    disabledRef.current = disabled;
  }, [disabled]);

  const activeFilter = useMemo(
    () => resolveFilter(getFilterById(activeFilterId), filterIntensity),
    [activeFilterId, filterIntensity],
  );

  const selectFilter = useCallback((id) => {
    if (disabledRef.current) return;
    const targetId = getFilterById(id).id;
    setActiveFilterId((prevId) => {
      if (prevId === targetId) return prevId;
      hapticsService.selection();
      return targetId;
    });
  }, []);

  const changeFilterIntensity = useCallback((value) => {
    if (disabledRef.current) return;
    setFilterIntensity(clampIntensity(value));
  }, []);

  return {
    activeFilterId,
    activeFilter,
    filterIntensity,
    selectFilter,
    changeFilterIntensity,
  };
}

import React from "react";
import { ScrollView } from "react-native";

import { CAMERA_FILTERS } from "../../../constants/filters";
import { Box } from "../../atoms";
import { FilterChipItem } from "../../molecules/filter-controls/FilterChipItem";
import { IntensityStepper } from "../../molecules/filter-controls/IntensityStepper";

function FilterSelectorBarImpl({
  activeFilterId,
  onSelectFilter,
  disabled,
  intensity,
  onChangeIntensity,
}) {
  return (
    <Box
      className="absolute bottom-[10px] left-4 right-4 items-center"
      pointerEvents="box-none"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="grow-0 h-[44px] w-full"
        contentContainerStyle={{
          alignItems: "center",
          gap: 16,
          paddingHorizontal: 4,
        }}
      >
        {CAMERA_FILTERS.map((filter) => (
          <FilterChipItem
            key={filter.id}
            filter={filter}
            selected={filter.id === activeFilterId}
            disabled={disabled}
            onSelectFilter={onSelectFilter}
          />
        ))}
      </ScrollView>
      {activeFilterId !== "original" && (
        <IntensityStepper
          intensity={intensity}
          disabled={disabled}
          onChangeIntensity={onChangeIntensity}
        />
      )}
    </Box>
  );
}

export const FilterSelectorBar = React.memo(FilterSelectorBarImpl);

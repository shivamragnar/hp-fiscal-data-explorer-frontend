import React from "react";
import MediaQuery from "react-responsive";

//custom components
import { MultiSelect } from 'carbon-components-react';


const FFilterColumn2 = ({ onChange, allFiltersData, filterCompData, filtersLoading, activeFilters  }) => {

  //declare the components that need to be dynamically generated
	const Components = { MultiSelect };

  return (

    <div className="filter-col">
      {
        filterCompData.map((filter_comp,i) => {
            const Component = Components[filter_comp.comp]
            return (
							<div className = "filter-col--ops">
	              <Component
	                className={`f-${allFiltersData[i] && allFiltersData[i].key}-multiselect`}
	                titleText = {filter_comp.titleText}
									disabled = {filtersLoading}
									useTitleInItem={false}
									label={filtersLoading ? "Loading..." : activeFilters[allFiltersData[i].key] ? activeFilters[allFiltersData[i].key].join(", ") : "All"}
									invalid={false}
									invalidText="Invalid Selection"
									onChange = {(e) => onChange(e, allFiltersData[i] && allFiltersData[i].key)}
	                items = {allFiltersData[i] && allFiltersData[i].val}
	                items={allFiltersData[i] && allFiltersData[i].val}
	                />
							</div>
            )
          }
        )
      }

    </div>

  );
}
export default FFilterColumn2;

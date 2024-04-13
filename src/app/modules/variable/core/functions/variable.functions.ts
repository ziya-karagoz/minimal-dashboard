import { fetchVariables } from "../api/variable.requests";
import { EVariableType, EVariableTypeL } from "../models/variable.enums";

// return EVariableTypeL[type] as label and EVariableType[type] as value

function getVariableTypeOptions() {
  return Object.keys(EVariableType).map((type) => ({
    label: EVariableTypeL[
      EVariableType[type as keyof typeof EVariableType]
    ] as string,
    value: EVariableType[type as keyof typeof EVariableType],
  }));
}

export const RSvariableTypeOptions = getVariableTypeOptions();

export const loadVariableOptions = async (
  search: any,
  _: any,
  { page }: any
) => {
  let initialOptions = [
    {
      label: "Yeni Değişken Ekle",
      value: null,
    },
  ];

  return fetchVariables({
    skip: page,
    filter: `[{"id":"global_search","type":"SEARCH","value":"${search}","columns":[{"id":"name","type":"string"}]}, {"id":"active","type":"SELECT","selecteds":[true],"min":null,"max":null}]`,
    take: 10,
  })
    .then((res: any) => {
      // if page is 1 add initial options
      const options = page === 1 ? initialOptions : [];
      res.items.map((item: any) => {
        options.push({
          label: item.name,
          value: item.id,
        });
      });

      return {
        options: options,
        hasMore: res.meta.totalPages > res.meta.currentPage,
        additional: {
          page: page + 1,
        },
      };
    })
    .catch((err) => err);
};

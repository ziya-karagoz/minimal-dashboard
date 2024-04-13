import { fetchUnits } from "@app/modules/predefinitions/units/core/api/unit.requests";

export const loadUnitOptions = async (search: any, _: any, { page }: any) => {
  return fetchUnits({
    skip: page,
    filter: `[{"id":"global_search","type":"SEARCH","value":"${search}","columns":[{"id":"name","type":"string"}]}, {"id":"active","type":"SELECT","selecteds":[true],"min":null,"max":null}]`,
    take: 10,
  })
    .then((res: any) => {
      const options = res.items.map((item: any) => ({
        label: item.name,
        value: item.id,
      }));
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

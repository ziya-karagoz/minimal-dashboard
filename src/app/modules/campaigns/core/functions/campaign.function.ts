import { fetchCustomers } from "@app/modules/customer/core/api/customer.request";

export const loadCustomerOptions = async (__: any, _: any, { page }: any) => {
  return fetchCustomers({
    skip: page,
    //TODO[ziya-karagoz]: This filter is not working properly at backend. After our beloved backend developer fixes it, we can use it.
    //filter: `[{"id":"global_search","type":"SEARCH","value":"${search}","columns":[{"id":"company_name","type":"string"}]}, {"id":"active","type":"SELECT","selecteds":[true],"min":null,"max":null}]`,
    take: 10,
  })
    .then((res) => {
      const options = res.items.map((item: any) => ({
        label: item.company_name,
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
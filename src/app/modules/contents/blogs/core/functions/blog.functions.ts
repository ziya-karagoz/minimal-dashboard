import { fetchBlogCategories } from "@app/modules/contents/blog-categories/core/api/blog-category.request";

export const loadBlogCategoryOptions = async (search: any, _: any, { page }: any) => {
  return fetchBlogCategories({
    skip: page,
    filter: `[{"id":"global_search","type":"SEARCH","value":"${search}","columns":[{"id":"name","type":"string"}]}, {"id":"active","type":"SELECT","selecteds":[true],"min":null,"max":null}]`,
    take: 10,
  })
    .then((res: any) => {
      const options = res.items.map((item: any) => ({
        label: item.title,
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

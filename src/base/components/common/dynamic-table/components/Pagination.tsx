import React from "react";

type PaginationProps = {
  count: number;
  onChange: (page: number) => void;
  defaultPage: number;
  totalPages: number;
};

export default function Pagination({
  count,
  onChange,
  defaultPage,
  totalPages,
}: PaginationProps) {
  const paginationLists = () => {
    let elements = [];
    let paginate = count > 5 ? 5 : count;
    if (defaultPage < 5) {
      for (let index = 1; index <= paginate; index++) {
        elements.push(
          <li
            key={index}
            className={
              "paginate_item page-item " +
              (defaultPage === index ? "active" : "")
            }
          >
            <button
              onClick={() => onChange(index)}
              className="paginate_button page-link"
              aria-controls="datatable"
              data-dt-idx={1}
              tabIndex={0}
            >
              {index}
            </button>
          </li>
        );
      }

      if (count > 5) {
        elements.push(
          <li className={"paginate_item page-item disabled"}>
            <button
              type="button"
              className="paginate_button page-link"
              aria-controls="datatable"
              data-dt-idx={1}
              tabIndex={0}
            >
              ...
            </button>
          </li>
        );

        elements.push(
          <li className={"paginate_item page-item"}>
            <button
              onClick={() => onChange(count)}
              type="button"
              className="paginate_button page-link"
              aria-controls="datatable"
              data-dt-idx={1}
              tabIndex={0}
            >
              {count}
            </button>
          </li>
        );
      }
    } else {
      elements.push(
        <li className={"paginate_item page-item"}>
          <button
            type="button"
            onClick={() => onChange(1)}
            className="paginate_button page-link"
            aria-controls="datatable"
            data-dt-idx={1}
            tabIndex={0}
          >
            1
          </button>
        </li>
      );

      elements.push(
        <li className={"paginate_item page-item disabled"}>
          <button
            type="button"
            className="paginate_button page-link"
            aria-controls="datatable"
            data-dt-idx={1}
            tabIndex={0}
          >
            ...
          </button>
        </li>
      );

      for (let index = defaultPage - 1; index <= defaultPage + 1; index++) {
        if (index - 1 < totalPages) {
          elements.push(
            <li
              key={index}
              className={
                "paginate_item page-item " +
                (defaultPage === index ? "active" : "")
              }
            >
              <button
                onClick={() => onChange(index)}
                className="paginate_button page-link"
                aria-controls="datatable"
                data-dt-idx={1}
                tabIndex={0}
              >
                {index}
              </button>
            </li>
          );
        }
      }

      if (defaultPage + 1 < totalPages) {
        elements.push(
          <li className={"paginate_item page-item disabled"}>
            <button
              type="button"
              className="paginate_button page-link"
              aria-controls="datatable"
              data-dt-idx={1}
              tabIndex={0}
            >
              ...
            </button>
          </li>
        );

        elements.push(
          <li className={"paginate_item page-item"}>
            <button
              onClick={() => onChange(count)}
              type="button"
              className="paginate_button page-link"
              aria-controls="datatable"
              data-dt-idx={1}
              tabIndex={0}
            >
              {count}
            </button>
          </li>
        );
      }
    }

    return elements;
  };

  return (
    <div className="d-flex justify-content-center justify-content-sm-end">
      <nav id="datatablePagination" aria-label="Activity pagination">
        <div
          className="dataTables_paginate paging_simple_numbers"
          id="datatable_paginate"
        >
          <ul
            id="datatable_pagination"
            className="pagination datatable-custom-pagination"
          >
            <li
              className={
                "paginate_item page-item " +
                (defaultPage === 1 ? "disabled" : "")
              }
            >
              <button
                onClick={() => onChange(defaultPage - 1)}
                className="paginate_button previous page-link"
                aria-controls="datatable"
                data-dt-idx={0}
                tabIndex={0}
                id="datatable_previous"
              >
                <span aria-hidden="true">Geri</span>
              </button>
            </li>
            {paginationLists().map((item) => item)}
            <li
              className={
                "paginate_item page-item " +
                (defaultPage === totalPages ? "disabled" : "")
              }
            >
              <button
                onClick={() => onChange(defaultPage + 1)}
                className="paginate_button previous page-link"
                aria-controls="datatable"
                data-dt-idx={0}
                tabIndex={0}
                id="datatable_previous"
              >
                <span aria-hidden="true">İleri</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

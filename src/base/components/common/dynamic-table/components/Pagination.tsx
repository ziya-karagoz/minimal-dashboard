import { useState } from 'react';

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
  const [currentPage, setCurrentPage] = useState(defaultPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onChange(page);
  };

  const paginationItems = () => {
    let items = [];
    let visiblePages = count > 5 ? 5 : count;
    let startPage = currentPage > 3 ? currentPage - 2 : 1;
    let endPage = currentPage > 3 ? currentPage + 2 : visiblePages;

    if (startPage > 1) {
      items.push(
        <li key="first">
          <button
            onClick={() => handlePageChange(1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white rounded-md mx-1 hover:bg-gray-100 hover:text-gray-700 "
          >
            1
          </button>
        </li>
      );

      if (startPage > 2) {
        items.push(
          <li key="dots-prev" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white rounded-md" mx-1 >
            ...
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage && i <= totalPages; i++) {
      items.push(
        <li key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === i ? 'text-white bg-primary-500 hover:bg-primary-600' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'} rounded-md mx-1 `}
          >
            {i}
          </button>
        </li>
      );
    }

    if (endPage < count) {
      if (endPage < count - 1) {
        items.push(
          <li key="dots-next" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white rounded-md" mx-1 >
            ...
          </li>
        );
      }

      items.push(
        <li key="last">
          <button
            onClick={() => handlePageChange(count)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white rounded-md mx-1 hover:bg-gray-100 hover:text-gray-700"
          >
            {count}
          </button>
        </li>
      );
    }

    return items;
  };

  return (
    <nav className='flex items-center md:justify-end justify-center w-full mt-4'>
      <ul className="inline-flex -space-x-px">
        <li>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'} bg-white rounded-md mx-1 rounded-l-md`}
            disabled={currentPage === 1}
          >
            Geri
          </button>
        </li>
        {paginationItems().map((item) => item)}
        <li>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'} bg-white rounded-md mx-1 rounded-r-md`}
            disabled={currentPage === totalPages}
          >
            İleri
          </button>
        </li>
      </ul>
    </nav >
  );
}

import Pagination from "../../../components/Pagination";
import ErrorMessage from "../../../components/Errormessage";

const DataTable = ({
  pageTitle,
  dataListName,
  searchKeywordOnSubmitHandler,
  searchInputPlaceHolder,
  searchKeywordOnChangeHandler,
  searchKeyword,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  children,
  setCurrentPage,
  currentPage,
  headers,
  isError,
  error,
}) => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-forest-800 mb-2">{pageTitle}</h1>
        <div className="w-20 h-1 bg-gradient-to-r from-forest-600 to-forest-400 rounded-full"></div>
      </div>

      <div className="w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-forest-100 overflow-hidden">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-gradient-to-r from-forest-50 to-white border-b border-forest-100">
            <h2 className="text-xl font-bold text-forest-800">
              {dataListName}
            </h2>
            <form
              onSubmit={searchKeywordOnSubmitHandler}
              className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  id="form-subscribe-Filter"
                  className="w-full sm:w-64 px-4 py-2.5 text-sm text-forest-800 placeholder-forest-400 bg-white border-2 border-forest-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-forest-500 focus:border-forest-500 transition-all duration-200"
                  placeholder={searchInputPlaceHolder}
                  onChange={searchKeywordOnChangeHandler}
                  value={searchKeyword}
                />
              </div>
              <button
                className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-forest-600 to-forest-700 rounded-xl shadow-md hover:shadow-lg hover:from-forest-700 hover:to-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-forest-100 to-forest-50">
                  {tableHeaderTitleList.map((title, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="px-6 py-4 text-xs font-bold text-left text-forest-800 uppercase tracking-wider border-b-2 border-forest-200"
                    >
                      {title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-forest-100">
                {isError ? (
                  <tr>
                    <td
                      colSpan={tableHeaderTitleList.length}
                      className="px-6 py-12"
                    >
                      <ErrorMessage
                        message={error?.message || "Failed to load data"}
                      />
                    </td>
                  </tr>
                ) : isLoading || isFetching ? (
                  <tr>
                    <td
                      colSpan={tableHeaderTitleList.length}
                      className="px-6 py-12 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="relative w-12 h-12">
                          <div className="absolute inset-0 border-4 border-forest-200 rounded-full"></div>
                          <div className="absolute inset-0 border-t-4 border-forest-600 rounded-full animate-spin"></div>
                        </div>
                        <span className="text-sm font-medium text-forest-600">
                          Loading data...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : data?.length === 0 ? (
                  <tr>
                    <td
                      colSpan={tableHeaderTitleList.length}
                      className="px-6 py-12 text-center text-forest-600"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-16 h-16 text-forest-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <span className="text-base font-medium">
                          No records found
                        </span>
                        <span className="text-sm text-forest-500">
                          Try adjusting your search criteria
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  children
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading &&
            !isFetching &&
            data?.length > 0 &&
            headers?.["x-totalpagecount"] && (
              <div className="px-6 py-4 bg-gradient-to-r from-white to-forest-50 border-t border-forest-100">
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(headers["x-totalpagecount"])}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;

// src/app/page.js
'use client'; // Add the "use client" directive at the top of the file

import React from 'react';

const PaginationExample = () => {
  // Generate dummy data for reports
  const generateDummyData = (count) => {
    const dummyData = [];
    const startDate = new Date();
    for (let i = 1; i <= count; i++) {
      const reportDate = new Date(startDate.getTime() - i * 24 * 60 * 60 * 1000); // Subtract i days
      const formattedDate = reportDate.toLocaleString(); // Convert to local time format
      const randomName = Math.random().toString(36).substring(7); // Generate random name
      dummyData.push({ id: i, date: formattedDate, name: `Report ${randomName}`, download: `Download Link ${i}` });
    }
    return dummyData;
  };

  // Generate 50 dummy reports
  const reports = generateDummyData(200); // Increased to 50 for more data

  // State for current page, reports per page, and row per page selector
  const [currentPage, setCurrentPage] = React.useState(1);
  const [reportsPerPage, setReportsPerPage] = React.useState(5);

  // Calculate total pages
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to handle reports per page change
  const handleReportsPerPageChange = (e) => {
    setReportsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing reports per page
  };

  // Calculate index of first and last report on current page
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  // Calculate pagination button range
  let startPage = 1;
  let endPage = totalPages;
  if (totalPages > 5) {
    if (currentPage <= 3) {
      endPage = 5;
    } else if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="dialog-box rounded-lg shadow-lg bg-white p-4 relative">
        {/* Close and filter buttons */}
        <div className="absolute top-0 right-0 mt-2 mr-2 flex">
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg mr-2">Filter</button>
          <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg mr-2">Close</button>
          <select
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg"
            value={reportsPerPage}
            onChange={handleReportsPerPageChange}
          >
            <option value="5">5 Rows</option>
            <option value="10">10 Rows</option>
            <option value="20">20 Rows</option>
          </select>
        </div>
        {/* Title */}
        <h2 className="text-lg font-bold mb-4 text-center">Recently Generated Reports</h2>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Report Name</th>
                <th className="px-4 py-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report) => (
                <tr key={report.id}>
                  <td className="border px-4 py-2">{report.date}</td>
                  <td className="border px-4 py-2">{report.name}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                      Download PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {/* Previous button */}
          <button
            className={`px-3 py-1 rounded-lg mr-2 ${currentPage === 1 ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {/* Page buttons */}
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
            <button
              key={startPage + i}
              onClick={() => handlePageChange(startPage + i)}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === startPage + i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {startPage + i}
            </button>
          ))}
          {/* Next button */}
          <button
            className={`px-3 py-1 rounded-lg ml-2 ${currentPage === totalPages ? 'bg-gray-200 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <select
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg ml-8"
            value={reportsPerPage}
            onChange={handleReportsPerPageChange}
          >
            <option value="5">5 Rows</option>
            <option value="10">10 Rows</option>
            <option value="20">20 Rows</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PaginationExample;

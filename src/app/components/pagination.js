// src/app/page.js
'use client'; // Add the "use client" directive at the top of the file

import React from 'react';

const PaginationPage = () => {
  // Generate dummy data for reports
  const generateDummyData = (count) => {
    const dummyData = [];
    const startDate = new Date();
    for (let i = 1; i <= count; i++) {
      const reportDate = new Date(startDate.getTime() - i * 24 * 60 * 60 * 1000); // Subtract i days
      const formattedDate = reportDate.toDateString();
      dummyData.push({ id: i, date: formattedDate, name: `Report ${i}`, download: `Download Link ${i}` });
    }
    return dummyData;
  };

  // Generate 30 dummy reports
  const reports = generateDummyData(30);

  // Custom paginator logic
  const reportsPerPage = 5;
  const totalPages = Math.ceil(reports.length / reportsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="dialog-box rounded-lg shadow-lg bg-white p-4 flex flex-col items-center">
        <h2 className="text-lg font-bold mb-4">Recently Generated Reports</h2>
        <table className="table-auto">
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
                <td className="border px-4 py-2">{report.download}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between w-full mt-4">
          {/* Close button */}
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">Close</button>
          {/* Filter button */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Filter</button>
        </div>
        <div className="flex justify-center mt-4">
          {/* Custom paginator */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1 rounded-lg ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaginationPage;

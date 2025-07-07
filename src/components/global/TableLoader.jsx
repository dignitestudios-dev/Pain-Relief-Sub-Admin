const TableLoader = () => {
  return (
    <table className="min-w-full table-auto text-left text-sm text-gray-700 mt-14">
      <tbody>
        {Array.from({ length: 5 }).map((_, index) => (
          <tr key={index} className="border-b animate-pulse">
            <td className="py-3 px-2 text-center">
              <div className="w-4 h-4 bg-gray-200 rounded mx-auto" />
            </td>
            <td className="py-3 px-2 flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="w-24 h-4 bg-gray-200 rounded" />
            </td>
            <td className="py-3 px-2">
              <div className="w-32 h-4 bg-gray-200 rounded" />
            </td>
            <td className="py-3 px-2">
              <div className="w-24 h-4 bg-gray-200 rounded" />
            </td>
            <td className="py-3 px-2">
              <div className="w-28 h-4 bg-gray-200 rounded" />
            </td>
            <td className="py-3 px-2">
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </td>
            <td className="py-3 px-2">
              <div className="w-20 h-4 bg-gray-200 rounded" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableLoader;

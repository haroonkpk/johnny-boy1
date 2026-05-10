import Button from "@/components/ui/Button";

export default function DataTable({
  columns,
  data,
  onView,
}: any) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead className="bg-gray-100 text-gray-600 text-sm uppercase">
          <tr>
            {columns.map((col: string) => (
              <th key={col} className="p-4">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row: any, i: number) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                {Object.values(row).map((val: any, idx: number) => (
                  <td key={idx} className="p-4 text-gray-700">
                    {val}
                  </td>
                ))}

                <td>
                  <Button
                    variant="secondary"
                    className="text-sm px-3 py-1"
                    onClick={() => onView(row)}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center py-10 text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
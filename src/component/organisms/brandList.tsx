import Link from "next/link";

export const BrandList = ({ data }: { data: any[] }) => {
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {data.map((item: any) => (
        <li key={item.id} className="flex justify-between gap-x-6 py-5">
          <Link
            href={`/brand/${item.description}`}
            className="self-center text-gray-900"
          >
            <div className="flex min-w-0 gap-x-4">
              {item?.featuredImage && (
                <img
                  className="h-12 w-12 flex-none bg-gray-50"
                  src={item?.featuredImage?.url}
                  alt={item.title}
                />
              )}
              <div className="min-w-0 flex items-center">{item.title}</div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

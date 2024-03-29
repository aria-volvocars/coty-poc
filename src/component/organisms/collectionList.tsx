import Link from "next/link";

export const CollectionList = ({
  brand,
  data,
}: {
  brand: string;
  data: any[];
}) => {
  return (
    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
      {data.map((collection: any) => (
        <div key={collection.id} className="group relative">
          <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
            <img
              src={collection?.featuredImage?.url}
              alt={collection?.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h3 className="mt-6 text-base font-semibold text-gray-900">
            <Link href={`/brand/${brand}/collection/${collection.description}`}>
              <span className="absolute inset-0" />
              {collection.title}
            </Link>
          </h3>
        </div>
      ))}
    </div>
  );
};

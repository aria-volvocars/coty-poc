import Link from "next/link";

export const ProductList = ({
  brand,
  collection,
  data,
}: {
  brand: string;
  collection: string;
  data: any[];
}) => {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {data.map((product: any) => (
        <Link
          key={product.id}
          href={`/product/${product.id.substring(
            22
          )}?brand=${brand}&collection=${collection}`}
          className="group"
        >
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={product?.featuredImage?.url}
              alt={product?.title}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(product.priceRange.minVariantPrice.amount)}
          </p>
        </Link>
      ))}
    </div>
  );
};

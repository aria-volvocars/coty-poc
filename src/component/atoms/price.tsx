export const Price = ({ data }: { data: any }) => {
  return (
    <p className="text-3xl tracking-tight text-gray-900">
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(data?.priceRange?.minVariantPrice?.amount)}
    </p>
  );
};

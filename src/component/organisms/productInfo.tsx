import { Options } from "@/component/molecules/options";
import { Description } from "@/component/molecules/description";

export const ProductInfo = ({
  data,
  selectedSize,
  setSelectedSize,
}: {
  data: any;
  selectedSize: any;
  setSelectedSize: (size: any) => void;
}) => {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {data?.title}
        </h1>
      </div>

      {/* Options */}
      <Options
        data={data}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
      />

      <Description data={data} />
    </div>
  );
};

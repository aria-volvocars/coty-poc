import { Price } from "@/component/atoms/price";
import { Sizes } from "@/component/atoms/sizes";

export const Options = ({
  data,
  selectedSize,
  setSelectedSize,
}: {
  data: any;
  selectedSize: any;
  setSelectedSize: (size: any) => void;
}) => {
  return (
    <div className="mt-4 lg:row-span-3 lg:mt-0">
      <h2 className="sr-only">Product information</h2>
      <Price data={data} />

      <form className="mt-10">
        {/* Sizes */}
        <Sizes
          data={data}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <button
          type="submit"
          className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add to cart
        </button>
      </form>
    </div>
  );
};

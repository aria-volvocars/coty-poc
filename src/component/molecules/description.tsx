export const Description = ({ data }: { data: any }) => {
  return (
    <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
      {/* Description and details */}
      <div>
        <h3 className="sr-only">Description</h3>

        <div
          className="space-y-6 text-base text-gray-900"
          dangerouslySetInnerHTML={{ __html: data?.description }}
        />
      </div>
    </div>
  );
};

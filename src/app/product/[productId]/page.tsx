"use client";

import { useEffect, useState } from "react";
import { getCollectionDetail } from "@/component/fetch/frontend/fetchCollectionDetail";
import { getProductDetail } from "@/component/fetch/frontend/fetchProductDetail";
import { useSearchParams } from "next/navigation";
import { RadioGroup } from "@headlessui/react";

export default function Page({ params }: any) {
  const searchParams = useSearchParams();
  const [collectionData, setCollectionData] = useState<any>();
  const [productData, setProductData] = useState<any>();
  const [selectedSize, setSelectedSize] = useState<any>();
  const brandId = searchParams.get("brand");
  const collectionId = searchParams.get("collection");

  useEffect(() => {
    const collection = async () => {
      const data = await getCollectionDetail(collectionId ?? "");
      data && setCollectionData(data.data.collections.nodes[0]);
    };

    collection();
    return () => {};
  }, [collectionId]);

  useEffect(() => {
    const product = async () => {
      const data = await getProductDetail(params.productId);
      data && setProductData(data.data.product);
      data && setSelectedSize(data.data.product.variants.nodes[0]);
    };

    product();
    return () => {};
  }, [params.productId]);

  const classNames = (...classes: any[]) => {
    return classes.filter(Boolean).join(" ");
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {collectionId && (
              <li>
                <div className="flex items-center">
                  <a
                    href={`/brand/${brandId}/collection/${collectionId}`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {collectionData?.title}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            )}
            <li className="text-sm">
              <a
                href={`/product/${productData?.id.substring(
                  22
                )}?brand=${brandId}&collection=${collectionId}`}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {productData?.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={productData?.images?.nodes?.[0]?.url}
              alt={productData?.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={productData?.images?.nodes?.[1]?.url}
                alt={productData?.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={productData?.images?.nodes?.[2]?.url}
                alt={productData?.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={productData?.images?.nodes?.[3]?.url}
              alt={productData?.title}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {productData?.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(productData?.priceRange?.minVariantPrice?.amount)}
            </p>

            <form className="mt-10">
              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {productData?.variants?.nodes?.map((size: any) => (
                      <RadioGroup.Option
                        key={size.id}
                        value={size}
                        disabled={!size.quantityAvailable}
                        className={({ active }) =>
                          classNames(
                            !!size.quantityAvailable
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size.title}
                            </RadioGroup.Label>
                            {!!size.quantityAvailable ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-900"
                dangerouslySetInnerHTML={{ __html: productData?.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { getCollectionDetail } from "@/component/fetch/frontend/fetchCollectionDetail";
import { getProductDetail } from "@/component/fetch/frontend/fetchProductDetail";
import { useSearchParams } from "next/navigation";
import { ImageGallery } from "@/component/organisms/imageGallery";
import { ProductInfo } from "@/component/organisms/productInfo";

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
        <ImageGallery data={productData} />

        {/* Product info */}
        <ProductInfo
          data={productData}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>
    </div>
  );
}

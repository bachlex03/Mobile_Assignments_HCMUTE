import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useState } from "react";
import ProductLayout from "~/components/layouts/product.layout";
import ProductItem from "@components/ui/product-item";
import { router } from "expo-router";
import { useGetProductsAsyncQuery } from "~/src/infrastructure/redux/apis/product.api";
import { logger } from "react-native-logs";
import { ProductItemType } from "~/src/infrastructure/types/product.type";
import LoadingOverlay from "@components/ui/LoadingOverlay";
import IoniIcons from "react-native-vector-icons/Ionicons";
// import AppDropdown, { DropdownItem } from '@components/ui/AppDropdown';
import AppFilter, { DropdownFilterParams } from "@components/ui/AppFilter";
import AppFilterVariants, {
  DropdownFilterVariants,
} from "@components/ui/AppFilterVariants";
import { PaginationType } from "~/src/infrastructure/types/base-response.type";
import { useAppSelector } from "~/src/infrastructure/redux/store";

var log = logger.createLogger();

const FilterVariants: DropdownFilterVariants[] = [
  {
    name: "brand",
    variantValues: ["Prada", "Chanel", "Gucci", "Louis Vuitton"],
  },
  {
    name: "gender",
    variantValues: ["Woman", "Man", "Unisex"],
  },
  {
    name: "sizes",
    variantValues: ["S", "M", "L", "XL"],
  },
  {
    name: "colors",
    variantValues: ["Red", "Pink", "Yellow", "Brown"],
  },
];

const filterQueryParams: DropdownFilterParams[] = [
  {
    name: "brand",
    queryParam: "_product_brand",
  },
  {
    name: "gender",
    queryParam: "_product_gender",
  },
  {
    name: "sizes",
    queryParam: "_product_sizes",
  },
  {
    name: "colors",
    queryParam: "_product_colors",
  },
];

const ProductScreen = () => {
  const [productsData, setProductsData] = useState<ProductItemType[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [filters, setFilters] = useState<Partial<PaginationType>>({});
  const [totalItems, setTotalItems] = useState<number | null>(null);

  const [queryParam, setQueryParam] = useState<DropdownFilterParams | null>(
    null
  );
  const [selectedFilterVariant, setSelectedFilterVariant] =
    useState<DropdownFilterVariants | null>(null);

  const searchQuery = useAppSelector((state) => state.search.query);

  console.log("filters:", filters);

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProductsAsyncQuery({
    _page: page,
    _limit: limit,
    _q: searchQuery ?? "",
    ...filters,
  });

  React.useEffect(() => {
    if (productsResponse?.data?.items) {
      if (page === 1) {
        // Reset data on new sort/filter
        setProductsData(productsResponse.data.items);
      } else {
        // Append for pagination
        setProductsData((prev) => {
          const data = Array<ProductItemType>();

          new Map(
            [...prev, ...productsResponse.data.items].map((item) => [
              item._id,
              item,
            ])
          ).forEach((value) => {
            data.push(value);
          });

          return data;
        });
      }
      if (productsResponse.data.meta?.totalItems !== undefined) {
        setTotalItems(productsResponse.data.meta.totalItems);
      }
    }
  }, [productsResponse, page]);

  const loadMoreProducts = useCallback(() => {
    if (
      !isFetching &&
      !isError &&
      totalItems !== null &&
      productsData.length < totalItems
    ) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, isError, totalItems, productsData.length]);

  const handleScroll = useCallback(
    (event: any) => {
      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;
      const paddingToBottom = 20;
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      ) {
        loadMoreProducts();
      }
    },
    [loadMoreProducts]
  );

  const handleQueryParamsSelect = (item: DropdownFilterParams | null) => {
    const variant = FilterVariants.find(
      (variant) => variant.name === item?.name
    );

    setSelectedFilterVariant(variant || null);
    setQueryParam(item);

    //  console.log("Query param:", item);
    //  console.log("Query filter variant:", variant);

    if (item && variant) {
      const newFilters = {
        //   ...filters,
        [item.queryParam]: variant?.variantValues[0], // e.g., _product_brand: "Gucci"
      };

      setFilters(newFilters);
      setPage(1); // Reset to first page
      setProductsData([]); // Clear current data
      refetch(); // Fetch with new filters
    } else {
      // Clear filter if no variant is selected
      setFilters({});
      setPage(1);
      setProductsData([]);
      refetch();
    }
  };

  // Handle filter variant selection (e.g., "Gucci" or "Woman")
  const handleQueryVariantSelect = (variantValue: string | null) => {
    //  console.log("queryParam:", queryParam);
    //  console.log("selectedFilterVariant:", variantValue);

    if (queryParam && variantValue) {
      const newFilters = {
        //   ...filters,
        [queryParam.queryParam]: variantValue, // e.g., _product_brand: "Gucci"
      };

      setFilters(newFilters);
      setPage(1); // Reset to first page
      // setProductsData([]); // Clear current data
      refetch(); // Fetch with new filters
    } else {
      // Clear filter if no variant is selected
      setFilters({});
      setPage(1);
      // setProductsData([]);
      refetch();
    }
  };

  return (
    <ProductLayout onScroll={handleScroll}>
      <View className="flex flex-row items-center justify-between px-6 py-5">
        <View>
          <Text className="text-base uppercase font-TenorSans-Regular">
            {totalItems !== null ? `${totalItems} Results` : "Loading..."}
          </Text>
        </View>
        <View className="flex flex-row items-center justify-center gap-4">
          <View className="">
            <AppFilterVariants
              queryParam={queryParam}
              variants={selectedFilterVariant}
              onSelected={handleQueryVariantSelect}
              containerStyles="w-[150px]"
            />
          </View>

          <View className="">
            <AppFilter
              items={filterQueryParams}
              icon={
                <IoniIcons name="filter-outline" size={22} color="#DD8560" />
              }
              onSelected={handleQueryParamsSelect}
            />
          </View>
        </View>
      </View>

      <View>
        <View className="flex-col items-center justify-center gap-6">
          {productsData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push("/products/lamerei")}
            >
              <ProductItem
                item={item}
                title={item.product_name}
                description="reversible angora cardigan"
                price={item.product_price}
                imageUrl={item.product_imgs[0].secure_url}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <LoadingOverlay isLoading={isLoading || isFetching} />
    </ProductLayout>
  );
};

export default ProductScreen;

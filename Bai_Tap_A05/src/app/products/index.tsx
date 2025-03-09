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
import AppDropdown, { DropdownItem } from "@components/ui/AppDropdown";

var log = logger.createLogger();

const brandVariants: DropdownItem[] = [
  {
    id: "1",
    content: "gucci",
  },
  {
    id: "2",
    content: "dior",
  },
  {
    id: "3",
    content: "prada",
  },
];
const genderVariants: DropdownItem[] = [
  {
    id: "1",
    content: "woman",
  },
  {
    id: "2",
    content: "man",
  },
  {
    id: "3",
    content: "unisex",
  },
];
const sizeVariants: DropdownItem[] = [
  {
    id: "1",
    content: "XS",
  },
  {
    id: "2",
    content: "S",
  },
  {
    id: "3",
    content: "M",
  },
  {
    id: "4",
    content: "L",
  },
  {
    id: "5",
    content: "XL",
  },
];
const colorVariants: DropdownItem[] = [
  {
    id: "1",
    content: "red",
  },
  {
    id: "2",
    content: "blue",
  },
  {
    id: "3",
    content: "green",
  },
  {
    id: "4",
    content: "yellow",
  },
];

const filterVariants = [
  {
    id: "1",
    name: "brand",
    dropDownValues: brandVariants,
  },
  {
    id: "2",
    name: "gender",
    dropDownValues: genderVariants,
  },
  {
    id: "3",
    name: "sizes",
    dropDownValues: sizeVariants,
  },
  {
    id: "4",
    name: "colors",
    dropDownValues: colorVariants,
  },
];

const dropdownFilter: DropdownItem[] = [
  {
    id: "1",
    content: "brand",
  },
  {
    id: "2",
    content: "gender",
  },
  {
    id: "3",
    content: "sizes",
  },
  {
    id: "4",
    content: "colors",
  },
];

const ProductScreen = () => {
  const [productsData, setProductsData] = useState<ProductItemType[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(4);
  const [totalItems, setTotalItems] = useState<number | null>(null);
  const [variant, setVariant] = useState<DropdownItem[] | undefined>(undefined); // State for sort dropdown
  const [filterOption, setFilterOption] = useState<DropdownItem | null>(null); // State for filter dropdown

  const {
    data: productsResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProductsAsyncQuery({
    _page: page,
    _limit: limit,
  });

  React.useEffect(() => {
    if (productsResponse?.data?.items) {
      if (page === 1) {
        // Reset data on new sort/filter
        setProductsData(productsResponse.data.items);
      } else {
        // Append for pagination
        setProductsData((prev) => [...prev, ...productsResponse.data.items]);
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

  // Reset page and refetch when sort/filter changes
  const handleVariantSelect = (item: DropdownItem | null) => {
    // console.log(item?.content);
    // setVariant([item]);
  };

  const handleFilterSelect = (item: DropdownItem) => {
    const variant = filterVariants.find((v) => v.id === item.id);

    console.log(variant);

    if (variant) {
      setVariant(variant.dropDownValues);
    } else {
      setVariant(undefined);
    }
  };

  console.log("RENDER");

  return (
    <ProductLayout onScroll={handleScroll}>
      <View className="flex flex-row items-center justify-between px-6 py-5">
        <View>
          <Text className="text-base uppercase font-TenorSans-Regular">
            {totalItems !== null ? `${totalItems} Results` : "Loading..."}
          </Text>
        </View>
        <View className="flex flex-row gap-2">
          <View className="w-[120px] mr-10">
            <AppDropdown
              items={variant || []}
              placeholder={variant ? "Sort" : "Select"}
              containerStyles="rounded-full mr-5 w-[100px]"
              textStyles="text-base"
              iconSize={20}
              onSelect={handleVariantSelect} // Handle sort selection
            />
          </View>
          <AppDropdown
            items={dropdownFilter}
            placeholder="Filter"
            containerStyles="rounded-full w-[120px]"
            textStyles="text-base"
            icon={<IoniIcons name="filter-outline" size={22} color="#DD8560" />}
            iconSize={20}
            onSelect={handleFilterSelect} // Handle filter selection
          />
        </View>
      </View>

      <View>
        <View className="flex flex-col flex-wrap items-center justify-center w-full gap-6">
          {productsData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => router.push("/products/lamerei")}
            >
              <ProductItem
                title="lamerei"
                description="reversible angora cardigan"
                price={120}
                imageUrl="https://res.cloudinary.com/djiju7xcq/image/upload/v1729839380/Sunflower-Jumpsuit-1-690x875_dibawa.webp"
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

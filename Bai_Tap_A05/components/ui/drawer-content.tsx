import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { svgIcons } from '~/constants';
import Button from '~/components/ui/Button';
import { router } from 'expo-router';
import { useGetCategoriesAsyncQuery } from '~/src/infrastructure/redux/apis/category.api';
import { CategoryItemType } from '~/src/infrastructure/types/category.type';

// Sample category data structure
const categories = [
   {
      title: 'New',
      subcategories: [{ title: 'Test', route: 'sub-menu-item' }],
   },
   {
      title: 'Apparel',
      subcategories: [
         { title: 'Outer', route: 'sub-menu-item' },
         { title: 'Dress', route: 'sub-menu-item' },
         { title: 'Blouse/Shirt', route: 'sub-menu-item' },
         { title: 'T-Shirt', route: 'sub-menu-item' },
         { title: 'Knitwear', route: 'sub-menu-item' },
         { title: 'Skirt', route: 'sub-menu-item' },
         { title: 'Pants', route: 'sub-menu-item' },
         { title: 'Denim', route: 'sub-menu-item' },
         { title: 'Kids', route: 'sub-menu-item' },
      ],
   },
   {
      title: 'Bag',
      subcategories: [{ title: 'Test', route: 'sub-menu-item' }],
   },
   {
      title: 'Shoes',
      subcategories: [{ title: 'Test', route: 'sub-menu-item' }],
   },
   {
      title: 'Beauty',
      subcategories: [{ title: 'Test', route: 'sub-menu-item' }],
   },
   {
      title: 'Accessories',
      subcategories: [{ title: 'Test', route: 'sub-menu-item' }],
   },
   {
      title: 'Test',
      route: 'sub-menu-item',
   },
];

// Custom Drawer Content Component
export default function DrawerContent(props: any) {
   const [expandedCategory, setExpandedCategory] = useState(null);
   const [categoriesData, setCategoriesData] = useState<CategoryItemType[]>([]);

   const toggleCategory = (categoryTitle: any) => {
      setExpandedCategory(
         expandedCategory === categoryTitle ? null : categoryTitle,
      );
   };

   const {
      data: categoriesResponse,
      isLoading,
      isFetching,
      isError,
      refetch,
   } = useGetCategoriesAsyncQuery();

   useEffect(() => {
      if (categoriesResponse?.data) {
         setCategoriesData(categoriesResponse.data);
      }
   }, [categoriesResponse]);

   return (
      <View className="flex flex-col w-full h-full">
         {/* HEADER MENU */}
         <View className="relative flex-none w-full h-fit">
            <View className="flex items-center">
               <svgIcons.LogoIcon width={140} height={70} />
            </View>
            <View className="absolute right-4 top-4">
               <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                  <svgIcons.CloseIcon width={40} height={40} />
               </TouchableOpacity>
            </View>
         </View>

         {/* ALL CATEGORIES */}
         <ScrollView className="flex-1 w-full">
            {categories.map((category, index) => (
               <View key={index} className="flex flex-col">
                  <TouchableOpacity
                     className="flex flex-row justify-between px-6 py-3 border-[0.5px] border-gray-200"
                     onPress={() => {
                        if (category.subcategories) {
                           toggleCategory(category.title);
                        } else {
                           props.navigation.navigate(category.route);
                        }
                     }}
                  >
                     <Text className="text-2xl font-TenorSans-Regular">
                        {category.title}
                     </Text>
                     {/* check if this have subcategories */}
                     {category.subcategories && (
                        <Text>
                           {expandedCategory === category.title ? (
                              // '▼'
                              <svgIcons.ArrowDownIcon width={15} height={15} />
                           ) : (
                              // '▶'
                              <svgIcons.ArrowLeftIcon width={15} height={15} />
                           )}
                        </Text>
                     )}
                  </TouchableOpacity>
                  {/* sub categories */}
                  {category.subcategories &&
                     expandedCategory === category.title && (
                        <View className="bg-gray-100">
                           {category.subcategories.map((subItem, subIndex) => (
                              <TouchableOpacity
                                 key={subIndex}
                                 className="py-4 pl-10"
                                 onPress={() =>
                                    props.navigation.navigate(subItem.route)
                                 }
                              >
                                 <Text className="text-xl font-TenorSans-Regular">
                                    {subItem.title}
                                 </Text>
                              </TouchableOpacity>
                           ))}
                        </View>
                     )}
               </View>
            ))}
         </ScrollView>

         {/* SHOP INFO */}
         <View className="flex flex-col flex-none w-full gap-5 py-5 px-7">
            <View className="flex flex-row items-center w-full gap-3">
               <svgIcons.TelephoneIcon width={25} height={25} />
               <Text className="text-xl font-TenorSans-Regular">
                  0912-345-678
               </Text>
            </View>
            <View className="flex flex-row items-center w-full gap-3">
               <svgIcons.LocationIcon width={25} height={25} />
               <Text className="text-xl font-TenorSans-Regular">
                  01 Vo Van Ngan, Thu Duc, HCM city
               </Text>
            </View>
            <View className="flex flex-row items-center justify-center w-full gap-10">
               <svgIcons.TwitterIcon width={30} height={30} />
               <svgIcons.InstagramIcon width={30} height={30} />
               <svgIcons.YoutubeIcon width={30} height={30} />
            </View>
         </View>

         {/* PROFILE */}
         <View className="flex flex-col flex-none w-full gap-5 py-5 px-7">
            <Button
               title="MY PROFILE"
               className="bg-black rounded-none"
               textStyles="text-white text-xl font-TenorSans-Regular"
               onPress={() => router.push('profile')}
            />
            <Button
               title="SIGN OUT"
               className="bg-black rounded-none"
               textStyles="text-white text-xl font-TenorSans-Regular"
               onPress={() => router.push('sign-in')}
            />
         </View>
      </View>
   );
}

import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { cn } from '~/lib/utils';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { DropdownFilterParams } from '@components/ui/AppFilter';

export type DropdownFilterVariants = {
   name: string;
   variantValues: Array<string>;
};

export type AppFilterVariantsProps = {
   containerStyles?: string;
   textStyles?: string;
   icon?: React.ReactNode;
   iconSize?: number;
   variants: DropdownFilterVariants | null;
   queryParam: DropdownFilterParams | null;
   onSelected: (item: string | null) => void;
   onQueryParamChange?: () => void;
};

const AppFilterVariants = ({
   containerStyles,
   textStyles,
   icon,
   iconSize,
   variants,
   queryParam,
   onSelected,
}: AppFilterVariantsProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [placeholder, setPlaceholder] = useState('variants');

   const [selectedItem, setSelectedItem] = useState<string | null>(null);

   const handleChangePlaceholder = (item: string) => {
      setPlaceholder(item);
   };

   // useEffect(() => {}, [queryParam?.name]);

   useEffect(() => {
      setSelectedItem(variants?.variantValues[0] ?? null);
      setPlaceholder(variants?.variantValues[0] ?? 'variants');
   }, [variants]);

   return (
      <View className="relative">
         <TouchableOpacity
            className={cn(
               'bg-[#F9F9F9] p-3 rounded-md flex flex-row items-center justify-between gap-3 w-[100px]',
               containerStyles,
               {
                  'opacity-30': variants ? false : true,
               },
            )}
            onPress={() => setIsOpen(!isOpen)}
            disabled={variants ? false : true}
         >
            <Text
               className={cn(
                  'font-TenorSans-Regular text-[#555] text-base',
                  textStyles,
               )}
            >
               {placeholder}
            </Text>

            {icon ? (
               icon
            ) : (
               <FeatherIcon name="chevron-down" size={iconSize ?? 22} />
            )}
         </TouchableOpacity>

         {isOpen ? (
            <View>
               {variants && variants.variantValues?.length > 0 && (
                  <View className="absolute right-0 z-10 min-w-[110px] mt-2 bg-white border rounded-md border-slate-300">
                     {variants.variantValues.map((item, index) => (
                        <TouchableOpacity
                           key={index}
                           className="border-b border-gray-200"
                           onPress={() => {
                              setIsOpen(false);
                              setSelectedItem(item);
                              onSelected?.(item);
                              handleChangePlaceholder(item);
                           }}
                        >
                           <Text
                              className={cn(
                                 'font-TenorSans-Regular p-4 capitalize',
                                 textStyles,
                              )}
                           >
                              {item}
                           </Text>
                        </TouchableOpacity>
                     ))}
                     {variants.variantValues.length > 0 ? (
                        <TouchableOpacity
                           className="flex flex-row items-center justify-center border-b border-gray-200"
                           onPress={() => {
                              setIsOpen(false);
                              setSelectedItem(null);
                              onSelected?.(null);
                              handleChangePlaceholder('variants');
                           }}
                        >
                           <Text className={cn('font-TenorSans-Regular p-4')}>
                              Clear
                           </Text>
                           <MaterialIcon name="cleaning-services" size={18} />
                        </TouchableOpacity>
                     ) : null}
                  </View>
               )}
            </View>
         ) : null}
      </View>
   );
};

export default AppFilterVariants;

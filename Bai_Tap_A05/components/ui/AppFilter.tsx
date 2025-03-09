import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { cn } from '~/lib/utils';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export type DropdownFilterParams = {
   queryParam: string;
   name: string;
};

export type FilterDropdownProps = {
   containerStyles?: string;
   textStyles?: string;
   icon?: React.ReactNode;
   iconSize?: number;
   items?: DropdownFilterParams[];
   onSelected?: (item: DropdownFilterParams | null) => void;
};

const AppFilter = ({
   containerStyles,
   textStyles,
   icon,
   iconSize,
   items,
   onSelected,
}: FilterDropdownProps) => {
   const [isOpen, setIsOpen] = useState(true);
   const [placeholder, setPlaceholder] = useState('filter');

   //    const [items, setItems] = useState<DropdownFilterParams[]>(items ?? []);
   const [selectedItem, setSelectedItem] =
      useState<DropdownFilterParams | null>();

   return (
      <View className="relative">
         <TouchableOpacity
            className={cn(
               'bg-[#F9F9F9] p-3 rounded-md flex flex-row items-center justify-between gap-3 w-[100px]',
               containerStyles,
            )}
            onPress={() => setIsOpen(!isOpen)}
         >
            <Text
               className={cn(
                  'font-TenorSans-Regular text-[#555] text-base',
                  textStyles,
               )}
            >
               {selectedItem ? selectedItem.name : placeholder}
            </Text>

            {icon ? (
               icon
            ) : (
               <FeatherIcon name="chevron-down" size={iconSize ?? 22} />
            )}
         </TouchableOpacity>

         {isOpen ? (
            <View>
               {items && items?.length > 0 && (
                  <View className="absolute right-0 z-10 min-w-[110px] mt-2 bg-white border rounded-md border-slate-300">
                     {items.map((item, index) => (
                        <TouchableOpacity
                           key={index}
                           className="border-b border-gray-200"
                           onPress={() => {
                              setIsOpen(false);
                              setSelectedItem(item);
                              onSelected?.(item);
                           }}
                        >
                           <Text
                              className={cn(
                                 'font-TenorSans-Regular p-4 capitalize',
                                 textStyles,
                              )}
                           >
                              {item.name}
                           </Text>
                        </TouchableOpacity>
                     ))}
                     {items.length > 0 ? (
                        <TouchableOpacity
                           className="flex flex-row items-center justify-center border-b border-gray-200"
                           onPress={() => {
                              setIsOpen(false);
                              setSelectedItem(null);
                              onSelected?.(null);
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

export default AppFilter;

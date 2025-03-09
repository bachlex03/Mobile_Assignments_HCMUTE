import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { cn } from '~/lib/utils';

export type DropdownItem = {
   id: string;
   content: string; // Custom content for each dropdown item
};

type DropdownProps = {
   items: DropdownItem[] | any[];
   placeholder?: string;
   containerStyles?: string;
   textStyles?: string;
   icon?: React.ReactNode;
   iconSize?: number;
   disabled?: boolean;
   onSelect?: (item: DropdownItem) => void; // Add callback for selection
};

const AppDropdown = ({
   items,
   placeholder = 'Select an option',
   containerStyles,
   textStyles,
   icon,
   iconSize = 24,
   disabled = false,
   onSelect, // Add to props
}: DropdownProps) => {
   const [isOpen, setIsOpen] = useState(false);
   const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

   const toggleDropdown = () => setIsOpen((prev) => !prev);

   const handleSelect = (item: DropdownItem) => {
      setSelectedItem(item);
      setIsOpen(false); // Close dropdown after selection
      if (onSelect) onSelect(item); // Notify parent of selection
   };

   return (
      <View className={cn('w-[100%]', containerStyles)}>
         <TouchableOpacity
            onPress={toggleDropdown}
            className={cn(
               'bg-[#F9F9F9] p-3 rounded-xl flex flex-row items-center justify-between',
               disabled && 'opacity-30',
            )}
            disabled={disabled}
         >
            <Text
               className={cn(
                  'font-TenorSans-Regular text-[#555] text-xl',
                  textStyles,
               )}
            >
               {selectedItem ? selectedItem.content : placeholder}
            </Text>
            {icon ? icon : <FeatherIcon name="chevron-down" size={iconSize} />}
         </TouchableOpacity>

         {isOpen && (
            <View className="absolute right-0 left-0 top-[48px] z-10 bg-white border rounded-md border-slate-300 mt-1">
               {items.length > 0
                  ? items.map((item) => (
                       <TouchableOpacity
                          key={item.id}
                          onPress={() => handleSelect(item)}
                          className="border-b border-gray-200"
                       >
                          <Text
                             className={cn(
                                'font-TenorSans-Regular pr-5 pl-3 py-2 leading-7 uppercase',
                             )}
                          >
                             {item.content}
                          </Text>
                       </TouchableOpacity>
                    ))
                  : null}

               {items.length > 0 ? (
                  <TouchableOpacity
                     className="flex flex-row items-center justify-center border-b border-gray-200"
                     onPress={() => {
                        setSelectedItem(null);
                        setIsOpen(false);
                     }}
                  >
                     <Text
                        className={cn(
                           'font-TenorSans-Regular pr-5 pl-3 py-2 leading-7 text-center',
                        )}
                     >
                        Clear
                     </Text>
                     <MaterialIcon name="cleaning-services" size={18} />
                  </TouchableOpacity>
               ) : null}
            </View>
         )}
      </View>
   );
};

export default AppDropdown;

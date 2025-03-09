import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Icons from '@constants/svg-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { router } from 'expo-router';
import { cn } from '~/lib/utils';

type CommonLayoutProps = {
   children: React.ReactNode;
   className?: string;
   title: string;
   titleStyles?: string;
};

const CommonLayout = (props: CommonLayoutProps) => {
   return (
      <View className={`flex-1 ${props.className}`}>
         <View className="relative flex items-center justify-center mt-5">
            {router.canGoBack() && (
               <TouchableOpacity
                  onPress={() => router.back()}
                  className="absolute top-0 left-5"
               >
                  <FeatherIcon name="arrow-left" size={24} color="#333" />
               </TouchableOpacity>
            )}
            <Text
               className={cn(
                  'text-2xl mb-2 tracking-[5px] uppercase font-TenorSans-Regular',
                  props.titleStyles,
               )}
            >
               {props.title}
            </Text>
            <Icons.SeparateLine />
         </View>
         {props.children}
      </View>
   );
};

export default CommonLayout;

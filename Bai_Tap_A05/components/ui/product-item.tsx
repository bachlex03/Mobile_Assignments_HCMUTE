import { View, Text, Image } from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

type ProductItemProps = {
   title?: string;
   description?: string;
   price?: number;
   imageUrl?: string;
};

const ProductItem = (props: ProductItemProps) => {
   return (
      <View>
         <View className="relative">
            <Image
               source={{
                  uri: props.imageUrl,
               }}
               style={{ width: 165, height: 240 }}
            />

            <FeatherIcon
               name="heart"
               size={20}
               color="#DD855F"
               className="absolute bottom-2 right-2 "
            />
         </View>
         <View className="px-1 mt-1">
            <Text className="text-lg font-TenorSans-Regular">
               {props.title}
            </Text>
            <Text className="text-sm font-TenorSans-Regular">
               {props.description}
            </Text>
            <Text className="mt-2 text-xl text-secondary font-TenorSans-Regular">
               ${props.price}
            </Text>
         </View>
      </View>
   );
};

export default ProductItem;

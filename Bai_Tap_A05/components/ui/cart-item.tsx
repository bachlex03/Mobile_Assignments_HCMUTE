import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Icons from '@constants/svg-icons';

type CartItemProps = {
   title?: string;
   price: number;
   imageUrl?: string;
   checkout?: boolean;
   quantity?: number;
};

const CartItem = (props: CartItemProps) => {
   const [counter, setCounter] = React.useState(1);

   const total = props.price * (props.quantity || 0);

   return (
      <View>
         <View className="flex flex-row gap-3">
            <View>
               <Image
                  source={{
                     uri: props.imageUrl,
                  }}
                  width={120}
                  height={144}
               />
            </View>

            <View className="flex flex-row gap-[70px]  w-screen p-2">
               <View>
                  <Text className="w-full text-xl uppercase font-TenorSans-Regular">
                     {props.title}
                  </Text>

                  <View className="flex mt-2">
                     <View className="flex flex-row items-center gap-3">
                        <Text className="text-base font-TenorSans-Regular">
                           Color:
                        </Text>
                        <Icons.ColorCircle
                           width={28}
                           height={28}
                           outerCircleColor="#333"
                           innerCircleColor="#DD8560"
                        />
                     </View>

                     <View className="flex flex-row items-center gap-3 mt-2">
                        <Text className="text-base font-TenorSans-Regular">
                           Size:
                        </Text>
                        <View className="relative">
                           <Icons.SizeCircleBlack width={26} height={26} />
                           <Text className="absolute text-base text-white font-TenorSans-Regular left-[8.5px] top-[2px]">
                              S
                           </Text>
                        </View>
                     </View>

                     <View className="mt-4">
                        {props.checkout ? (
                           <View className="flex flex-row items-center">
                              <Text className="text-xl font-TenorSans-Regular text-secondary">
                                 ${props.price} x {props.quantity}
                              </Text>

                              <Text className="text-xl font-TenorSans-Regular text-primary ml-[100px]">
                                 ${total}
                              </Text>
                           </View>
                        ) : (
                           <View className="flex flex-row justify-between gap-5">
                              <TouchableOpacity
                                 onPress={() => setCounter(counter - 1)}
                              >
                                 <AntDesignIcon
                                    name="minuscircleo"
                                    size={24}
                                    color="#3339"
                                 />
                              </TouchableOpacity>
                              <Text className="text-xl font-TenorSans-Regular">
                                 {counter}
                              </Text>
                              <TouchableOpacity
                                 onPress={() => setCounter(counter + 1)}
                              >
                                 <AntDesignIcon
                                    name="pluscircleo"
                                    size={24}
                                    color="#3339"
                                 />
                              </TouchableOpacity>
                           </View>
                        )}
                     </View>
                  </View>
               </View>

               <View className="items-end justify-end">
                  <Text className="font-TenorSans-Regular">Sub total:</Text>
                  <Text className="text-lg font-TenorSans-Regular text-secondary">
                     ${props.price * counter}
                  </Text>
               </View>
            </View>
         </View>
      </View>
   );
};

export default CartItem;

{
   /* <View className="p-2">
               <Text className="w-full text-xl uppercase font-TenorSans-Regular">
                  {props.title}
               </Text>

               <View className="flex mt-2">
                  <View className="flex flex-row items-center gap-3">
                     <Text className="text-base font-TenorSans-Regular">
                        Color:
                     </Text>
                     <Icons.ColorCircle
                        width={28}
                        height={28}
                        outerCircleColor="#333"
                        innerCircleColor="#DD8560"
                     />
                  </View>

                  <View className="flex flex-row items-center gap-3 mt-2">
                     <Text className="text-base font-TenorSans-Regular">
                        Size:
                     </Text>
                     <View className="relative">
                        <Icons.SizeCircleBlack width={26} height={26} />
                        <Text className="absolute text-base text-white font-TenorSans-Regular left-[8.5px] top-[2px]">
                           S
                        </Text>
                     </View>
                  </View>
               </View>

               <View className="mt-4">
                  {props.checkout ? (
                     <View className="flex flex-row items-center">
                        <Text className="text-xl font-TenorSans-Regular text-secondary">
                           ${props.price} x {props.quantity}
                        </Text>

                        <Text className="text-xl font-TenorSans-Regular text-primary ml-[100px]">
                           ${total}
                        </Text>
                     </View>
                  ) : (
                     <View className="flex flex-row justify-between gap-5 mr-[70px]">
                        <TouchableOpacity
                           onPress={() => setCounter(counter - 1)}
                        >
                           <AntDesignIcon
                              name="minuscircleo"
                              size={24}
                              color="#3339"
                           />
                        </TouchableOpacity>
                        <Text className="text-xl font-TenorSans-Regular">
                           {counter}
                        </Text>
                        <TouchableOpacity
                           onPress={() => setCounter(counter + 1)}
                        >
                           <AntDesignIcon
                              name="pluscircleo"
                              size={24}
                              color="#3339"
                           />
                        </TouchableOpacity>
                     </View>
                  )}
                  {/* <View className="">
                     <Text className="text-2xl text-secondary font-TenorSans-Regular">
                        ${props.price * counter}
                     </Text>
                  </View> */
}
//  </View>
// </View> */}

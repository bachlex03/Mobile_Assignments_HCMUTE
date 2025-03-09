import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import Icons from '@constants/svg-icons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import { useDispatch } from 'react-redux';
import {
   setSearchOpened,
   setSearchQuery,
} from '~/src/infrastructure/redux/features/app/search.slice';

const Search = () => {
   const query = useAppSelector((state) => state.search.query);

   const [searchText, setSearchText] = React.useState(query || '');
   const dispatch = useDispatch();

   return (
      <View className="flex flex-row justify-between p-2 mx-5 border-b border-b-slate-300">
         <TextInput
            placeholder="Search"
            value={searchText}
            className="h-10 font-TenorSans-Regular text-wrap w-[230px]"
            onChangeText={(text) => {
               setSearchText(text);
            }}
         />

         <View className="flex flex-row items-center justify-center gap-4">
            <TouchableOpacity
               className="p-2 rounded-full bg-[#F8F8F8]"
               onPress={() => {
                  dispatch(setSearchQuery(''));
                  setSearchText('');
                  dispatch(setSearchOpened(false));
               }}
            >
               <FeatherIcon name="x" size={22} color="#555555" />
            </TouchableOpacity>

            <TouchableOpacity
               className="p-2 rounded-full bg-[#F8F8F8]"
               onPress={() => {
                  dispatch(setSearchQuery(searchText));
                  dispatch(setSearchOpened(false));
               }}
            >
               <Icons.SearchIcon width={22} height={22} />
            </TouchableOpacity>
         </View>
      </View>
   );
};

export default Search;

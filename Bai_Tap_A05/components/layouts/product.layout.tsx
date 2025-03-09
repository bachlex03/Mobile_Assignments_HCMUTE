import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Footer from '@components/Footer';
import { cn } from '~/lib/utils';
import { useAppSelector } from '~/src/infrastructure/redux/store';
import Search from '@components/ui/Search';

export default function ProductLayout({
   children,
   className,
   onScroll, // Add onScroll prop
}: {
   children: React.ReactNode;
   className?: string;
   onScroll?: (event: any) => void; // Type for scroll event
}) {
   const isOpened = useAppSelector((state) => state.search.isOpened);

   return (
      <View className={cn('bg-white', className)}>
         {isOpened && <Search />}
         <ScrollView
            onScroll={onScroll} // Pass the onScroll handler
            scrollEventThrottle={16} // Throttle scroll events for performance (16ms)
         >
            {children}
            <Footer />
         </ScrollView>
      </View>
   );
}

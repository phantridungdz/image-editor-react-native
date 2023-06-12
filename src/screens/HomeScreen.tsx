import React from 'react';
import {Text, SafeAreaView, TouchableOpacity, Image, View} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 items-center bg-black">
      <Text className="text-white mt-20 text-[30px]">Take your long bills</Text>
      <Image
        className="w-[245px] h-[245px] mt-20"
        source={require('../../assets/scanbill.png')}
      />
      <Text className="text-gray-600 text-center px-10 font-bold mt-10">
        Take your long bill, document or connect them in a better and easy way
      </Text>
      <TouchableOpacity
        className="rounded-sm mt-10 w-full"
        onPress={() => navigation.push('ScanScreen')}>
        <View className="mx-10 flex flex-row bg-blue-400 items-center px-2 py-2 rounded-md border-2 border-white">
          <Image
            className="w-[25px] h-[25px] p-5"
            source={require('../../assets/takephoto.png')}
          />
          <Text className="font-bold text-white ml-[20px] text-[20px]">
            Shot the bill
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        className="rounded-sm mt-5 w-full"
        onPress={() => navigation.push('SelectImageScreen')}>
        <View className="mx-10 flex flex-row bg-blue-400 items-center px-2 py-2 rounded-md border-2 border-white">
          <Image
            className="w-[25px] h-[25px] p-5"
            source={require('../../assets/gallerry.png')}
          />
          <Text className="font-bold text-white ml-[20px] text-[20px]">
            Select from gallery
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

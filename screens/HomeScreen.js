import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React from 'react';

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-black">
      <Text style={{fontSize: 25}} className="text-white mb-20">
        Please Select Scan Index
      </Text>
      <TouchableOpacity
        className="rounded-sm"
        onPress={() => navigation.push('ScanScreen')}>
        <Text className="bg-slate-400 p-[20px] font-bold">1 x N</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default HomeScreen;

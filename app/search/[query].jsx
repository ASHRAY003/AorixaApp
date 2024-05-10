import React, { PureComponent, useEffect, useState } from 'react'
import { FlatList, Text, View,Image, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import{images} from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts, searchPosts } from '../../lib/appwrite'
import useAppWrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
import { useLocalSearchParams } from 'expo-router'


const Search=()=>{
    const { data: posts, refetch } = useAppWrite(()=>searchPosts(query));
    const{query}=useLocalSearchParams()

    //console.log(posts)

  useEffect(()=>{
    refetch()
  },[query])
    
    return(     
        <SafeAreaView className="bg-primary h-full">
        <FlatList
            data={posts}
            keyExtractor={(item)=>item.$id}
            renderItem={({item})=>(
                // <Text className="text-white text-2xl">{item.title}</Text>
                <VideoCard
                title={item.title}
                thumbnail={item.thumbnail}
                video={item.video}
                creator={item.users.username}
                avatar={item.users?item.users.avatar:null }
          />

            )}
       ListHeaderComponent={()=>(
            <View className="my-6 px-4  flex-1">
                        <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
                        <Text className="text-2xl font-psemibold text-white ">{query}</Text>
                        

                        <View className="mt-6 mb-8">
                             <SearchInput initialQuery={query}/>

                        </View>
                    
            </View>

        )}

        ListEmptyComponent={()=>(
            <EmptyState
            title="No Videos Found"
            subtitle="no videos found for this search query"
            />
        )}

        
        />
        </SafeAreaView>
    )
}

export default Search

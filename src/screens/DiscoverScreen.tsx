import React, {useState} from 'react';
import {View, Text, Dimensions, SafeAreaView} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {ArticleCard} from '@/components/ArticleCard';
import {CategoryTabs} from '@/components/CategoryTabs';

const {height, width} = Dimensions.get('window');
const CARD_HEIGHT = height * 0.82;

const dummyArticles = [
    {
        category: 'For You',
        title: 'China Halts Boeing Jet Deliveries',
        summary: 'According to Bloomberg News, China has ordered its airlines to stop taking deliveries of Boeing jets and halt purchases of aircraft-related equipment and parts from U.S. companies, escalating tensions...',
        image: 'https://source.unsplash.com/800x600/?airplane',
        author: 'kevinrequill',
    },
    {
        category: 'For You',
        title: 'Elephants protect calves during earthquake',
        summary: 'During a 5.2-magnitude earthquake in Southern California, a herd of African elephants at the San Diego Zoo Safari Park demonstrated remarkable protective behavior...',
        image: 'https://source.unsplash.com/800x600/?elephant',
        author: 'aetheris',
    },
];

export default function DiscoverScreen() {
    const [selected, setSelected] = useState('For You');
    const filtered = dummyArticles.filter((a) => a.category === selected);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View>
                <View
                    style={{
                        paddingLeft: 16,
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: 20,
                        zIndex: 10,
                        width: '100%',
                    }}
                >
                    <CategoryTabs selected={selected} onSelect={setSelected}/>
                </View>
            </View>

            <Carousel
                vertical
                data={filtered}
                height={CARD_HEIGHT}
                width={width}
                pagingEnabled
                mode="parallax"
                loop={false}
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 150,
                }}
                scrollAnimationDuration={200} // 300ms로 설정하여 빠른 스크롤
                renderItem={({item}) => (
                    <View
                        style={{
                            height: CARD_HEIGHT,
                            justifyContent: 'center',
                        }}
                    >
                        <ArticleCard article={item}/>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}
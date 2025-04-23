import React, {useState, useEffect, useRef} from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const TICKER_ITEM_HEIGHT = 28; // height of one ticker row

interface TrendingItem {
    rank: number;
    title: string;
    change: number | 'NEW';
}

const categoryData = ['정치', '경제', '사회', '생활/문화', 'IT/과학', '세계', '스포츠', '연예'];

const sampleTrendingData: TrendingItem[] = [
    {rank: 1, title: '이재명 선거법 전환행', change: 0},
    {rank: 2, title: '박형준의 링컨론', change: 1},
    {rank: 3, title: '이재명 영남 압승', change: 1},
    {rank: 4, title: '조용원 2개월째 잠적', change: 3},
    {rank: 5, title: '軍정찰위성 4호 발사', change: 0},
    {rank: 6, title: 'IMF 韓성장률 1%', change: 0},
    {rank: 7, title: 'AI로 진화하는 숏폼', change: 1},
    {rank: 8, title: '교황 선종 세계 추모', change: 'NEW'},
    {rank: 9, title: '김경수의 연정 구상', change: 0},
];

const HomeScreen = () => {
    const [activeTab, setActiveTab] = useState<'주요 뉴스' | '단독' | '오피니언'>('주요 뉴스');
    // Start collapsed so ticker shows by default
    const [collapsed, setCollapsed] = useState(true);
    const [tickerIndex, setTickerIndex] = useState(0);
    const scrollRef = useRef<ScrollView>(null);
    const trendingData = sampleTrendingData;

    useEffect(() => {
      if (!collapsed) return;
      const timer = setInterval(() => {
        const next = (tickerIndex + 1) % trendingData.length;
        scrollRef.current?.scrollTo({ y: next * TICKER_ITEM_HEIGHT, animated: true });
        setTickerIndex(next);
      }, 3000);
      return () => clearInterval(timer);
    }, [collapsed, tickerIndex]);

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerIcons}>
                    <TouchableOpacity>
                        <Ionicons name="search" size={24} color="#000"/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 20}}>
                        <Ionicons name="notifications-outline" size={24} color="#000"/>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Top Tabs */}
            <View style={styles.tabs}>
                {['주요 뉴스', '단독', '오피니언'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        style={styles.tabButton}
                        onPress={() => setActiveTab(tab as any)}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab}
                        </Text>
                        {activeTab === tab && <View style={styles.tabIndicator}/>}
                    </TouchableOpacity>
                ))}
            </View>

            {/* Body */}
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                {/* 1. 급상승 뉴스 */}
                <View style={[styles.section, {marginBottom: 16}]}>
                    {!collapsed && (
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>급상승 뉴스</Text>
                            <View style={styles.sectionRight}>
                                <Text style={styles.sectionDate}>2025년 4월 22일 22:13 기준</Text>
                                <TouchableOpacity onPress={() => setCollapsed(true)}>
                                    <Ionicons name="chevron-down" size={20} color="#666"/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    {collapsed ? (
                        <View style={styles.tickerRow}>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>실시간</Text>
                            </View>
                            <ScrollView
                              ref={scrollRef}
                              style={styles.tickerWrapper}
                              scrollEnabled={false}
                              showsVerticalScrollIndicator={false}
                              contentContainerStyle={{}}
                            >
                              {trendingData.map(item => (
                                <View key={item.rank} style={styles.tickerItem}>
                                  <Text style={styles.trendRank}>{item.rank}.</Text>
                                  <Text style={styles.trendTitle}>{item.title}</Text>
                                </View>
                              ))}
                            </ScrollView>
                            <TouchableOpacity onPress={() => setCollapsed(false)}>
                                <Ionicons name="chevron-up" size={20} color="#666"/>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <FlatList
                            data={trendingData}
                            keyExtractor={item => item.rank.toString()}
                            renderItem={({item}) => (
                                <View style={styles.trendRow}>
                                    <Text style={styles.trendRank}>{item.rank}</Text>
                                    <Text style={styles.trendTitle}>{item.title}</Text>
                                    {typeof item.change === 'number' && item.change > 0 && (
                                        <Text style={styles.trendChange}>↑{item.change}</Text>
                                    )}
                                    {item.change === 'NEW' && (
                                        <Text style={styles.trendNew}>NEW</Text>
                                    )}
                                </View>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.trendSeparator}/>}
                            scrollEnabled={false}
                        />
                    )}
                </View>

                {/* 3. 카테고리별 */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>카테고리별</Text>
                        <TouchableOpacity>
                            <Ionicons name="settings-outline" size={20} color="#000"/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoryList}
                    >
                        {categoryData.map(cat => (
                            <TouchableOpacity
                                key={cat}
                                style={[
                                    styles.categoryButton,
                                    cat === '세계' && styles.categoryButtonActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        cat === '세계' && styles.categoryTextActive,
                                    ]}
                                >
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* 4. 뉴스 리스트 */}
                <View style={styles.newsList}>
                    {/** 대표 카드 하나 */}
                    <View style={styles.largeCard}>
                        <Image
                            source={{uri: 'https://via.placeholder.com/350x150'}}
                            style={styles.largeImage}
                        />
                        <Text style={styles.largeTitle}>
                            프란치스코 교황이 부활절 미사 다음날 선종, 의료진 만류에도…
                        </Text>
                        <Text style={styles.largeTime}>3시간 전</Text>
                    </View>
                    {/** 일반 리스트 아이템 */}
                    {[1, 2, 3, 4, 5].map(idx => (
                        <TouchableOpacity key={idx} style={styles.newsRow}>
                            <Image
                                source={{uri: 'https://via.placeholder.com/80x50'}}
                                style={styles.newsThumbnail}
                            />
                            <View style={styles.newsContent}>
                                <Text style={styles.newsText}>이재명, '코스피 5000시대' 공약 발표</Text>
                                <Text style={styles.newsTime}>2시간 전</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* 5. 카테고리별 더보기 버튼 */}
                <TouchableOpacity style={styles.moreButton}>
                    <Text style={styles.moreText}>카테고리별 더보기</Text>
                    <Ionicons name="chevron-forward" size={16} color="#000"/>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: '#fff'},
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 56,
    },
    logo: {fontSize: 24, fontWeight: 'bold'},
    headerIcons: {flex: 1, flexDirection: 'row', justifyContent: 'flex-end'},

    tabs: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    tabButton: {flex: 1, alignItems: 'center', paddingVertical: 12},
    tabText: {fontSize: 16, color: '#888'},
    tabTextActive: {color: '#000', fontWeight: 'bold'},
    tabIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 2,
        width: '50%',
        backgroundColor: '#000',
    },

    body: {flex: 1},

    section: {paddingHorizontal: 16, marginTop: 16},
    sectionHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14},
    sectionTitle: {fontSize: 18, fontWeight: 'bold'},
    sectionRight: {flexDirection: 'row', alignItems: 'center'},
    sectionDate: {marginRight: 6, color: '#666'},

    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
    },
    trendRank: {width: 24, fontSize: 16, fontWeight: 'bold'},
    trendTitle: {flex: 1, fontSize: 16},
    trendChange: {color: 'red', marginLeft: 8},
    trendNew: {color: 'red', marginLeft: 8},

    breaking: {paddingHorizontal: 16, marginTop: 16},
    breakingLabel: {color: 'red', fontWeight: 'bold', marginBottom: 8},
    breakingCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderRadius: 12,
        padding: 12,
    },
    breakingTitle: {flex: 1, fontSize: 16},

    categoryList: {paddingVertical: 8, paddingLeft: 16, paddingRight: 16},
    categoryButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        marginRight: 8,
    },
    categoryButtonActive: {backgroundColor: '#333', borderColor: '#333'},
    categoryText: {color: '#000'},
    categoryTextActive: {color: '#fff'},

    newsList: {paddingHorizontal: 16, marginTop: 16},
    largeCard: {
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
    },
    largeImage: {width: '100%', height: SCREEN_WIDTH * 0.4},
    largeTitle: {fontSize: 18, fontWeight: 'bold', margin: 8},
    largeTime: {fontSize: 12, color: '#888', marginHorizontal: 8, marginBottom: 8},

    newsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginBottom: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
    },
    newsThumbnail: {
        width: 80,
        height: 50,
        borderRadius: 4,
        marginRight: 12,
    },
    newsContent: {
        flex: 1,
        justifyContent: 'center',
    },
    newsTime: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    newsText: {fontSize: 16, flex: 1},

    moreButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 20,
        margin: 16,
        paddingVertical: 12,
    },
    moreText: {fontSize: 16, marginRight: 4},
    badge: {
        backgroundColor: '#FFD966',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 2,
        marginRight: 8,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#333',
    },
    tickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: TICKER_ITEM_HEIGHT,
    },
    tickerWrapper: {
        flex: 1,
        height: TICKER_ITEM_HEIGHT,
        overflow: 'hidden',
        marginHorizontal: 8,
    },
    tickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: TICKER_ITEM_HEIGHT,
    },
});
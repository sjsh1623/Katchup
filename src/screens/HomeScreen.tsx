import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
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
    Animated,
    LayoutAnimation,
    UIManager,
    Platform,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const TICKER_ITEM_HEIGHT = 28; // height of one ticker row

interface TrendingItem {
    rank: number;
    title: string;
    change: number | 'NEW';
}

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

// 캐치업 전용 트렌딩 데이터
const sampleCatchupTrendingData: TrendingItem[] = [
    {rank: 1, title: '국정감사 현장 돌입', change: 2},
    {rank: 2, title: '신규 스타트업 지원 확대', change: 'NEW'},
    {rank: 3, title: '세계 경제 성장률 전망 상향', change: 1},
    {rank: 4, title: '메타버스 기술 발전 동향', change: 0},
    {rank: 5, title: '환경 규제 강화 입법 추진', change: 3},
    {rank: 6, title: '유럽연합, 탄소국경조정제 시행', change: 1},
    {rank: 7, title: '차세대 배터리 기술 공개', change: 'NEW'},
    {rank: 8, title: '글로벌 반도체 공급망 변화', change: 0},
    {rank: 9, title: '우주개발 민간 진출 가속화', change: 2},
];
const scrollDataNews = [...sampleTrendingData, sampleTrendingData[0]];
const scrollDataCatchup = [...sampleCatchupTrendingData, sampleCatchupTrendingData[0]];

// --- Katchup Logo Font Size Example ---
// If you render a logo like:
//   <Text style={{fontSize: k_height, fontWeight: 'bold'}}>K</Text>
//   <Text style={{fontSize: atchup_font_size}}>atchup.</Text>
// The below calculation determines the font size for "atchup."
// Change: atchup_font_size = int(k_height * 0.7)  -->  atchup_font_size = int(k_height * 0.75)
// Example:
//   const k_height = 40;
//   const atchup_font_size = Math.round(k_height * 0.75); // was 0.7, now 0.75

// 샘플 데이터 (최신 뉴스)
const latestData = [
    {id: '1', title: '이창용 총재, 관세협상 실패 시 경제 비용 경고', time: '1시간 전', imageUrl: 'https://picsum.photos/seed/1/100/80'},
    {id: '2', title: '서울고검, 도이치모터스 의혹 재수사 착수', time: '19시간 전', imageUrl: 'https://picsum.photos/seed/2/100/80'},
    {id: '3', title: '김건희 여사 주가조작 의혹 전면 조사', time: '23시간 전', imageUrl: 'https://picsum.photos/seed/3/100/80'},
    {id: '4', title: '국회, 예산안 심의 본격화', time: '1일 전', imageUrl: 'https://picsum.photos/seed/4/100/80'},
];
// 샘플 데이터 (캐치업)
const catchupData = [
    {id: 'c1', title: '단독: 새로운 정책 발표 요약', time: '2시간 전', imageUrl: 'https://picsum.photos/seed/c1/100/80'},
    {id: 'c2', title: 'AI 챗봇 최신 기능 소개', time: '5시간 전', imageUrl: 'https://picsum.photos/seed/c2/100/80'},
    {id: 'c3', title: '국제 유가 동향 분석', time: '6시간 전', imageUrl: 'https://picsum.photos/seed/c3/100/80'},
    {id: 'c4', title: '글로벌 공급망 이슈 정리', time: '7시간 전', imageUrl: 'https://picsum.photos/seed/c4/100/80'},
];

// 공통 피드 섹션 렌더러
const renderFeedSection = (
    navigation: any,
    title: string,
    data: { id: string; title: string; time: string; imageUrl: string }[],
    showMore: boolean,
    onPressMore?: () => void,
    moreLabel: string = '더보기',
) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        {/* 대형 카드 */}
        {data[0] && (
            <TouchableOpacity
                style={styles.latestLargeCard}
                onPress={() => navigation.navigate('DetailScreen')}
            >
                <Image source={{uri: data[0].imageUrl}} style={styles.latestLargeImage}/>
                <Text style={styles.latestLargeTitle} numberOfLines={2}>
                    {data[0].title}
                </Text>
                <View style={styles.latestLargeMeta}>
                    <Text style={styles.latestMetaTime}>{data[0].time}</Text>
                    <View style={styles.latestMetaIcons}>
                        <Ionicons name="ellipsis-horizontal" size={16} color="#888"/>
                    </View>
                </View>
            </TouchableOpacity>
        )}
        {/* 일반 행 */}
        {data.slice(1).map(item => (
            <TouchableOpacity
                key={item.id}
                style={styles.latestRow}
                onPress={() => navigation.navigate('DetailScreen')}
            >
                <View style={styles.latestRowContent}>
                    <Text style={styles.latestRowTitle} numberOfLines={2}>
                        {item.title}
                    </Text>
                    <Text style={styles.latestRowTime}>{item.time}</Text>
                </View>
                <Image source={{uri: item.imageUrl}} style={styles.latestRowImage}/>
            </TouchableOpacity>
        ))}
        {/* 더보기 버튼 */}
        {showMore && onPressMore && (
            <TouchableOpacity style={styles.moreButton} onPress={onPressMore}>
                <Text style={styles.moreText}>{moreLabel}</Text>
            </TouchableOpacity>
        )}
    </View>
);

const HomeScreen = () => {
    const navigation = useNavigation();
    // Enable LayoutAnimation on Android
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    const [activeTab, setActiveTab] = useState<'새로운 소식' | '캐치업'>('새로운 소식');
    // Split collapse state for each tab
    const [collapsedNews, setCollapsedNews] = useState(true);
    const [collapsedCatchup, setCollapsedCatchup] = useState(true);
    // Animated values for each tab
    const rotateAnimNews = useRef(new Animated.Value(collapsedNews ? 0 : 1)).current;
    const heightAnimNews = useRef(new Animated.Value(TICKER_ITEM_HEIGHT)).current;
    const rotateAnimCatchup = useRef(new Animated.Value(collapsedCatchup ? 0 : 1)).current;
    const heightAnimCatchup = useRef(new Animated.Value(TICKER_ITEM_HEIGHT)).current;
    // ticker index and scrollRef shared (could be split if needed)
    const [tickerIndex, setTickerIndex] = useState(0);
    const scrollRef = useRef<ScrollView>(null);

    const toggleNews = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const next = !collapsedNews;
        setCollapsedNews(next);
        Animated.timing(rotateAnimNews, {
            toValue: next ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        Animated.timing(heightAnimNews, {
            toValue: next ? TICKER_ITEM_HEIGHT : TICKER_ITEM_HEIGHT * (sampleTrendingData.length + 7),
            duration: 150,
            useNativeDriver: false,
        }).start();
    };
    const toggleCatchup = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const next = !collapsedCatchup;
        setCollapsedCatchup(next);
        Animated.timing(rotateAnimCatchup, {
            toValue: next ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        Animated.timing(heightAnimCatchup, {
            toValue: next ? TICKER_ITEM_HEIGHT : TICKER_ITEM_HEIGHT * (sampleCatchupTrendingData.length + 7),
            duration: 150,
            useNativeDriver: false,
        }).start();
    };

    // 기존 뉴스 자동 스크롤
    useEffect(() => {
        if (!collapsedNews) return;
        const timer = setInterval(() => {
            if (!scrollRef.current) return;
            const isLast = tickerIndex === sampleTrendingData.length - 1;
            if (!isLast) {
                // scroll to next item
                const next = tickerIndex + 1;
                scrollRef.current.scrollTo({
                    y: next * TICKER_ITEM_HEIGHT,
                    animated: true,
                });
                setTickerIndex(next);
            } else {
                // scroll to duplicate first item
                scrollRef.current.scrollTo({
                    y: scrollDataNews.length * TICKER_ITEM_HEIGHT - TICKER_ITEM_HEIGHT,
                    animated: true,
                });
                // after animation, jump back to start without animation
                setTimeout(() => {
                    scrollRef.current?.scrollTo({y: 0, animated: false});
                    setTickerIndex(0);
                }, 300);
            }
        }, 3000);
        return () => clearInterval(timer);
    }, [collapsedNews, tickerIndex]);

    // 캐치업 자동 스크롤
    useEffect(() => {
        if (!collapsedCatchup) return;
        const timer = setInterval(() => {
            if (!scrollRef.current) return;
            const isLast = tickerIndex === sampleCatchupTrendingData.length - 1;
            const next = isLast ? 0 : tickerIndex + 1;
            scrollRef.current.scrollTo({y: next * TICKER_ITEM_HEIGHT, animated: true});
            setTickerIndex(next);
        }, 3000);
        return () => clearInterval(timer);
    }, [collapsedCatchup, tickerIndex]);

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require('@/../assets/home-icon.png')}   // 프로젝트 내 로고 파일 경로
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={{marginLeft: 20}} onPress={() => navigation.navigate('AlarmScreen')}>
                        <Ionicons name="notifications-outline" size={24} color="#000"/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.tabs}>
                {['새로운 소식', '캐치업'].map(tab => (
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
            {activeTab === '새로운 소식' && (
                <ScrollView
                    style={styles.body}
                    contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 1. 급상승 뉴스 */}
                    <View style={[styles.section, {marginBottom: 16, position: 'relative'}]}>
                        <Animated.View style={{height: heightAnimNews, overflow: 'hidden'}}>
                            {collapsedNews ? (
                                <View style={styles.tickerRow}>
                                    {/* existing tickerRow contents */}
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>실시간</Text>
                                    </View>
                                    <ScrollView
                                        ref={scrollRef}
                                        style={styles.tickerWrapper}
                                        scrollEnabled={false}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {scrollDataNews.map((item, idx) => (
                                            <View key={idx} style={styles.tickerItem}>
                                                <Text style={styles.trendRank}>{item.rank}.</Text>
                                                <Text style={styles.trendTitle}>{item.title}</Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            ) : (
                                <>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionTitle}>급상승 뉴스</Text>
                                    </View>
                                    <FlatList
                                        data={sampleTrendingData}
                                        keyExtractor={item => item.rank.toString()}
                                        renderItem={({item}) => (
                                            <View style={styles.trendRow}>
                                                <Text style={styles.trendRank}>{item.rank}</Text>
                                                <Text style={styles.trendTitle}>{item.title}</Text>
                                                {typeof item.change === 'number' && item.change > 0 && (
                                                    <Text style={styles.trendChange}>↑{item.change}</Text>
                                                )}
                                                {item.change === 'NEW' && <Text style={styles.trendNew}>NEW</Text>}
                                            </View>
                                        )}
                                        scrollEnabled={false}
                                        ItemSeparatorComponent={() => <View/>}
                                    />
                                </>
                            )}
                        </Animated.View>
                        {/* Single rotating arrow, absolute at right center */}
                        <TouchableOpacity onPress={toggleNews} style={styles.arrowAbsolute}>
                            <AnimatedIcon
                                name="chevron-down"
                                size={20}
                                color="#666"
                                style={{
                                    transform: [
                                        {
                                            rotate: rotateAnimNews.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '180deg'],
                                            }),
                                        },
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* 최신 뉴스 */}
                    {renderFeedSection(
                        navigation,
                        '최신 뉴스',
                        latestData,
                        true,
                        () => navigation.navigate('MoreFeedScreen'),
                        '추천 뉴스 더보기'
                    )}
                </ScrollView>
            )}
            {activeTab === '캐치업' && (
                <ScrollView
                    style={styles.body}
                    contentContainerStyle={{flexGrow: 1, paddingBottom: 50}}
                    showsVerticalScrollIndicator={false}
                >
                    {/* 1. 급상승 뉴스 (캐치업 키워드) */}
                    <View style={[styles.section, {marginBottom: 16, position: 'relative'}]}>
                        <Animated.View style={{height: heightAnimCatchup, overflow: 'hidden'}}>
                            {collapsedCatchup ? (
                                <View style={styles.tickerRow}>
                                    {/* existing catchup tickerRow contents */}
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>실시간</Text>
                                    </View>
                                    <ScrollView
                                        ref={scrollRef}
                                        style={styles.tickerWrapper}
                                        scrollEnabled={false}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {scrollDataCatchup.map((item, idx) => (
                                            <View key={idx} style={styles.tickerItem}>
                                                <Text style={styles.trendRank}>{item.rank}.</Text>
                                                <Text style={styles.trendTitle}>{item.title}</Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            ) : (
                                <>
                                    <View style={styles.sectionHeader}>
                                        <Text style={styles.sectionTitle}>급상승 뉴스</Text>
                                    </View>
                                    <FlatList
                                        data={sampleCatchupTrendingData}
                                        keyExtractor={item => item.rank.toString()}
                                        renderItem={({item}) => (
                                            <View style={styles.trendRow}>
                                                <Text style={styles.trendRank}>{item.rank}</Text>
                                                <Text style={styles.trendTitle}>{item.title}</Text>
                                                {typeof item.change === 'number' && item.change > 0 && (
                                                    <Text style={styles.trendChange}>↑{item.change}</Text>
                                                )}
                                                {item.change === 'NEW' && <Text style={styles.trendNew}>NEW</Text>}
                                            </View>
                                        )}
                                        scrollEnabled={false}
                                        ItemSeparatorComponent={() => <View/>}
                                    />
                                </>
                            )}
                        </Animated.View>
                        <TouchableOpacity onPress={toggleCatchup} style={styles.arrowAbsolute}>
                            <AnimatedIcon
                                name="chevron-down"
                                size={20}
                                color="#666"
                                style={{
                                    transform: [
                                        {
                                            rotate: rotateAnimCatchup.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: ['0deg', '180deg'],
                                            }),
                                        },
                                    ],
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* 캐치업 피드 섹션 */}
                    {renderFeedSection(
                        navigation,
                        '캐치업',
                        catchupData,
                        true,
                        () => navigation.navigate('Discover'),
                        '내 캐치업 더보기'
                    )}
                </ScrollView>
            )}
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
    logo: {
        width: 120,   // 원하는 크기로 조절
        height: 35,
    },
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
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    sectionTitle: {fontSize: 18, fontWeight: 'bold'},
    sectionRight: {flexDirection: 'row', alignItems: 'center'},
    sectionDate: {
        marginRight: 6,
        fontSize: 14,
        fontStyle: 'italic',
        color: '#888',
    },
    trendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
    },
    trendRank: {
        fontSize: 20,
        fontWeight: '600',
        marginRight: 12,
    },
    trendTitle: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    trendChange: {
        fontSize: 14,               // 화살표 글자 크기
        color: 'red',
        marginLeft: 8,
    },
    trendNew: {
        fontSize: 14,
        color: 'red',
        marginLeft: 8,
    },

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
        backgroundColor: '#FFF9E6',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 5,
        marginRight: 12,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555',
    },
    tickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 0,
        height: TICKER_ITEM_HEIGHT,
    },
    arrowButton: {
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tickerWrapper: {
        flex: 1,
        height: TICKER_ITEM_HEIGHT,
        overflow: 'hidden',
        marginHorizontal: 0,
    },
    tickerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        height: TICKER_ITEM_HEIGHT,
    },
    arrowAbsolute: {
        position: 'absolute',
        right: 16,
        top: TICKER_ITEM_HEIGHT / 2,
        marginTop: -10,
    },
    latestLargeCard: {
        marginTop: 8,
        marginBottom: 20,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    latestLargeImage: {
        width: '100%',
        height: SCREEN_WIDTH * 0.55,
        borderRadius: 7,
    },
    latestLargeTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginHorizontal: 10,
        marginTop: 12,
        marginBottom: 0,
        color: '#111',
    },
    latestLargeMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingBottom: 0,
        marginBottom: 0,
    },
    latestMetaTime: {
        fontSize: 12,
        color: '#888',
    },
    latestMetaIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    latestMetaText: {
        fontSize: 12,
        color: '#888',
        marginLeft: 8,
    },
    latestRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 25,
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 7,
        height: 150,
        borderTopWidth: 1,
        borderColor: "#ECECEC"
    },
    latestRowContent: {
        flex: 1,
        marginRight: 12,
        height: '100%',            // fill the row height
        justifyContent: 'space-between',  // title top, time bottom
    },
    latestRowTitle: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    latestRowTime: {
        fontSize: 12,
        color: '#888',
    },
    latestRowImage: {
        width: 95,
        height: 95,
        borderRadius: 8,
    },
    catchupContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        backgroundColor: '#fff',
    },
    catchupText: {
        fontSize: 18,
        color: '#666',
    },
});
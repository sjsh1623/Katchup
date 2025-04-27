// DetailScreen.tsx
import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Image,
    TextInput,
    Dimensions,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_W} = Dimensions.get('window');


const DetailScreen: React.FC = () => {
    const navigation = useNavigation();

    const recommendData = [
        {
            id: 'r1',
            title: '한국옵티칼 해고노동자 소현숙, 476일 고공농성 중단',
            time: '5시간 전',
            comments: 22,
            votes: 33,
            imageUrl: 'https://picsum.photos/seed/r1/100/80',
        },
        {
            id: 'r2',
            title: '남양주 초등생 뺑소니 음주운전자 구속…피해자 의식 회복',
            time: '1일 전',
            comments: 14,
            votes: 16,
            imageUrl: 'https://picsum.photos/seed/r2/100/80',
        },
        {
            id: 'r3',
            title: '중부전선 GP서 기관총 실탄 1발 오발…북측에 즉시 통보',
            time: '16시간 전',
            comments: 36,
            votes: 40,
            imageUrl: 'https://picsum.photos/seed/r3/100/80',
        },
        {
            id: 'r4',
            title: '중국인, 현역 군인 포섭해 한미 군사기밀 수집 시도',
            time: '1일 전',
            comments: 233,
            votes: 272,
            imageUrl: 'https://picsum.photos/seed/r4/100/80',
        },
        {
            id: 'r5',
            title: '고양시 도로공사장 흙더미 붕괴로 근로자 1명 사망',
            time: '1일 전',
            comments: 7,
            votes: 8,
            imageUrl: 'https://picsum.photos/seed/r5/100/80',
        },
        {
            id: 'r6',
            title: '천안 화장품 원료 공장 화재, 1시간여 만에 진화 완료',
            time: '1일 전',
            comments: 223,
            votes: 121,
            imageUrl: 'https://picsum.photos/seed/r6/100/80',
        },
        {
            id: 'r7',
            title: '강남3구 영유아 우울증·불안장애 5년새 3배 급증',
            time: '2시간 전',
            comments: 54,
            votes: 67,
            imageUrl: 'https://picsum.photos/seed/r7/100/80',
        },
    ];

    return (
        <SafeAreaView style={styles.safe}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="chevron-back" size={24} color="#000"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* TODO: share action */
                }}>
                    <Text style={styles.shareText}>공유하기</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
                style={styles.body}
                contentContainerStyle={styles.bodyContent}
                showsVerticalScrollIndicator={false}
            >

                {/* 2. Title */}
                <Text style={styles.title}>
                    교대 입시 합격선 역대 최저, 교사 선호도 급락 심각
                </Text>

                {/* 3. Date info */}
                <View style={styles.dateRow}>
                    <Text style={styles.dateText}>
                        게시 <Text style={styles.dateValue}>2025년 4월 27일 11:34</Text>
                    </Text>
                </View>

                {/* 5. AI Summary */}
                <View style={styles.aiBox}>
                    <View style={styles.aiHeader}>
                        <Ionicons name="cube-outline" size={16} color="#FFB800"/>
                        <Text style={styles.aiTitle}>Katchup AI</Text>
                        <Ionicons name="information-circle-outline" size={14} color="#888" style={{marginLeft: 4}}/>
                    </View>
                    <Text style={styles.aiBody}>AI가 해당 뉴스를 요약하고 키워드를 만들었어요.</Text>
                </View>

                {/* 6. Article body */}
                <Text style={styles.articleText}>
                    2025학년도 교대 입시에서 수시·정시 합격선이 역대 최저 수준으로 하락했다. 종로학원 분석 결과, …
                </Text>

                {/* 함께 볼만한 뉴스 */}
                <View style={styles.recommendSection}>
                    <View style={styles.recommendHeader}>
                        <Text style={styles.recommendTitle}>함께 볼만한 뉴스</Text>
                        <TouchableOpacity style={styles.recommendSort}>
                            <Ionicons name="chevron-down" size={16} color="#888"/>
                        </TouchableOpacity>
                    </View>
                    {recommendData.map((item, index) => (
                        <React.Fragment key={item.id}>
                            <TouchableOpacity style={styles.latestRow} activeOpacity={0.7}>
                                <View style={styles.latestRowContent}>
                                    <Text
                                        style={styles.latestRowTitle}
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        {item.title}
                                    </Text>
                                    <Text style={styles.latestRowTime}>{item.time}</Text>
                                </View>
                                <Image
                                    source={{uri: item.imageUrl}}
                                    style={styles.latestRowImage}
                                />
                            </TouchableOpacity>
                            {index < recommendData.length - 1 && <View style={styles.divider}/>}
                        </React.Fragment>
                    ))}
                    {/* End of 추천 뉴스 */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    safe: {flex: 1, backgroundColor: '#fff'},
    header: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    backBtn: {width: 32, justifyContent: 'center'},
    shareText: {fontSize: 16, color: '#556677'},

    body: {flex: 1},
    bodyContent: {paddingHorizontal: 30, paddingBottom: 32, paddingTop: 16},

    sourceList: {paddingBottom: 12},
    sourceIcon: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },

    title: {
        fontSize: 25,
        fontWeight: '700',
        color: '#111',
        marginBottom: 20,
    },
    dateRow: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    dateText: {
        fontSize: 14,
        color: '#888',
        marginRight: 16,
        marginBottom: 20,
    },
    dateValue: {
        color: '#888',
    },

    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    metaItem: {flexDirection: 'row', alignItems: 'center'},
    metaText: {marginLeft: 4, fontSize: 14, color: '#888'},

    aiBox: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    aiHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 4},
    aiTitle: {marginLeft: 4, fontWeight: '600', color: '#222'},
    aiBody: {fontSize: 14, color: '#333'},

    articleText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 12,
    },

    commentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#EEE',
        paddingTop: 12,
        marginTop: 16,
    },
    commentInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        paddingVertical: 8,
    },

    recommendSection: {
        marginTop: 16,
        backgroundColor: '#fff',
    },
    recommendHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    recommendTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111',
    },
    recommendSort: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    recommendSortText: {
        fontSize: 14,
        color: '#888',
        marginRight: 4,
    },
    recommendRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderColor: '#ECECEC',
    },
    recommendContent: {
        flex: 1,
        marginRight: 12,
    },
    recommendRowTitle: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
    },
    recommendRowMeta: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
    recommendRowImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    latestRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 7,
        height: 100,
        paddingVertical: 15,
        borderColor: '#ECECEC',
    },
    latestRowContent: {
        flex: 1,
        marginRight: 12,
        height: '100%',
        justifyContent: 'space-between',
    },
    latestRowTitle: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22
    },
    latestRowTime: {
        fontSize: 12,
        color: '#888',
    },
    latestRowImage: {
        width: 75,
        height: 75,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    divider: {
        height: 1,
        backgroundColor: '#ECECEC',
    },
});
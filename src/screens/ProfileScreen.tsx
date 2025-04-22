import React, {useRef, useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Ionicons} from '@expo/vector-icons';
import DraggableFlatList, {RenderItemParams} from 'react-native-draggable-flatlist';

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const HORIZONTAL_PADDING = 16;
const PAGE_WIDTH = SCREEN_WIDTH - HORIZONTAL_PADDING * 2;
const ITEM_WIDTH = SCREEN_WIDTH;
const PAGE_PADDING = 20;

const routes = [
    {key: 'threads', title: 'Threads'},
    {key: 'replies', title: 'Replies'},
    {key: 'media', title: 'Media'},
    {key: 'reposts', title: 'Reposts'},
    {key: 'feeds', title: 'Feeds'},
];

const sampleReplies = [
    {
        id: '1',
        avatar: 'https://i.pravatar.cc/150?img=1',
        name: 'gun0912',
        date: '3/17/25',
        text:
            '[개발자 유머] 나도 모르게 User Table의 password 필드를 실수로 날려버렸다. 복구 불가능한 상황… 스친들이라면 어떻게 해결할거야??',
    },
    {
        id: '2',
        avatar: null,
        name: 'sjsh1629',
        date: '3/17/25',
        text: '스냅샷 떠놓은거 있으면 그 테이블만.. 복구….',
    },
];

const threadCardsInit = [
    {
        id: '1',
        title: '키워드 1',
        desc: '여기 뭔가 들어감',
    },
    {
        id: '2',
        title: '키워드 2',
        desc: '여기 뭔가 들어감',
    },
    {
        id: '3',
        title: '키워드 3',
        desc: '여기 뭔가 들어감',
    },
    {
        id: '4',
        title: '키워드 4',
        desc: '여기 뭔가 들어감',
    },
];

const ThreadContent = () => {
    const [cards, setCards] = useState(threadCardsInit);
    const renderItem = ({item, drag, isActive}: RenderItemParams<typeof threadCardsInit[0]>) => (
        <View style={[styles.threadRow, isActive && {opacity: 0.8}]}>
            <View style={styles.threadCard}>
                <View>
                    <Text style={styles.threadNumber}>{item.title}</Text>
                    <Text style={styles.threadSub}>{item.desc}</Text>
                </View>
                <TouchableOpacity onLongPress={drag}>
                    <Ionicons name="reorder-three-outline" size={24} color="#888"/>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={[styles.page, {flex: 1, minHeight: 0}]}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8}}>
                <Text style={{fontWeight: 'bold'}}>Your Katchup</Text>
                <Text style={{color: '#888'}}>{cards.length} Keywords</Text>
            </View>
            <DraggableFlatList
                data={cards}
                onDragEnd={({data}) => setCards(data)}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.threadList}
                style={{height: '100%'}}
            />
        </View>
    );
};

const RepliesContent = () => (
    <View style={styles.page}>
        {sampleReplies.map(reply => (
            <View key={reply.id} style={styles.replyItem}>
                {reply.avatar ? (
                    <Image source={{uri: reply.avatar}} style={styles.replyAvatar}/>
                ) : (
                    <Ionicons name="person-circle-outline" size={36} color="#888"/>
                )}
                <View style={styles.replyBody}>
                    <View style={styles.replyHeader}>
                        <Text style={styles.replyName}>{reply.name}</Text>
                        <Text style={styles.replyDate}>{reply.date}</Text>
                    </View>
                    <Text style={styles.replyText}>{reply.text}</Text>
                </View>
            </View>
        ))}
    </View>
);

const MediaContent = () => (
    <View style={styles.page}>
        <Text style={styles.pageText}>Media Content</Text>
    </View>
);
const RepostsContent = () => (
    <View style={styles.page}>
        <Text style={styles.pageText}>Reposts Content</Text>
    </View>
);
const FeedsContent = () => (
    <View style={styles.page}>
        <Text style={styles.pageText}>Feeds Content</Text>
    </View>
);

const renderContent = ({item}: { item: typeof routes[0] }) => {
    switch (item.key) {
        case 'threads':
            return <ThreadContent/>;
        case 'replies':
            return <RepliesContent/>;
        case 'media':
            return <MediaContent/>;
        case 'reposts':
            return <RepostsContent/>;
        case 'feeds':
            return <FeedsContent/>;
        default:
            return null;
    }
};

export default function ProfileScreen() {
    const [activeIndex, setActiveIndex] = useState(0);
    const flatRef = useRef<FlatList>(null);

    const onViewRef = useRef(({viewableItems}: any) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index ?? 0);
        }
    });
    const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.name}>Andrew Lim</Text>
                        <Text style={styles.username}>sjsh1629</Text>
                        <Text style={styles.followers}>18 followers</Text>
                    </View>
                    <TouchableOpacity style={styles.followButton}>
                        <Ionicons name="person-add" size={20}/>
                    </TouchableOpacity>
                </View>

                {/* Actions */}
                <View style={styles.actionRow}>
                    <TouchableOpacity style={styles.outlinedButton}>
                        <Text>Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlinedButton}>
                        <Text>Share profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Tab Bar */}
                <View style={styles.tabBar}>
                    {routes.map((route, idx) => (
                        <TouchableOpacity
                            key={route.key}
                            style={styles.tabButton}
                            onPress={() => {
                                flatRef.current?.scrollToIndex({index: idx, animated: true});
                            }}
                        >
                            <Text
                                style={[
                                    styles.tabText,
                                    activeIndex === idx && styles.tabTextActive,
                                ]}
                            >
                                {route.title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Pager (패딩 상쇄 위해 래핑) */}
                <View style={{marginHorizontal: -HORIZONTAL_PADDING}}>
                    <FlatList
                        ref={flatRef}
                        data={routes}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.key}
                        renderItem={renderContent}
                        onViewableItemsChanged={onViewRef.current}
                        viewabilityConfig={viewConfigRef.current}
                        getItemLayout={(_, index) => ({
                            length: ITEM_WIDTH,
                            offset: ITEM_WIDTH * index,
                            index,
                        })}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: HORIZONTAL_PADDING,
        paddingTop: 32,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    name: {fontSize: 24, fontWeight: 'bold'},
    username: {fontSize: 14, color: '#888'},
    followers: {fontSize: 14, color: '#888', marginTop: 4},
    followButton: {
        backgroundColor: '#eee',
        padding: 8,
        borderRadius: 20,
    },
    actionRow: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    outlinedButton: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        marginRight: 8,
    },
    tabBar: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#eee',
        marginBottom: 8,
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
    },
    tabText: {
        fontSize: 14,
        color: '#aaa',
    },
    tabTextActive: {
        color: '#000',
        fontWeight: 'bold',
    },
    page: {
        width: ITEM_WIDTH,
        paddingTop: 16,
        paddingHorizontal: PAGE_PADDING,
    },
    pageText: {
        fontSize: 16,
        color: '#333',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    sectionTitle: {fontSize: 16, fontWeight: 'bold'},
    sectionCount: {fontSize: 14, color: '#888'},
    cardRow: {
        width: ITEM_WIDTH - PAGE_PADDING * 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    card: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    cardTitle: {fontWeight: 'bold', marginTop: 8},
    cardDesc: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        marginVertical: 8,
    },
    cardButton: {
        backgroundColor: '#000',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    cardButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 32,
    },
    replyItem: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    replyAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
    },
    replyBody: {
        flex: 1,
    },
    replyHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    replyName: {fontWeight: 'bold', fontSize: 14},
    replyDate: {fontSize: 12, color: '#888'},
    replyText: {fontSize: 14, color: '#333'}, threadList: {
        paddingVertical: 8,
    },
    threadRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    threadCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    threadTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    threadSub: {
        fontSize: 14,
        color: '#888',
        marginTop: 4,
    },
    threadNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dragHandle: {
        marginLeft: 12,
    },
});
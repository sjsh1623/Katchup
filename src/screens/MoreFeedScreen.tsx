import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

interface LatestItem {
    id: string;
    title: string;
    time: string;
    comments: number;
    imageUrl: string;
}

const sampleData: LatestItem[] = [
    {
        id: '1',
        title: '프란치스코 교황의 장례미사가 바티칸 성 베드로 광장에서 20만 신자와 130개국 대표단이 참석한 가운데 엄수',
        time: '1일 전',
        comments: 213,
        imageUrl: 'https://picsum.photos/seed/1/100/80',
    },
    {
        id: '2',
        title: '경북에서 작은소피참진드기 감염으로 인한 올해 첫 SFTS 사망자가 발생해 야외활동 주의가 요구됨',
        time: '45분 전',
        comments: 24,
        imageUrl: 'https://picsum.photos/seed/2/100/80',
    },
    {
        id: '3',
        title: '이란 최대 규모 항구에서 화학물질 추정 폭발사고 발생, 18명 사망하고 750여 명 부상을 입어',
        time: '2시간 전',
        comments: 34,
        imageUrl: 'https://picsum.photos/seed/3/100/80',
    },
    {
        id: '4',
        title: '교대 입시 합격선이 수시 내신 6등급, 정시 수능 4등급대까지 하락하며 교직 선호도 급감 현상 심화',
        time: '2시간 전',
        comments: 9,
        imageUrl: 'https://picsum.photos/seed/4/100/80',
    },
    {
        id: '5',
        title: '해고노동자 소현숙씨가 건강 악화로 고공농성을 중단하고 지상으로 내려오며, 고용승계 문제는 미해결 상태로 남아',
        time: '3시간 전',
        comments: 15,
        imageUrl: 'https://picsum.photos/seed/5/100/80',
    },
];

const MoreFeedScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.back}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#000"/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={sampleData}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
                ListHeaderComponent={() => (
                  <Text style={styles.header}>최신 뉴스</Text>
                )}
                renderItem={({ item }) => (
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
                      source={{ uri: item.imageUrl }}
                      style={styles.latestRowImage}
                    />
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
        </SafeAreaView>
    );
};

export default MoreFeedScreen;

const styles = StyleSheet.create({
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingLeft: 20
    },
    safe: {flex: 1, backgroundColor: '#fff'},
    container: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 12,
        color: '#111',
        paddingLeft: 10,
        marginTop: 15
    },
    latestRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 7,
        height: 135,
        paddingVertical: 20,
        paddingHorizontal: 12,
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
        width: 95,
        height: 95,
        borderRadius: 8,
        backgroundColor: '#eee',
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 8,
    },
});

import React from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions, SafeAreaView} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const alarmData = [
  {
    id: '1',
    type: 'alert',
    group: '내 뉴스룸',
    title: "'AI 챗GPT' 뉴스 도착",
    subtitle: '챗GPT, 의사보다 먼저 혈액암 진단 적중',
    time: '2일 전',
  },
  {
    id: '2',
    type: 'alert',
    group: '내 뉴스룸',
    title: "'애플' 뉴스 도착",
    subtitle: 'TSMC, 2028년 1.4나노 반도체 생산 로드맵 공개',
    time: '3일 전',
  },
  {
    id: '3',
    type: 'alert',
    group: '내 뉴스룸',
    title: "'AI 챗GPT' 뉴스 도착",
    subtitle: '챗GPT, 직장인 필수 도구로 자리잡았지만 세대 갈등 야기',
    time: '3일 전',
  },
  {
    id: '4',
    type: 'alert',
    group: '내 뉴스룸',
    title: "'애플' 뉴스 도착",
    subtitle: 'EU, 애플·메타에 DMA 위반 첫 제재...1조원대 과징금',
    time: '3일 전',
  },
  {
    id: '5',
    type: 'alert',
    group: '내 뉴스룸',
    title: "'애플' 뉴스 도착",
    subtitle: "애플 iOS18.4.1 업데이트 후 '벽돌폰' 사태 발생",
    time: '4월 23일',
  },
];

const AlarmScreen: React.FC = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.back}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={24} color="#000"/>
                </TouchableOpacity>
            </View>
            <FlatList
                data={alarmData}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.container}
                ListHeaderComponent={() => <Text style={styles.header}>알림</Text>}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.alertRow}>
                      <View style={styles.alertText}>
                        <Text style={styles.alertGroup}>{item.group}</Text>
                        <Text style={styles.alertTitle}>{item.title}</Text>
                        <Text style={styles.alertSubtitle}>{item.subtitle}</Text>
                      </View>
                      <Text style={styles.alertTime}>{item.time}</Text>
                    </View>
                  );
                }}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
            />
        </SafeAreaView>
    );
};

export default AlarmScreen;

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
    adCard: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
    },
    adImage: {
      width: SCREEN_WIDTH * 0.3,
      height: SCREEN_WIDTH * 0.15,
      borderRadius: 4,
      marginRight: 12,
    },
    adText: { flex: 1 },
    adTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    adSubtitle: { fontSize: 14, color: '#666', marginTop: 4 },

    alertRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
    },
    alertText: { flex: 1, marginRight: 12 },
    alertGroup: { fontSize: 12, color: '#888', marginBottom: 4 },
    alertTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
    alertSubtitle: { fontSize: 16, color: '#333', marginTop: 2 },
    alertTime: { fontSize: 12, color: '#888', alignSelf: 'flex-start' },
});

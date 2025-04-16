import React from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';

interface Props {
    selected: string;
    onSelect: (category: string) => void;
}

export const CategoryTabs = ({ selected, onSelect }: Props) => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
        {['For You', 'Top Stories', 'Tech & Science', 'Finance'].map((cat) => (
            <Pressable key={cat} onPress={() => onSelect(cat)} style={{
                backgroundColor: selected === cat ? '#d0e0e3' : '#f2f2f2',
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 8,
                marginRight: 10
            }}>
                <Text style={{ fontWeight: selected === cat ? 'bold' : 'normal' }}>{cat}</Text>
            </Pressable>
        ))}
    </ScrollView>
);
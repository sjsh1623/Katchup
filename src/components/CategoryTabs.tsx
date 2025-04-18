import React from 'react';
import { View, ScrollView, Pressable, Text } from 'react-native';

interface Category {
    id: number;
    name: string;
    code: string;
}

interface Props {
    categories: Category[];
    selected: string;
    onSelect: (categoryCode: string) => void;
}

export const CategoryTabs = ({ categories, selected, onSelect }: Props) => {
    const fallbackCategories: Category[] = [
        { id: 1, name: 'For You', code: 'foryou' },
        { id: 2, name: 'Top Stories', code: 'top' },
        { id: 3, name: 'Finance', code: 'finance' },
        { id: 4, name: 'Technology', code: 'tech' },
        { id: 5, name: 'Politics', code: 'politics' },
    ];

    const displayCategories = categories && categories.length > 0 ? categories : fallbackCategories;

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 10 }}>
            {displayCategories.map((cat) => (
                <Pressable
                    key={cat.code}
                    onPress={() => onSelect(cat.code)}
                    style={{
                        backgroundColor: selected === cat.code ? '#d0e0e3' : '#f2f2f2',
                        borderRadius: 20,
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        marginRight: 10,
                    }}
                >
                    <Text style={{ fontWeight: selected === cat.code ? 'bold' : 'normal' }}>
                        {cat.name}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
};
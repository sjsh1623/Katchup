import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Article {
    title: string;
    summary: string;
    image: string;
    author: string;
}

export const ArticleCard = ({ article }: { article: Article }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: article.image }} style={styles.image} resizeMode="cover" />

            <View style={styles.overlay}>
                <Text style={styles.title}>{article.title}</Text>
                <Text style={styles.summary} numberOfLines={3}>
                    {article.summary}
                </Text>

                <View style={styles.footer}>
                    <View style={styles.authorContainer}>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/100?img=7' }}
                            style={styles.avatar}
                        />
                        <Text style={styles.author}>{article.author}</Text>
                    </View>

                    <View style={styles.actions}>
                        <TouchableOpacity>
                            <Ionicons name="bookmark-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginLeft: 16 }}>
                            <Ionicons name="headset-outline" size={20} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        height: '90%',
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#222',
    },
    image: {
        height: '100%',
        width: '100%',
        position: 'absolute',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    title: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 6,
    },
    summary: {
        color: '#ccc',
        fontSize: 14,
        lineHeight: 20,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 16,
    },
    authorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    author: {
        color: 'white',
        marginLeft: 8,
        fontSize: 13,
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
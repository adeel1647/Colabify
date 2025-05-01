

import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function Analytics() {
    return (
        <View style={styles.container}>
                  <Text style={styles.heading}>Profile Analytics</Text>
            
            <View style={styles.card}>
                <View style={styles.textContainer}>
                    <Text style={styles.cardText1}>
                        Analytics & tools
                    </Text>
                    <Text style={styles.cardText2}>Last 30 days</Text>
                </View>
                <Image source={require('../assets/images/my-profile-image.jpg')} style={styles.profileImage} />
            </View>

            <View style={styles.secondCard}>
                <View style={styles.secondCardHeader}>
                    <Text style={styles.cardText3}>Analytics & tools </Text>
                    <FontAwesome name="question-circle" size={24} color="grey" style={styles.questionIcon} />
                </View>
                <View style={styles.quadCard}>
                    <View style={styles.quadRow}>
                        <View style={styles.quadBox}>
                            <Text style={styles.quadText1}>1464</Text>
                            <Text style={styles.quadText2}>Post impressions</Text>
                            <Text style={styles.quadText3}>🔻58.9% past 7 days</Text>
                        </View>
                        <View style={styles.quadBox}>
                            <Text style={styles.quadText1}>3678</Text>
                            <Text style={styles.quadText2}>Followers</Text>
                            <Text style={styles.quadText3}>🔺51.6% past 7 days</Text>
                        </View>
                    </View>
                    <View style={styles.quadRow}>
                        <View style={styles.quadBox}>
                            <Text style={styles.quadText1}>297</Text>
                            <Text style={styles.quadText2}>Profile viewers</Text>
                            <Text style={styles.quadText3}>Past 90 days</Text>
                        </View>
                        <View style={styles.quadBox}>
                            <Text style={styles.quadText1}>364</Text>
                            <Text style={styles.quadText2}>Search appearances</Text>
                            <Text style={styles.quadText3}>Previous week</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.thirdCard}>
                <View style={styles.secondCardHeader}>
                    <Text style={styles.thirdTopic}>Creation tools</Text>
                </View>

                <View style={styles.firstLine}>
                    <Text>Get more ways to start conversations with your community Learn more about creation tool access.</Text>
                </View>

                <View style={styles.secondLine}>
                    <View style={styles.secondRow}>
                        <Text style={styles.paragraphText}>Collabify Live</Text>
                        <FontAwesome name="info-circle" size={20} color="grey" style={styles.icon} />
                        <Text style={styles.paragraphText1}>Learn more</Text>
                        <FontAwesome name="angle-right" size={24} color="grey" style={styles.icon} />
                    </View>

                    <View style={styles.secondRow}>
                        <Text style={styles.paragraphText}>Audio Event</Text>
                        <FontAwesome name="info-circle" size={20} color="grey" style={styles.icon} />
                        <Text style={styles.paragraphText1}>Learn more</Text>
                        <FontAwesome name="angle-right" size={24} color="grey" style={styles.icon} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingTop: 40,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
        marginHorizontal: 20,
    },
    textContainer: {
        flex: 1,
        // flexDirection: 'row',
        // alignItems: 'flex-start',
    },
    cardText1: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight: 'bold',
        marginRight: 10,
    },
    questionIcon: {
        marginRight: 170,
        marginBottom:20,
    },
    cardText2: {
        fontSize: 14,
        marginBottom: 5,
    },
    cardText3: {
        fontSize: 20,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    secondCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginHorizontal: 20,
        padding: 20,
    },
    thirdCard: {
        marginTop: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        padding: 20,
        marginHorizontal: 20,
    },
    secondCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    quadCard: {
        // Style definitions for the quadCard
    },
    quadRow: {
        flexDirection: 'row',
    },
    quadBox: {
        flex: 1,
        padding: 17,
        borderColor: '#ddd',
        borderWidth: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
    },
    quadText1: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quadText2: {
        fontSize: 14,
    },
    quadText3: {
        fontSize: 12,
        color: '#999999',
    },
    thirdTopic: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    paragraphText: {
        fontSize: 14,
        flex: 1,
    },
    paragraphText1: {
        fontSize: 14,
        marginLeft: 10,
    },
    firstLine: {
        marginBottom: 10,
        // flexDirection: 'row',
    },
    secondLine: {
        marginTop: 10,
    },
    secondRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    icon: {
        marginLeft: 10,
    },
});


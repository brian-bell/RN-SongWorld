import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type SpotifyAlbum = {
    name: string;
};

export type SpotifyArtist = {
    name: string;
}

export type SpotifySong = {
    album: SpotifyAlbum;
    artists: SpotifyArtist[];
    name: string;
}

const formatArtistNames = (artists: SpotifyArtist[]) => {
    let formatted = artists[0].name;
    if (artists.length === 1) { return formatted; }
    artists.slice(1).forEach((a) => {
        formatted = `${formatted}, ${a.name}`
    });
    return formatted;
};

const styles = StyleSheet.create({
    songName: {
        fontStyle: 'italic',
        flexDirection: 'row',
    },
    artistNames: {
        fontWeight: 'bold',
    },
    songView: {
        //flex: 1,
        paddingBottom: 10,
    }
})
const Song = (props: SpotifySong) => {
    return (
        <View style={styles.songView}>
            <Text style={styles.songName}>{props.name}</Text>
            <Text style={styles.artistNames}>{formatArtistNames(props.artists)}</Text>
        </View>
    );
}

export default Song;
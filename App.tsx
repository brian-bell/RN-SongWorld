/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Text,
  Button,
  View,
  StyleSheet
} from 'react-native';
import { AuthConfiguration, authorize, AuthorizeResult } from 'react-native-app-auth';
import { default as Song, SpotifyArtist, SpotifyAlbum, SpotifySong } from './components/Song/Song';


const App = () => {
  const [auth, setAuth] = useState<AuthorizeResult>();
  const [songs, setSongs] = useState<any[]>();

  const authParams: AuthConfiguration = {
    clientId: '',
    redirectUrl: 'com.bbell.songworld:/oauth',
    usePKCE: true,
    scopes: ['user-top-read'],
    serviceConfiguration: {
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
  };

  const doAuth = async () => {
    const authState: AuthorizeResult = await authorize(authParams);
    setAuth(authState);
  };

  useEffect(() => {
    getSongs();
  }, [auth]);

  const getSongs = () => {
    if (!auth) return;
    console.log('getting songs');
    axios.get(
      `https://api.spotify.com/v1/me/top/tracks`,
      {
        params: {
          limit: 10,
          time_range: 'long_term',
        },
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${auth.accessToken}`
        },
      }
    ).then((response: AxiosResponse) => {
      setSongs(response.data.items);
    }).catch((error: AxiosError) => {
      console.log(error.message);
    });
  };

  const renderSongs = (songs: any): any => {
    if (!songs) return;
    return songs.map((s: any) => {
      return <Song key={s.nam} name={s.name} album={s.album} artists={s.artists}></Song>
    });
  };

  const styles = StyleSheet.create({
    songView: {
      paddingLeft: 5,
      paddingTop: 5,
    },
  });

  return (
    <>
      {!auth && (
        <Button title="Authorize" onPress={doAuth}>
          Authorize
        </Button>)
      }
      <View style={styles.songView}>
        {renderSongs(songs)}
      </View>
    </>
  );
};

export default App;

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Image,
  Easing,
} from 'react-native';

import ImageSpinner from './components/ImageSpinner';
import Timing from './components/Timing'
import Spring from './components/Spring'
import FlipFlop from './components/FlipFlop'

export default class App extends React.Component {

  render () {
    const sources = [
      'https://s3.amazonaws.com/media-p.slid.es/uploads/alexanderfarennikov/images/1198519/reactjs.png',
      'https://lh3.googleusercontent.com/zHR-o_nyoGUGSfjmfoQn_J2O2xlA8j2h_GjQgDj80FM1mkJQ_Xkp5D-y34FrKWSIs-ninG8wbOXMuk-o_4HDVQBhkKFIoCcwTGephNAycGK3oAM1osDPjvXlNDSVuPODArlXPgeyVqMpFEJDG8Wgjtqi6Q8LouUEI0ggm4C_wpZeovE6lbn3m3t2vNXiejQ7ePMeY3zR0m9lmPSQWoOOE3NMgshvifpUjokTGUmIXgTXQhYGp-PHTybB8jIfEtj9LJG0BGGj7lzLhCzagJHMNFdbUwLAL81KhUxfWY9NKEBzx1VHqmCrI59cyI5n3DUyHYH8NLlOWp4ytBr9vCqgO9cxHDDiIPUH8Z-x-N67JwqUlVkrp9WS74McmpEvCVoaScJE2pJhPoCVEuyT0VeRebCd2M2VSCknbov3OmirGl6zDFQ2I7YZhfjY9FeCpYYD2liWM_K6wsQMh5TGuD6zTG-jEyYI_4jckxHfFcG4bgKDVvBy4oFaF_2HTyHNWxrkU4nYQiprGpHO_nVy8kKggKA4mC__Y86nCByNi6tnyTgt78rElIo3a1jCgPmTOBeG9vuCzN6ISBYoJoJpXM9GR3b7x1_lKLsM3A2_8RGuseGD5cIAGdSmglkRl4tPJkfU-NMkH00Np3B7VMQ1kLkZoXbhcCekvDjXjxPd6aC5Dho=w2604-h1954-no',
      'https://lh3.googleusercontent.com/PUzZA1j82YkJ1x6-F4jVZtF8xLnVld62ls2ZVd0_hOBLTeHnSx7AxmUJC6F9Y-Aptdd7EehEIbVZWr5X69BWis3qWIdZmOJoKCC3nlq_L5oQ6DZzVqcHmRYxUw5N-ECmS_R31VJTRvwFO8ZN90v-ya7DbndR5_1cCt5rTF_kbTGbQmkZyVr0lf2TpmZGKL29inhXo9uQDFM0wXmF1gQHf-Ax5HBOqaS5H8iis1b-eiqdsTffYD4nobSllkE9jfzVMmNCSYjhl7Hgs3fCgOHyUn6PHgNrG6SJCb8I7WTWnJS0GORlUj4XGcYn3Uokh265hrB9AH_peAVqXZBgIoaJFpAaR0hStW6yi0gD8GXHBA0gvMKhO3LNBu1v9oXSITGKhzNXj_4YDbe03seaRjhdbzsAIANz5aSZC0XMK1J12yffl73RaQbbZbpMz8GwlT4g7vL2qkMJgLALhvQ8hUkgegyIvfRT7hrdoCp1ppkXNLXbazgymNmtOaJJ_MKQKrXDxDdNJosQ1_o3opHufiIzdWJfyOp_aoYA2T8qwfJf7VgHocJnspfqKq-Bx1azcNG98mnRE-OWP4mjMxbEH9iDYDf8tuG8HhJY-31KTHOAU1DvTBfJH7PgxQ=w1464-h1952-no',
      'https://lh3.googleusercontent.com/__N7CuVT8Zf12JhOMHLpSRj7ETxdO-ByMUCnPFvZah7tutOOYON06uCUVWrFi5mKQXJayOOWrbOZPYBDPz_37c-K1TG9UnPZVPAD5jcmFGAL_vQImIlS4cxYVfsluakt0MJcRa2ZwzQYK6w2yIXEHP4XK7m0aTxOfgfSPpHm3eWyfNB5VrFRIOqeP2nn1aDibWbIsc23qYX63rZWwHiPoox4Y5dIGZbWTpGVub_8kygFveFfaX6O50FzGtf5LysENP1ztGd2wVMdyF3O3314--OebB8ZWV8iisHKJMvhaFSKMK_9pvvmtZcmrvUXEu3fvT6FvjyjAHqs6mSj2NoZ7rdINkapFJG7huZwDHNAesXRTAVP4PhbZ1KvBz5I-5oCREXZmFz4Gs3W2P7KwfjvobBtL0SRSayvasQjsBCQ8rHOvZrqMWxSteR3_QdAgixcGykmO6OeAlTnL57DsEfT_xDf65yXamz6z9jWQqJv6h7Zn_92bNJK-ZZN6Rw7zzjHB3x359on_XDaE1hLOEb9y22aJzOtPgjak5lTiOwEvfQ0fWOEG-KomhxGPynUdA6xSVlSOSEvjH9LdBKeUPuydVeliCOrkHufziSUB1aLZqTf7fNl29rmhA=w710-h960-no',
      'https://lh3.googleusercontent.com/Iing-uW3OKO2lA3HSvrwqlVbUJemqxOhRLv0u9mIvdRhi6CqK2Zkiqho6ZDgkckfNVVVkNrUt6B9CmfWEIf1ChpH1fra2DBGYG3smJNY21mNqeX8S35cpFKJVZt7oPgJf5JbGcBGd50DHedxOAl_ips80ZH-3T6kow7PoHqcb6IhsHiPjIz7OF7Xtr-JxVkMt6hAnh15PS4VlkRq0pfXazQGTavXG4gPvLVCFU5Izbk3u8EeElhVdB2ep0-dWRDSyeEpk2bs2T1rBHHJnZdQslTM3Xb_EyEkHrlNuKeUnFH5njKm5GtesunobR5ux3DUy5rjHeJgkiCXtk5ecnl_zL15lfP6ujjdwQ26hYsTQARu1Q_fUhILnbWOOc3zAsVJGi-K3v484-ah0WsXrJSmJSWjsF5rc-bplRZjHjgLaYBJO75IDWELKbUewjSiB5fs44-HnqFRC7i8B_tXqkyDiexhxi87FBYOBnhL2H5QAwY8Wulg_ZDCbNDb7bDsgN8KAydsecqTvlpw5C_-61ijo9ZrhjP_lQOUM6U5yRt4lF9tvRFUcz7Y_Dcpt-dSTrf1tlweTpi4Wi--YZGc7VKs1MYuJ5D7cfH6q652vcoIsi6RkPtiLG9OSQ=w480-h640-no',
    ]
    const images = sources.map((src, i) => (
      <Image
        key={`img_${i}`}
        style={styles.canvas}
        source={{uri: src}}
      />
    ))
    let button = (
      <View key='button' style={{borderWidth:3, borderColor:'blue', height:50, width: 100}}>
        <Text>Click me!</Text>
      </View>
    );
    images.push(button)
    return (
      <View style={styles.custom}>
        <FlipFlop style={styles.container} vert={true} horiz={false}>
          {images}
        </FlipFlop>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignSelf:'center',
    backgroundColor: 'green',
    flexDirection:'row'
  },
  custom:{
    flex:1,
    borderWidth: 3,
    borderColor: 'red',
    marginTop: 20
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  canvas:{
    height:400,
    overflow: 'hidden',
    alignItems: 'center',
    resizeMode: 'contain'
  }
});

import React, {
  View,
  WebView,
} from 'react-native';
import clrs from '../utils/clrs';

const Artist = ({ url }) => {
  return (
    <View style={{
      backgroundColor: clrs.white,
      borderLeftColor: clrs.black,
      borderLeftWidth: 1,
      flex: 1,
      marginTop: 64,
    }}>
      <WebView //render a WebView built in , pass a url + http request
        style={{
          flex: 1,
        }}
        source={{
          uri: url,
          method: 'GET',  // each artist has a url specified (spotify artist page)
        }} />
    </View>
  );
};

Artist.propTypes = {
  url: React.PropTypes.string,
};

export default Artist;

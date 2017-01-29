import React, {
  Component,
  StyleSheet,
  View,
  TextInput,
  ListView,
  StatusBar,
} from 'react-native';
import {debounce} from 'lodash';
import ListItem from './ListItem';
import clrs from '../utils/clrs';
import {searchFor} from '../utils/fetcher';


export default class Main extends Component {
  constructor(props) {
    super(props);

    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.state = { artists: dataSource };
  }

  renderRow = (artist, sId, id) => {
    const { navigator } = this.props;
    const ARTIST_STATE = {                                     //the state that we want to go to whenver the user clicks
      id: 'ARTIST_DETAIL',
      title: artist.name,
      url: artist.external_urls.spotify,                       //specify url into this state from the artist object ,
    };

    const imageUrl = artist.images[0] ? artist.images[0].url : null;

    return (
      <ListItem index={ id }
        text={ artist.name }
        imageUrl={ imageUrl }
        navState={ ARTIST_STATE }
        navigator={ navigator } />
    );
  };

  render() {
    const { artists } = this.state;

    return (
      <View style={ styles.container }>

        <StatusBar barStyle="light-content" />

        <TextInput style={ styles.searchBox }
          onChangeText={ this.makeQuery } />          // faire une search query chaque fois l'event onchangetext est déclenché

        <ListView dataSource={ artists }
          style={ styles.listView }
          renderRow={ this.renderRow } />

      </View>
    );
  }

  makeQuery = debounce(query => {       // faire une requete chaque fois le client ecrit sth, et retourner the current text notes
    searchFor(query)
      .then(artists => {
        this.setState({
          artists: this.state.artists.cloneWithRows(artists),  // once the api request results , update the internal state of this component .
        });
      })
      .catch((error) => {
        throw error;
      });
  }, 400);
}

Main.propTypes = {
  navigator: React.PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: clrs.white,
  },
  searchBox: {
    height: 40,
    borderColor: clrs.black,
    borderWidth: 2,
    margin: 16,
    paddingLeft: 10,
    fontWeight: '800',
  },
  listView: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

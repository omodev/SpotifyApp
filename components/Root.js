import React, {
  Component,
  Navigator,
} from 'react-native';
import Main from './Main';
import Artist from './Artist';
import NavigationBar from './NavigationBar';

export default class Root extends Component {
  renderScene(route, navigator) {  //route: current active route , navigator: instance of our navigator
    if (route.id === 'MAIN') {
      return <Main navigator={ navigator } />; // if main render the main compoenent
    }
    return <Artist url={ route.url } />; //if not the artist page
  }

  render() {
    return (
      <Navigator style={{ flex: 1 }}
        initialRoute={{ id: 'MAIN', title: 'Spotify Artist Lookup' }}
        renderScene={ this.renderScene }
        navigationBar={ NavigationBar }
      />
    );
  }
}

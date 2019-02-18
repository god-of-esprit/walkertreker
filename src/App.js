import React from 'react';
import { AppState, AsyncStorage, Image, View, Text } from 'react-native';
import { AppLoading, Asset, Font, registerRootComponent, KeepAwake, Linking, } from 'expo';
import { AppContainer } from './nav/router';

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers';
import constants from './constants';
const { c, retrieveData } = constants;

import Modal from 'react-native-modal';
import NewPlayerForm from './components/ui/NewPlayerForm';
import BackgroundPedometer from './components/BackgroundPedometer';

if (__DEV__) {
  KeepAwake.activate();
}

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));
sagaMiddleware.run(rootSaga);

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isReady: false,
      newPlayerModalVisible: false,
    }
  }

  _toggleNewPlayerModal = () => {
    const newPlayerModalVisible = !this.state.newPlayerModalVisible
    this.setState({ newPlayerModalVisible })
  }

  cacheImages(images) {
    return images.map(image => {
      if (typeof image === 'string') {
        return Image.prefetch(image);
      } else {
        return Asset.fromModule(image).downloadAsync();
      }
    });
  }

  _loadResourcesAsync = async () => {
    const imageAssets = this.cacheImages([
      require('../assets/bg.png'),
      require('../assets/buttontexture1.png'),
      require('../assets/buttontexture2.png'),
      require('../assets/buttontexture3.png'),
      require('../assets/blankavatar.png'),
      require('../assets/checked.png'),
      require('../assets/selected.png'),
    ]);

    await Promise.all([
      Font.loadAsync({
        'gore': require('../assets/fonts/goreRough.otf'),
        'verdana': require('../assets/fonts/verdana.ttf'),
        'verdanaBold': require('../assets/fonts/verdanaBold.ttf'),
      }),
      ...imageAssets,
    ]);

  };

  _handleLoadingError = error => {
    console.warn(error);
  }

  _handleFinishLoading = async () => {
    const { path, queryParams } = await Linking.parseInitialURLAsync()
    this.setState({
      isReady: true,
      path,
      queryParams
    });
  }

  componentDidMount = async () => {
    let player = await retrieveData('playerInfo')
    player = JSON.parse(player)
    if (!player.id) {
      this.setState({newPlayerModalVisible: true})
    }
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onFinish={this._handleFinishLoading}
          onError={this._handleLoadingError}
        />
      );
    }

    const prefix = Linking.makeUrl('/');

    return (
      <Provider store={store}>
        <Modal isVisible={this.state.newPlayerModalVisible}>
          <NewPlayerForm handleModalStateChange={this._toggleNewPlayerModal} />
        </Modal>
        <AppContainer
          uriPrefix={prefix}
          screenProps={{
            backgroundImage: require('../assets/bg.png'),
            path: this.state.path,
            queryParams: this.state.queryParams
          }}
        />
        <BackgroundPedometer/>
      </Provider>
    );
  }
}

registerRootComponent(App)

function mapStateToProps(state) {
  return {
    reduxWorks: state.reduxWorks
  }
}

export default connect(mapStateToProps)(App);

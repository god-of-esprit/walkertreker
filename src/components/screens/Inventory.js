import React from 'react';
import { StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import constants from '../../constants';
const { c, item } = constants;

import defaultStyle from '../../styles/defaultStyle';
import DayCounter from '../ui/DayCounter';
import TwoButtonOverlay from '../ui/TwoButtonOverlay';


class Inventory extends React.Component {

  _onButtonPressSummary = () => {
    this.props.navigation.navigate('CampaignSummary');
  }

  _onButtonPressSafehouse = () => {
    this.props.navigation.navigate('Safehouse');
  }

  _populateItemImages = (num) => {
    let arrayOfImages;
    if (num === 0) {
      arrayOfImages = item.foodArray;
    } else if (num === 1) {
      arrayOfImages = item.medicineArray;
    } else if (num === 2) {
      arrayOfImages = item.weaponArray;
    }
    // TODO: then do a thing to this array
  }

  render() {
    return (
      <ImageBackground
        source={this.props.screenProps.backgroundImage}
        style={{width: '100%', height: '100%'}}>
        <View style={[styles.container, {alignItems: 'flex-start'}]}>
          <DayCounter campaign={this.props.campaign} />
          <Text style={styles.headline}>GROUP INVENTORY</Text>
          <Text style={styles.subHeading}>Food</Text>
          <ScrollView style={customStyles.itemContainer}></ScrollView>
          <Text style={styles.subHeading}>Medicine</Text>
          <ScrollView style={customStyles.itemContainer}></ScrollView>
          <Text style={styles.subHeading}>Weapons</Text>
          <ScrollView style={customStyles.itemContainer}></ScrollView>
          <View style={customStyles.bottom}>
            <View style={customStyles.bottom}>
                <TwoButtonOverlay
                  button1onPress={this._onButtonPressSummary}
                  button1title='Campaign Summary'
                  button1color='black'
                  button1isDisabled={false}
                  button2onPress={this._onButtonPressSafehouse}
                  button2title='Safehouse'
                  button2color='black'
                  button2isDisabled={false} />
            </View>
          </View>
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create(defaultStyle)
const widthUnit = wp('1%');
const heightUnit = hp('1%');
const customStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'skyblue'
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: widthUnit*2,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'flex-start',
    flexWrap: 'wrap',
  }
});

function mapStateToProps(state) {
  return {
    campaign: state.campaign,
    // player: state.player,
    // steps: state.steps,
  }
}

export default connect(mapStateToProps)(Inventory)
const React = require('react');
const { ViewPropTypes } = ReactNative = require('react-native');
const PropTypes = require('prop-types');
const createReactClass = require('create-react-class');
const {
  StyleSheet,
  Text,
  View,
  Animated,
} = ReactNative;
const Button = require('./Button');
import { Icon } from 'react-native-elements';

const DefaultTabBar = createReactClass({
  propTypes: {
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    backgroundColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    inactiveTextColor: PropTypes.string,
    textStyle: Text.propTypes.style,
    tabStyle: ViewPropTypes.style,
    renderTab: PropTypes.func,
    underlineStyle: ViewPropTypes.style,
  },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null,
    };
  },

  renderTabOption(name, page) {
  },

  renderIcon(icon, isTabActive) {
    const { activeTextColor, inactiveTextColor } = this.props;
    const color = isTabActive ? activeTextColor : inactiveTextColor;

    if (icon !== null && React.isValidElement(icon)) {
      return <Icon {...icon.props} color={color}/>;
    }
    return null;
  },

  renderTab(tab, page, isTabActive, onPressHandler) {
    const { title, icon } = tab;
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const iconPosition = this.props.iconPosition ?
      this.props.iconPosition : 'left';

    return (
      <Button
        style={{ flex: 1 }}
        key={title}
        accessible={true}
        accessibilityLabel={title}
        accessibilityTraits='button'
        onPress={() => onPressHandler(page)}
      >
        {(iconPosition === 'left' || iconPosition === 'right') &&
        <View style={[styles.tab, this.props.tabStyle]}>
          {iconPosition === 'left' && this.renderIcon(icon, isTabActive)}
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {title}
          </Text>
          {iconPosition === 'right' && this.renderIcon(icon, isTabActive)}
        </View>}
        {(iconPosition === 'top' || iconPosition === 'bottom') &&
        <View style={[
          styles.tab,
          this.props.tabStyle,
          { flexDirection: 'column' }]}>
          {iconPosition === 'top' && this.renderIcon(icon, isTabActive)}
          <Text style={[{ color: textColor, fontWeight }, textStyle]}>
            {title}
          </Text>
          {iconPosition === 'bottom' && this.renderIcon(icon, isTabActive)}
        </View>}
      </Button>
    );
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0,
    };

    const translateX = this.props.scrollValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, containerWidth / numberOfTabs],
    });
    return (
      <View style={[
        styles.tabs,
        { backgroundColor: this.props.backgroundColor },
        this.props.style]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab({
            title: this.props.upperCaseTitle ? name.toUpperCase() : name,
            icon: (this.props.icons && this.props.icons[page]) ?
              this.props.icons[page] : null,
          }, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View
          style={[
            tabUnderlineStyle,
            {
              transform: [
                { translateX },
              ],
            },
            this.props.underlineStyle,
          ]}
        />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    flexDirection: 'row',
  },
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc',
  },
});

module.exports = DefaultTabBar;

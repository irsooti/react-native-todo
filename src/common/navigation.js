import AccountDashboard from '../features/Account/containers/AccountDashboard/AccountDashboard';
import StuffDashboard from '../features/Stuff/containers/StuffDashboard/StuffDashboard';
import Profile from '../features/Account/containers/Profile/Profile';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Register from '../features/Account/containers/Register/Register';

export const anonNavigator = () =>
  createDrawerNavigator({
    Login: {
      screen: AccountDashboard,
      navigationOptions: {
        title: 'Login'
      }
    },
    Registrati: {
      screen: Register,
      navigationOptions: {
        title: 'Registrati'
      }
    }
  });

export const authenticatedNavigator = () =>
  createDrawerNavigator({
    Home: {
      screen: StuffDashboard,
      navigationOptions: {
        title: 'Home'
      }
    },
    Account: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile'
      }
    }
  });

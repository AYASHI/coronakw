import RNLocation from 'react-native-location';

export const configureLocation = () => {
  RNLocation.configure({
    distanceFilter: 50, // Meters
    desiredAccuracy: {
      ios: 'best',
      android: 'balancedPowerAccuracy',
    },
    // Android only
    androidProvider: 'auto',
    interval: 5000, // Milliseconds
    fastestInterval: 10000, // Milliseconds
    maxWaitTime: 5000, // Milliseconds
    // iOS Only
    activityType: 'other',
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: 'portrait',
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
  });
};

export const getLatestLocation = () => RNLocation.getLatestLocation({timeout: 10000})
export const requestPermission = () => RNLocation.requestPermission({
  ios: 'whenInUse',
  android: {
    detail: 'coarse',
  },
});
export const checkPermission = () => RNLocation.checkPermission({
  ios: 'whenInUse', // or 'always'
  android: {
    detail: 'coarse' // or 'fine'
  }
});

let locationSubscription = null;
const subscribeToLocationUpdates = () => dispatch => {
  configureLocation()

  requestPermission().then(granted => {
      if (granted) {
        locationSubscription = RNLocation.subscribeToLocationUpdates(
          locations => {
            if (locations.length > 0) {
              const location = locations[0];
              const {latitude, longitude} = location;
              console.log('location updated', location);
              dispatch({
                type: actionTypes.LATEST_LOCATION_SENT,
                value: {latitude, longitude},
              })
            }
          },
        );
      } else {

      }
      dispatch({
        type: actionTypes.LOCATION_PERMISSION_REQUESTED,
        value: granted,
      })
    }).then((error) => {
      console.log('location error', error);
    })
}

import React, { Fragment, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Platform } from 'react-native';
import layout from '../utils/layout';
import { connect } from 'react-redux';
import * as actionTypes from '../store/actionTypes';

import Geolocation from 'react-native-geolocation-service';


const EnterTemperatureFragment = (props) => {


    const temperatureButtonTouched = () => {
        props.temperatureModalShown(true);
    };

    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={styles.subtitle}>
                    كيف يمكننا مساعدتك
                </Text>
                <Button
                    title="إدخل قياس درجة الحرارة"
                    onPress={temperatureButtonTouched}
                />
            </View>
        </Fragment>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: layout.margin,
    },

    subtitle: {
        color: 'rgba(60, 60, 67, 0.6)',
        fontSize: 17,
        textAlign: 'left',
        padding: 5
    },
    title: {
        // fontFamily: fonts.Bold,
        textAlign: 'left',
        // color: 'white',
        fontSize: 20,
        padding: 5
    },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {

    };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        temperatureModalShown: (isShown) => dispatch({
            type: actionTypes.TEMPERATURE_MODAL_SHOWN,
            value: isShown,
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterTemperatureFragment);

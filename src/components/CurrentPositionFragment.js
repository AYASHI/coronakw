import React, { Fragment, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import layout from '../utils/layout';
import { connect } from 'react-redux';

const CurrentPositionFragment = props => {

    const gpsButtonPressed = () => {

    }
    
    return (
        <Fragment>
            <View style={styles.container}>
                <Text style={styles.title}>
                    اين موقعك الحالي؟
                    </Text>
                <Text style={styles.subtitle}>
                    شكراً لألتزامك بالحجر المنزلي حتي الأن
                    </Text>
                <Button
                    title="تأكيد موقعي الحالي بالمنزل"
                    onPress={gpsButtonPressed}
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
        healthState: state.home.healthState,
        isSick: state.home.isSick
    };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentPositionFragment);

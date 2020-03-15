import React from 'react';

import { View, StyleSheet, Text, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import images from '../utils/images';
import colors from '../utils/colors';
import fonts from '../utils/fonts';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import * as actionTypes from '../store/actionTypes';
import * as constants from "../utils/constants";
import layout from '../utils/layout';


const HealthSurveyModal = props => {

    const toggleModal = () => {
        props.healthSurveyShown(false);
    };

    const styles = StyleSheet.create({
        content: {
            backgroundColor: 'white',
            padding: 22,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderRadius: 4,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        contentTitle: {
            fontSize: 20,
            marginBottom: 12,
        },
        contentSubTitle: {
            fontSize: 25,
            marginBottom: 12,
        },
        contentQuestion: {
            fontSize: 20,
            marginBottom: 12
        },
    });

    const Question = questionProps => {

        const checked = props.answers.hasOwnProperty(questionProps.questionId) && props.answers[questionProps.questionId] == true;


        const dividerStyle = questionProps.hasDivider
            ? {
                borderBottomWidth: 1,
                borderColor: colors.separatorColor,
            }
            : {};
        const handleTouch = () => {
            props.changedAnswer({ id: questionProps.questionId, answer: !checked });
        }



        return (
            <View style={[{ width: 500 }, dividerStyle]}>
                <TouchableOpacity
                    onPress={handleTouch}
                    style={{
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        alignSelf: "stretch",
                        flexDirection: "row",
                    }}>
                    <Text style={styles.contentQuestion}>{questionProps.questionText}</Text>
                    <Image style={{ justifyContent: "flex-end" }} source={checked ? images.check : images.uncheck} />
                </TouchableOpacity>
            </View>
        );
    };


    const array = [
        { id: "1", questionText: 'ارتفاع درجة الحرارة الى ما يشبه الحمى', hasDivider: true },
        { id: "2", questionText: 'السعال الجاف والكحة المؤلمة', hasDivider: false },
        { id: "3", questionText: 'سيلان الأنف بإستمرار', hasDivider: false },
        { id: "4", questionText: 'إسهال', hasDivider: false },
        { id: "5", questionText: 'الشعور بالتعب وارهاق عام في الجسم', hasDivider: false },
        { id: "6", questionText: 'الصعوبة بالتنفس', hasDivider: false },
    ];


    const Questions = () => {
        return (
            <>
                {array.map(item => (
                    <Question
                        questionId={item.id}
                        questionText={item.questionText}
                        hasDivider={item.hasDivider}
                    />
                ))}
            </>
        );
    };


    const values = Object.values(props.answers);

    var numberOfSymptoms = values.length > 0 ? Object.values(props.answers).reduce((p, c) => c == true ? p + 1 : p, 0) : 0;

    var buttonMsg = `تأكيد ${numberOfSymptoms} أعراض`;

    if (numberOfSymptoms == 0) buttonMsg = "تأكيد عدم وجود اعراض";
    else if (numberOfSymptoms == 1) buttonMsg = "تأكيد عرض";
    else if (numberOfSymptoms == 2) buttonMsg = "تأكيد عرضين";


    const pressedButton = () => {
        toggleModal();
        props.sendSurvey(props.answers);
    }
    return (

        <Modal isVisible={props.showSurvey}>
            <View style={styles.content}>
                <Text style={styles.contentTitle}>سلامتك بالدنيا..</Text>
                <Text style={styles.contentSubTitle}>ما هي الاعراض التي تشعر بها الان؟</Text>
                <Questions />
                <Button title={buttonMsg} onPress={pressedButton} />
            </View>
        </Modal>

    )
}




// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        showSurvey: state.home.showSurvey,
        answers: state.home.answers,
    };
};


// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        changedAnswer: (response) => dispatch({
            type: actionTypes.CHANGED_ANSWER,
            value: { response },
        }),
        healthSurveyShown: (show) => dispatch({
            type: actionTypes.HEALTH_SURVEY_SHOWN,
            value: show,
        }),
        sendSurvey: (answers) => dispatch({
            type: actionTypes.SEND_SURVEY,
            value: answers,
        }),
    };
};


// Exports
export default connect(mapStateToProps, mapDispatchToProps)(HealthSurveyModal);


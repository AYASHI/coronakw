
import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import images from '../../../utils/images'
import { useTranslation } from 'react-i18next'

const normalCaseItems = (translator) => [
    {
        title: translator(),
        image: images.crowd
    }, 
    {
        title: translator(),
        image: images.crowd
    },
    {
        title: translator(),
        image: images.crowd
    }
]

export default WhatToDoNext = (props) => {
    const {t} = useTranslation()
    return <View>
        <PossibleInfectionsView buttonTouched = {() => {}}></PossibleInfectionsView>
        <PossibleInfectionsView buttonTouched = {() => {}}></PossibleInfectionsView>
        <PossibleInfectionsView buttonTouched = {() => {}}></PossibleInfectionsView>
  </View>
}

const PossibleInfectionsView = ({buttonTouched}) => {
    const {t} = useTranslation()

    return <TouchableOpacity style={styles.temperature} onPress={buttonTouched}>
      <Image source={images.shakeHand} />
      <Text style={styles.subtitle}>
        {t('possibleInfectionsFragment.subtitle')}
      </Text>
    </TouchableOpacity>
  }
import React, { Component } from 'react'
import { View, Text, Slider, TouchableOpacity } from 'react-native'
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSliders from './UdaciSliders'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { Ionicons } from '@expo/vector-icons'
import { removeEntry, submitEntry } from '../utils/api'

function SubmitBtn({onPress}){
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}


export default class AddEntry extends Component{
    state = {
        run: 0,
        bike:0,
        swin: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)
        this.setState((state) => {
            const count = state[metric] + step
            return {
                ...state,
                [metric]: count > max ? max : count 
            }
        })
    }

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] + getMetricMetaInfo(metric).step
            return {
                ...state,
                [metric]: count < 0 ? 0 : count 
            }
        })
    }

    slide = (metric, value) => {
        this.setState(() => ({
            [metric]: value
        }))
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.setState(()=>({
            run: 0,
            bike: 0,
            swin: 0,
            sleep: 0,
            eat: 0
        }))

        //update redux

        //navigate to home
        submitEntry({ key, entry })

        //save to DB

        //clear local notification
    }

    reset = () => {
        let key = timeToString()
        removeEntry(key)

        //update redux,
        //route to home
        //update db
    }

    render(){

        if(true){
            return (
                <View>
                    <Ionicons
                    name='ios-happy-outline' 
                    size={100}/>
                    <Text>You already logged you information for today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        const metaInfo = getMetricMetaInfo()
        return (
            <View>
                <Text>{JSON.stringify(this.state)}</Text>
                <DateHeader date={(new Date).toTimeString()}/>
                {Object.keys(metaInfo).map( (key) => {
                    const { getIcon, type, ...rest } = metaInfo[key]
                    const value = this.state[key]
                    return (
                        <View key={key}>
                            { getIcon() }
                            { type === 'slider'
                                ? <UdaciSliders 
                                    value = { value } 
                                    onChange = { (value) => this.slide(key, value) }
                                    { ...rest } 
                                /> 
                                :  <UdaciSteppers 
                                    value = { value }
                                    onIncrement = { () => this.increment(key) }
                                    onDecrement = { () => this.decrement(key) }
                                    { ...rest }
                                />
                            }
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>
        )
    }
}
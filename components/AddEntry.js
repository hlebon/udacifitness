import React, { Component } from 'react'
import { View, Text, Slider } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'
import UdaciSliders from './UdaciSliders'
import UdaciSteppers from './UdaciSteppers'
import DateHeader from './DateHeader'

export default class AddEntry extends Component{
    state = {
        run: 0,
        bike: 0,
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

    render(){
        const metaInfo = getMetricMetaInfo()
        return (
            <View>
                <DateHeader date={(new Date).toDateString()}/>
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
            </View>
        )
    }
}
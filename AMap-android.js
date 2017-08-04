/*
 * A smart AMap Library for react-native apps
 * https://github.com/react-native-component/react-native-smart-amap/
 * Released under the MIT license
 * Copyright (c) 2016 react-native-component <moonsunfall@aliyun.com>
 */

import React, {
    PropTypes,
    Component,
} from 'react'
import {
    View,
    requireNativeComponent,
    NativeModules,
    findNodeHandle,
    Platform,
    DeviceEventEmitter
} from 'react-native'

const AMapManager = Platform.OS == 'ios' ? null : NativeModules.AMapModule

const NativeAMap = Platform.OS == 'ios' ? View : requireNativeComponent('RCTAMapView', AMap)

export default class AMap extends Component {
    static constants = {

    }

    static defaultProps = {
        //mapType: 0,
        //showTraffic: false,
        //showsUserLocation: true,
    }

    static propTypes = {
        ...View.propTypes,
        options: PropTypes.shape({
            centerCoordinate: PropTypes.shape({
                latitude: PropTypes.number.isRequired,
                longitude: PropTypes.number.isRequired,
            }),
            zoomLevel: PropTypes.number,
            centerMarker: PropTypes.string,
        }).isRequired,
        onDidMoveByUser: PropTypes.func,
        onLongPress: PropTypes.func,
        onClickMarker: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <NativeAMap
                {...this.props}
            />
        )
    }

    setOptions(options) {
        AMapManager.setOptions(findNodeHandle(this), options)
    }

    searchPoiByCenterCoordinate(params) {
        AMapManager.searchPoiByCenterCoordinate(params) //传null为默认参数配置
    }

    setCenterCoordinate(coordinate) {
        //console.log('findNodeHandle => ')
        //console.log(findNodeHandle)
        AMapManager.setCenterCoordinate(findNodeHandle(this), coordinate)
    }

    showMarker(coordinate, title) {
        AMapManager.showMarker(findNodeHandle(this), coordinate, title);
    }
}


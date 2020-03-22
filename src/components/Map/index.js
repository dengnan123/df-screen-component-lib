import fengmapSDK from "fengmap"
import {
  setMapItemColor,
  generateMapHashAndFids,
  setBackgroundColor
} from "./util"
import React, { PureComponent } from "react"
import {
  FengmapBase,
  FengmapFloorControl,
  Fengmap3DControl
  // FengmapCompassControl,
  // FengmapResetControl,
  // FengmapFloors,
} from "react-fengmap"

import PropTypes from "prop-types"
const appKey = "3f5052ae825dc312df8f5ab84ab1c959"
const appName = "招商银行_SaaS平台"

class Map extends PureComponent {
  state = {
    map: null,
    mapList: [],
    mapHash: {},
    fids: []
  }

  componentDidUpdate() {
    const { map } = this.state
    if (!map) {
      return
    }
    const { style = {}, data = {} } = this.props
    const { backgroundColor } = style
    const { mapList: propsMapList = [] } = data

    setBackgroundColor({
      map,
      backgroundColor
    })
    if (propsMapList.length) {
      const { mapHash, fids } = generateMapHashAndFids({
        mapList: propsMapList
      })
      setMapItemColor({
        map,
        fids,
        mapHash
      })
    }
  }

  _onMapLoaded = (e, map) => {
    const { style = {} } = this.props
    const { backgroundColor } = style

    this.setState({
      map
    })
    setBackgroundColor({
      map,
      backgroundColor
    })
  }
  render() {
    const { width, height, mapServerURL, mapThemeURL, style = {} } = this.props
    const { mapId } = style
    return (
      <FengmapBase
        fengmapSDK={fengmapSDK}
        mapId={mapId}
        mapOptions={{
          key: appKey,
          //开发者申请应用名称
          appName,
          defaultThemeName: mapId,
          mapServerURL, // 地图.fmap文件路径
          mapThemeURL, // 地图.theme文件路径
          defaultBackgroundColor: "#122035",
          compassSize: 46,
          defaultViewMode: fengmapSDK.FMViewMode.MODE_2D,
          // defaultControlsPose: {
          //   target: '-2.148,0.000,8.594',
          //   position: '-2.148,61.971,-98.744',
          // },
          // defaultMapScale: 280,
          mapScaleRange: [50, 500],
          modelSelectedEffect: false // 点击是否高亮
          // mapScaleLevelRange: [21, 24] //缩放区间
          // defaultFocusGroup
        }}
        events={{
          loadComplete: this._onMapLoaded
        }}
        loadingTxt="Loading..."
        gestureEnableController={{
          enableMapPinch: true,
          enableMapIncline: true
        }}
        style={{
          width,
          height,
          fontFamily: "PorscheNextWAr",
          borderRadius: "50px",
          background: "#122035"
        }}
        FMDirection={{
          FACILITY: 1
        }}
      >
        <FengmapFloorControl
          ctrlOptions={{
            position: fengmapSDK.controlPositon.RIGHT_BOTTOM,
            showBtnCount: 7
          }}
          labelFormater={v => `L${v}`}
        />

        <Fengmap3DControl
          ctrlOptions={{
            position: fengmapSDK.controlPositon.RIGHT_BOTTOM,
            imgURL: "/assets/",
            viewModeButtonNeeded: true,
            groupsButtonNeeded: false,
            mapOnloadOver: true,
            offset: {
              X: 0,
              y: 40
            }
          }}
        />
      </FengmapBase>
    )
  }
}

Map.propTypes = {
  info: PropTypes.object,
  screenWidth: PropTypes.number,
  saveModel: PropTypes.func,
  startPoint: PropTypes.object,
  endPoint: PropTypes.object,
  _onMapLoaded: PropTypes.func,
  mapId: PropTypes.string,
  appKey: PropTypes.string,
  appName: PropTypes.string,
  mapServerURL: PropTypes.string,
  mapThemeURL: PropTypes.string,
  mapClickNode: PropTypes.func,
  setPop: PropTypes.func,
  lastDivHeight: PropTypes.number,
  floorChange: PropTypes.func,
  defaultFocusGroup: PropTypes.number,
  pop: PropTypes.object,
  mapScaleLevelChanged: PropTypes.func
}

export default Map

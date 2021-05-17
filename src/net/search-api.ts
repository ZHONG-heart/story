import { $http } from './http'
import axios from 'axios'
const CancelToken = axios.CancelToken
export const cancelObj = {
    func: () => { }
}
const genCancelToken = () => new CancelToken(cancel => {
    cancelObj?.func()
    cancelObj.func = cancel
})

const appname = 'zft'
const appid = 199606
interface SafeObj {
    [key: string]: number | string | Array<SafeObj>
}

export const getColumn = (params: SafeObj = {}) => {
    return $http.get(`apis/index_column`, { params: { ...params, appid } })
}

export const getHotQuery = (params: SafeObj = {}) => {
    return $http.get(`apis/hot_query/${appname}`, { params: { ...params, share: 'share', appid } })
}

export const getAllData = (params: SafeObj = {}) => $http.get(`apis/multi_search/${appname}`, { params: { ...params, appid }, cancelToken: genCancelToken() })
export const getSingleSceneData = (params: SafeObj = {}) => $http.get(`apis/search/${appname}`, { params: { ...params, appid }, cancelToken: genCancelToken() })
export const getRecordData = (params: SafeObj = {}) => $http.get(`apis/record_search/${appname}`, { params: { ...params, appid }, cancelToken: genCancelToken() })
export const getRecQuery = (params: SafeObj = {}) => $http.get(`apis/rec_query/${appname}`, { params: { ...params, appid, appname } })
export const gethotActivity = (params: SafeObj = {}) => $http.get(`apis/hot_query/${appname}`, { params: { ...params, appid, appname } })




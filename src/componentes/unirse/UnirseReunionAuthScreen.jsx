import {useReducer} from 'react'
import {types} from '../../types/types'
import {UnirseReunionScreen} from './UnirseReunionScreen'
import { VideoReunionEnCursoScreen } from './VideoReunionEnCursoScreen'
import { ReunionContext } from '../../reunionauth/reunionContext'
import { reunionReducer } from '../../reunionauth/reunionReducer'
export const UnirseReunionAuthScreen = () => {
    const [reunionAuthValue,dispatch] = useReducer(reunionReducer,{userMedia:{},acceptReunion:false,hostReunion:false})
    const setUserMedia = (media) => {
        dispatch({
            type: types.setMedia,
            payload:media
        })
    }
    const acceptHost = () => {
        dispatch({
            type: types.accept,
        })
    }
    return (
        <ReunionContext.Provider value={{
            reunionAuthValue,
            setUserMedia,
            acceptHost
        }}>
            {
                !reunionAuthValue.acceptReunion ? (
                    <UnirseReunionScreen />
                ):(
                    <VideoReunionEnCursoScreen />
                )
            }
        </ReunionContext.Provider>
    )
}
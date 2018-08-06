import {initNodeContainer} from './initNodeContainer'
import {initBeemoCore} from 'beemo-lib'

export function initBeemoForNode() {
    initBeemoCore()
    initNodeContainer()
}
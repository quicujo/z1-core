// core
import feathers from '@feathersjs/feathers'
import feathersIO from '@feathersjs/socketio-client'
import feathersAuth from '@feathersjs/authentication-client'
const io = require('socket.io-client/dist/socket.io')

// exports
export const Feathers = feathers
export const FeathersIO = feathersIO
export const FeathersAuth = feathersAuth
export const IO = io
// export const LocalForage = localForage

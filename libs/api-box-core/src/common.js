import { task } from '@z1/preset-task'
import {
  FeathersAuth,
  FeathersAuthLocal,
  FeathersCommonHooks,
  FeathersAuthHooks,
} from '@z1/preset-feathers-server-core'
import uuidv4 from 'uuid/v4'

// main
export const hookSignature = task(t => def =>
  t.has('before')(def) || t.has('after')(def) || t.has('error')(def)
)

export const hookAndEventSignature = task(t => def =>
  t.has('hooks')(def) || t.has('events')(def)
)

export const safeServiceName = task(t => path =>
  t.and(t.startsWith('/', path), t.endsWith('/', path))
    ? t.valPipe(path)(t.tail, t.dropLast(1))
    : t.startsWith('/', path)
    ? t.tail(path)
    : t.endsWith('/', path)
    ? t.dropLast(1, path)
    : path
)

export const commonHooks = task(t => ({
  auth: t.mergeAll([
    FeathersAuth.hooks,
    FeathersAuthLocal.hooks,
    FeathersAuthHooks,
  ]),
  common: FeathersCommonHooks,
  data: {
    withIdUUIDV4: task(t => hook => {
      if (t.and(t.eq(hook.type, 'before'), t.eq(hook.method, 'create'))) {
        hook.data.id = uuidv4()
      }
      return hook
    }),
    withUUIDV4: task(t => field => hook => {
      if (t.and(t.eq(hook.type, 'before'), t.eq(hook.method, 'create'))) {
        hook.data[field] = uuidv4()
      }
      return hook
    }),
    safeFindMSSQL: task(t => hook => {
      const db = hook.app.get('db')
      if (t.eq('find', hook.method)) {
        if (t.eq('mssql', db.dialect)) {
          if (t.not(t.path(['params', 'query', '$sort'], hook))) {
            if (t.not(t.has('params')(hook))) {
              hook.params = {
                query: {
                  $sort: { id: 1 },
                },
              }
            } else if (t.not(t.has('query')(hook.params))) {
              hook.params.query = {
                $sort: { id: 1 },
              }
            } else {
              hook.params.query.$sort = { id: 1 }
            }
          }
        }
      }
      return hook
    }),
  },
}))

export const pathIncludeNamespace = task(t => (path, namespace) => {
  if (t.not(path)) {
    return false
  }
  if (t.not(t.isType(path, 'String'))) {
    return false
  }
  return path.includes(namespace)
})
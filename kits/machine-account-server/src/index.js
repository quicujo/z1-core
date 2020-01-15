import apiBox from '@z1/lib-api-box-sql'
import machineAccountCore from '@z1/kit-machine-account-server-core'

// main
export default () =>
  machineAccountCore({
    adapter: 'nedb',
    apiBox,
    models(m) {
      m(['sequelize', 'machine'], (define, T) =>
        define({
          hashId: {
            type: T.STRING,
            allowNull: false,
          },
        }, {
          hooks: {
            beforeCount(options) {
              options.raw = true
            },
          },
        })
      )
      m(['sequelize', 'machine_user'], (define, T) =>
        define({
          hashId: {
            type: T.STRING,
            allowNull: false,
          },
        }, {
          hooks: {
            beforeCount(options) {
              options.raw = true
            },
          },
          associate(m) {},
        })
      )
    },
    serviceFactory: {
      machines: { modelName: 'machine' },
      machineUsers: { modelName: 'machine_user' },
    },
  })

import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { Api } from "../../services/api"
import { omit } from "ramda"
// const parseString = require('react-native-xml2js').parseString

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()

export const HomeStoreModel = types
  .model("HomeStore")
  .props({
    countryData: types.optional(types.frozen(), null),
    weatherDetail: types.optional(types.frozen(), null),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    getCountryDetail: flow(function* getCountryDetail(countryName: string) {
      try {
        const data = yield api.getCountryDetail(countryName)
        if (data.kind === "ok") {
          const response = data.countryData
          self.countryData = response[1]
        } else {
          self.countryData = null
          // showAlert("common.somethingWrong");
        }
      } catch (erro) {}
    }),
    getWeatherDetail: flow(function* getWeatherDetail(countryName: string) {
      try {
        const data = yield api.getWeatherDetail(countryName)
        if (data.kind === "ok") {
          const response = data.weatherData
          self.weatherDetail = response
        } else {
          self.weatherDetail = null
          // showAlert("common.somethingWrong");
        }
      } catch (erro) {}
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
   * Un-comment the following to omit model attributes from your snapshots (and from async storage).
   * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
   * Note that you'll need to import `omit` from ramda, which is already included in the project!
   *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
   */
  .postProcessSnapshot(omit([""]))

type HomeStoreType = Instance<typeof HomeStoreModel>
export interface HomeStore extends HomeStoreType {}
type HomeStoreSnapshotType = SnapshotOut<typeof HomeStoreModel>
export interface HomeStoreSnapshot extends HomeStoreSnapshotType {}

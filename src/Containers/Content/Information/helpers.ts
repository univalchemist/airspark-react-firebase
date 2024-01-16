import _ from "lodash";
import converter from "number-to-words";
import { DataKeys, IData, IServices, SERVICE_NAMES } from "../../../utils/types";

export function getServiceDetails(services: IServices, data: IData) {
    let serviceDetails: string[] = []

    const order = [SERVICE_NAMES.ToplessWaiters, SERVICE_NAMES.LifeDrawing, SERVICE_NAMES.BodyPainting, SERVICE_NAMES.Strippers]

    for (const serviceName of order) {
        if (Object.keys(services).includes(serviceName)) {
            switch (serviceName) {
                case SERVICE_NAMES.ToplessWaiters:
                    serviceDetails.push(`${_.startCase(converter.toWords(services[serviceName]?.Number!))} ${(Number(services[serviceName]?.Number) === 1) ? "Butler" : "Butlers"}${services[serviceName]?.["Bare Buns"] ? " (Bare Buns)" : ""}`)
                    break
                case SERVICE_NAMES.LifeDrawing:
                    serviceDetails.push(`${data[DataKeys.LifeDrawingOptions].find(o => o.key === services[serviceName]?.Option).Name} ${serviceName}`)
                    break
                case SERVICE_NAMES.BodyPainting:
                    serviceDetails.push(`${data[DataKeys.BodyPaintingOptions].find(o => o.key === services[serviceName]?.Option).Name} ${serviceName}`)
                    break
                case SERVICE_NAMES.Strippers:
                    serviceDetails.push(`${data[DataKeys.StrippersOptions].find(o => o.key === services[serviceName]?.Option).Name === "G-String" ? "Strip Tease" : "Nude Strip"} `)
                    break
            }
        }
    }
    return serviceDetails.join(" + ")

}
import _ from "lodash";
import { IInformation, InformationKeys } from "../../utils/types";

export function transformInformation(information: IInformation) {
    const informationCopy = _.cloneDeep(information)

    const firstName = informationCopy[InformationKeys.FirstName]
    const lastName = informationCopy[InformationKeys.LastName]

    delete informationCopy[InformationKeys.FirstName]
    delete informationCopy[InformationKeys.LastName]

    informationCopy[InformationKeys.Name] = `${firstName} ${lastName}`

    return informationCopy
}
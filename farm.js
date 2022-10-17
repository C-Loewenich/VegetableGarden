const getYieldForPlant = ({yield:plantYield, factor}, environmentFactors) => {
    if (environmentFactors == null || environmentFactors == undefined || environmentFactors.length === 0) return 0
    let result = undefined
    let totalPlantYield = 0

    //checking this in order let the result of one factor pay in to the following factors.
    if (totalPlantYield === 0) totalPlantYield = plantYield 
    
    //#Finding the factor percentage for every Factor such as sun or wind
    Object.entries(factor).map(([plantFactor, levelObject]) => {
        let factorEnvironmentLevel = undefined
        //## Making array from object and Finding the matching environment Factor level such as "hight" for the matching environmental factor
        Object.entries(environmentFactors).map(([environmentFactor, environmentLevel]) => {
            if (plantFactor == environmentFactor) factorEnvironmentLevel = environmentLevel
        })
        //## Creating array from object and Looping through in order to find the matching level and returning the percentage factor that influence the crop yield.
        Object.entries(levelObject).map(([level, levelPercentage]) => {
            if (factorEnvironmentLevel == level) result = totalPlantYield + ((plantYield*(levelPercentage))/100)
        })  
    });
    return result
}

const getYieldForCrop = ({crop, numCrops}, environmentFactors) => getYieldForPlant(crop, environmentFactors) * numCrops

const getTotalYield = (cropObject, environmentFactors) => {
    if (environmentFactors == null || environmentFactors == undefined || environmentFactors.length === 0) return 0
    return cropObject.crops.reduce((currentTotal, item) => getYieldForCrop(item, environmentFactors) + currentTotal,0)
}

const getCostForCrop = ({crop, numCrops}) => crop.cost * numCrops

const getRevenueForCrop = (input, environmentFactors) => getYieldForCrop(input, environmentFactors) * input.crop.salesPrice

const getProfitForCrop =(input, environmentFactors) => getRevenueForCrop(input, environmentFactors) - getCostForCrop(input)

const getTotalProfit = (cropObject, environmentFactors) => {
    if (environmentFactors == null || environmentFactors == undefined || environmentFactors.length === 0) return 0
    return cropObject.crops.reduce((currentTotal, item) => getProfitForCrop(item, environmentFactors) + currentTotal,0)
};

module.exports = {getYieldForPlant, getYieldForCrop, getTotalYield, getCostForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit};
const {getYieldForPlant, getYieldForCrop, getTotalYield, getCostForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit} = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 3,
        factor: {
            sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            rain: {
                low: -40,
                medium: 0,
                high: 50,
            }   
            },
    };
    const environmentFactors = {
        sun: "high",
        rain: "low",
    }

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn, environmentFactors)).toBe(1.8);
        expect(getYieldForPlant(corn, null)).toBe(0);
        expect(getYieldForPlant(corn, undefined)).toBe(0);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -40,
                    medium: 0,
                    high: 50,
                }   
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            rain: "low",
        }
        expect(getYieldForCrop(input, environmentFactors)).toBe(18);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -40,
                    medium: 0,
                    high: 50,
                }   
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -20,
                    medium: 0,
                    high: 40,
                }   
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "high",
            rain: "low",
        }
        expect(getTotalYield({ crops }, environmentFactors)).toBe(15.4);
        expect(getTotalYield({ crops }, undefined)).toBe(0);
        expect(getTotalYield({ crops }, null)).toBe(0);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -40,
                    medium: 0,
                    high: 50,
                }   
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -20,
                    medium: 0,
                    high: 40,
                }   
            },
        };
        const crops = [
            { crop: corn, numCrops: 0 },
            { crop: pumpkin, numCrops: 0 },
        ];
        const environmentFactors = {
            sun: "high",
            rain: "low",
        }
        expect(getTotalYield({ crops }, environmentFactors)).toBe(0);
    });
});

describe("getCostForCrop", () => {
    test("calculate the cost of one crop", () => {
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getCostForCrop(input)).toBe(20)
    })  
})

describe("getRevenueForCrop", () =>{
    test("Calculate the revenue for one crop", () =>{
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            salesPrice: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -40,
                    medium: 0,
                    high: 50,
                }   
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            rain: "low",
        }
        expect(getRevenueForCrop(input, environmentFactors)).toBe(54)
    })
})

describe("getProfitForCrop",()=>{
    test("Calculate the profit for one crop",()=>{
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            salesPrice: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -40,
                    medium: 0,
                    high: 50,
                }   
            },
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        const environmentFactors = {
            sun: "high",
            rain: "low",
        }
        expect(getProfitForCrop(input, environmentFactors)).toBe(34)
    })
})

describe("getTotalProfit", ()=>{
    test("calculate the total profit for several crops",()=>{
        const corn = {
            name: "corn",
            yield: 3,
            cost: 2,
            salesPrice: 3,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -40,
                    medium: 0,
                    high: 50,
                }   
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            cost: 3,
            salesPrice: 5,
            factor: {
                sun: {
                    low: -50,
                    medium: 0,
                    high: 50,
                    },
                rain: {
                    low: -20,
                    medium: 0,
                    high: 40,
                }   
            },
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        const environmentFactors = {
            sun: "high",
            rain: "low",
        }
        expect(getTotalProfit({ crops }, environmentFactors)).toBe(43)
        expect(getTotalProfit({ crops }, null)).toBe(0)
        expect(getTotalProfit({ crops }, undefined)).toBe(0)
    })
})
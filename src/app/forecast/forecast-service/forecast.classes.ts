export class NWSLocationProperties {
    cwa: string = "";
    forecastOffice: string = "";
    gridId: string = "";
    gridX: number = 0;
    gridY: number = 0;
    forecast: string = "";
    forecastHourly: string = "";
    forecastGridData: string = "";
    observationStations: string = "";
    forecastZone: string = "";
    county: string = ""
    fireWeatherZone: string = "";
    timeZone: string = "";
    radarStation: string = ""
}

export class NWSLocation {
    id: string = "";
    type: string = "";
    properties: NWSLocationProperties = new NWSLocationProperties();
}

export class NWSElevation {
    value: number = 0;
    maxValue: number = 0;
    minValue: number = 0;
    unitCode: string = "";
    qualityControl: string = "";
}

export class NWSQuantitativeValue {
    value: number = 0;
    maxValue: number = 0;
    minValue: number = 0;
    unitCode: string = "";
    qualityControl: string = "";
}

export class NWSForecastPeriod {
    number: number = 0;
    name: string = "";
    startTime: string = "";
    endTime: string = "";
    isDaytime: boolean = false;
    temperature: NWSQuantitativeValue = new NWSQuantitativeValue();
    temperatureTrend: string = "";
    probabilityOfPrecipitation: NWSQuantitativeValue = new NWSQuantitativeValue();
    windDirection: string = "";
    windSpeed: NWSQuantitativeValue = new NWSQuantitativeValue();
    shortForecast: string = "";
    detailedForecast: string = "";
}

export class NWSForecastProperties {
    geometry: string = "";
    units: string = "us";
    forecastGenerator: string = "";
    generatedAt: string = "";
    updateTime: string = "";
    elevation: NWSElevation = new NWSElevation();
    periods: NWSForecastPeriod[] = [];
}

export class NWSForecast {
    id: string = "";
    type: string = "";
    properties: NWSForecastProperties = new NWSForecastProperties();
}
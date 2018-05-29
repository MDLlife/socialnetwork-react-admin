import {
    CRUD_GET_DASHBOARD_TOTAL_CMT_SUCCESS, CRUD_GET_DASHBOARD_SENTIMENT_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_GENDER_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_AGE_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_BROWSER_CMT_SUCCESS,
    CRUD_GET_DASHBOARD_COUNTRY_CMT_SUCCESS,
} from '../actions/dataActions';

import utils from "../util/utils";

import moment from "moment";
const initialState = {};

export default (resource) => (previousState = initialState, {type, payload, meta}) => {
    if (!meta) {
        // console.log("totalcomments reducer -> ", type, payload, meta);
        return previousState;
    }
    if (!payload){
        return {
            ...previousState,
            [meta.resource]: [],
        };
    }
    switch (type) {
        case CRUD_GET_DASHBOARD_SENTIMENT_CMT_SUCCESS:
            let sentiment = [];
            var m = moment();
            payload.forEach(function (item) {

                // console.log(item)
                let row = sentiment[m.month(item.group[1] - 1).format('MMMM')];
                if (!row) {
                    sentiment[m.month(item.group[1] - 1).format('MMMM')] = {
                        // {name: 'January', psentiment: 1000, nsentiment: 500}
                        name: m.month(item.group[1] - 1).format('MMMM'),
                        psentiment: item.group[2] > -1 ? item.reduction + 0 : 0,
                        nsentiment: item.group[2] < 0 ? item.reduction + 0 : 0,
                    };
                } else {
                    sentiment[m.month(item.group[1] - 1).format('MMMM')] = {
                        // {name: 'January', psentiment: 1000, nsentiment: 500}
                        name: m.month(item.group[1] - 1).format('MMMM'),
                        psentiment: item.group[2] > -1 ? item.reduction + row.psentiment : row.psentiment,
                        nsentiment: item.group[2] < 0 ? item.reduction + row.nsentiment : row.nsentiment,
                    };
                }
            });

            var finalData = [];
            Object.keys(sentiment).forEach(function (item, key) {
                finalData.push(sentiment[item])
            });

            return {
                ...previousState,
                [meta.resource]: finalData,
            };

        case CRUD_GET_DASHBOARD_GENDER_CMT_SUCCESS:
            let gender = [];
            var m = moment();
            payload.forEach(function (item) {

                let row = gender[m.month(item.group[1] - 1).format('MMMM')];
                if (!row) {
                    gender[m.month(item.group[1] - 1).format('MMMM')] = {
                        // {name: 'January', psentiment: 1000, nsentiment: 500}
                        name: m.month(item.group[1] - 1).format('MMMM'),
                        female: item.group[2] === 'female' ? item.reduction + 0 : 0,
                        male: item.group[2] === 'male' ? item.reduction + 0 : 0,
                    };
                } else {
                    gender[m.month(item.group[1] - 1).format('MMMM')] = {
                        // {name: 'January', psentiment: 1000, nsentiment: 500}
                        name: m.month(item.group[1] - 1).format('MMMM'),
                        female: item.group[2] === 'female' ? item.reduction + row.female : row.female,
                        male: item.group[2] === 'male' ? item.reduction + row.male : row.male,
                    };
                }
            });

            var finalData = [];
            Object.keys(gender).forEach(function (item, key) {
                finalData.push(gender[item])
            });

            return {
                ...previousState,
                [meta.resource]: finalData,
            };

        case CRUD_GET_DASHBOARD_AGE_CMT_SUCCESS:
            let ages = [];
            var m = moment();
            payload.forEach(function (item) {

                let row = ages[m.month(item.group[1] - 1).format('MMMM')];
                if (!row) {
                    ages[m.month(item.group[1] - 1).format('MMMM')] = {
                        name: m.month(item.group[1] - 1).format('MMMM'),
                        "18_24": item.group[2] === '18_24' ? item.reduction + 0 : 0,
                        "25_34": item.group[2] === '25_34' ? item.reduction + 0 : 0,
                        "35_44": item.group[2] === '35_44' ? item.reduction + 0 : 0,
                        "45_54": item.group[2] === '45_54' ? item.reduction + 0 : 0,
                        "55_64": item.group[2] === '55_64' ? item.reduction + 0 : 0,
                    };
                } else {
                    ages[m.month(item.group[1] - 1).format('MMMM')] = {
                        name: m.month(item.group[1] - 1).format('MMMM'),
                        "18_24": item.group[2] === '18_24' ? item.reduction + row["18_24"] : row["18_24"],
                        "25_34": item.group[2] === '25_34' ? item.reduction + row["25_34"] : row["25_34"],
                        "35_44": item.group[2] === '35_44' ? item.reduction + row["35_44"] : row["35_44"],
                        "45_54": item.group[2] === '45_54' ? item.reduction + row["45_54"] : row["45_54"],
                        "55_64": item.group[2] === '55_64' ? item.reduction + row["55_64"] : row["55_64"],
                    };
                }
            });

            var finalData = [];
            Object.keys(ages).forEach(function (item, key) {
                finalData.push(ages[item])
            });

            return {
                ...previousState,
                [meta.resource]: finalData,
            };

        case CRUD_GET_DASHBOARD_BROWSER_CMT_SUCCESS:
            let browsers = [];
            var m = moment();
            payload.forEach(function (item) {

                let row = browsers[m.month(item.group[1] - 1).format('MMMM')];
                if (!row) {
                    browsers[m.month(item.group[1] - 1).format('MMMM')] = {
                        name: m.month(item.group[1] - 1).format('MMMM'),
                        "Safari": item.group[2] === 'Safari' ? item.reduction + 0 : 0,
                        "Chrome": item.group[2] === 'Chrome' ? item.reduction + 0 : 0,
                        "Edge": item.group[2] === 'Edge' ? item.reduction + 0 : 0,
                        "Firefox": item.group[2] === 'Firefox' ? item.reduction + 0 : 0,
                        "IE": item.group[2] === 'IE' ? item.reduction + 0 : 0,
                        "Mobile Safari": item.group[2] === 'Mobile Safari' ? item.reduction + 0 : 0,
                    };
                } else {
                    browsers[m.month(item.group[1] - 1).format('MMMM')] = {
                        name: m.month(item.group[1] - 1).format('MMMM'),
                        "Safari": item.group[2] === 'Safari' ? item.reduction + row["Safari"] : row["Safari"],
                        "Chrome": item.group[2] === 'Chrome' ? item.reduction + row["Chrome"] : row["Chrome"],
                        "Edge": item.group[2] === 'Edge' ? item.reduction + row["Edge"] : row["Edge"],
                        "Firefox": item.group[2] === 'Firefox' ? item.reduction + row["Firefox"] : row["Firefox"],
                        "IE": item.group[2] === 'IE' ? item.reduction + row["IE"] : row["IE"],
                        "Mobile Safari": item.group[2] === 'Mobile Safari' ? item.reduction + row["Mobile Safari"] : row["Mobile Safari"],
                    };
                }
            });

            var finalData = [];
            Object.keys(browsers).forEach(function (item, key) {
                finalData.push(browsers[item])
            });

            return {
                ...previousState,
                [meta.resource]: finalData,
            };

        case CRUD_GET_DASHBOARD_COUNTRY_CMT_SUCCESS:
            let monthList = [];
            var m = moment();

            var countriesnames = [];
            payload.forEach(function (item) {
                if (item.group[2]) {
                    countriesnames.push(item.group[2]);
                    monthList[m.month(item.group[1] - 1).format('MMMM')] = {}
                }
            });

            countriesnames = utils.uniq(countriesnames);
            countriesnames.forEach(function (countryName) {
                payload.forEach(function (item) {
                    monthList[m.month(item.group[1] - 1).format('MMMM')][countryName] = 0
                })
            });

            payload.forEach(function (item) {
                monthList[m.month(item.group[1] - 1).format('MMMM')][item.group[2]] = item.reduction;
            });

            var finalData = [];
            Object.keys(monthList).forEach(function (item, key) {
                finalData.push(monthList[item])
            });

            return {
                ...previousState,
                [meta.resource]: finalData,
            };

        case CRUD_GET_DASHBOARD_TOTAL_CMT_SUCCESS:
            let dataset = [];
            var m = moment();
            payload.data.forEach(function (item) {
                dataset.push({
                    comments: item.reduction,
                    name: m.month(item.group[1] - 1).format('MMMM'),
                });
            });
            return {
                ...previousState,
                [meta.resource]: dataset,
            };
        default:
            return previousState;
    }
};
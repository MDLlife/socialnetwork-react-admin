var uniq = function (ary) {
    var prim = {"boolean": {}, "number": {}, "string": {}}, obj = [];

    return ary.filter(function (x) {
        var t = typeof x;
        return (t in prim) ?
            !prim[t][x] && (prim[t][x] = 1) :
            obj.indexOf(x) < 0 && obj.push(x);
    });
};

function sortChartsByMonths(arr) {
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    arr.sort(function (a, b) {
        return months.indexOf(a.name) - months.indexOf(b.name);
    });
}

module.exports = {
    uniq: uniq,
    sortChartsByMonths: sortChartsByMonths,
};

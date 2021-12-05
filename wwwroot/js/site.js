// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(function () {
    var inp = $("#txtSearch");
    var result_;
    $("#searchBut").click(function () {
        if (inp.val().length = 3) {
/*            console.log("ifte");*/
            var deger = inp.val();
            $.ajax({
                type: "GET",
                url: 'https://localhost:44373/api/Exchange/GetExchangeRate',
                dataType: 'json',
                data: { "CurrencyCode":deger }
            }).done(function (result) {
                succFunc(result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                alert('Error occured');
            });
        } else {
            alert("Dogru Birim Giriniz");
        }
    });
});
function succFunc(result) {
    //alert("functionn!!!");
    //console.log(result);
    let reformattedArray = result.map(obj => {
        let rObj = {}
        rObj[obj.key] = obj.value
        return rObj
    })
    console.log(reformattedArray);
    var margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    var newArray = new Array();
    let name = reformattedArray[0];
/*    console.log(name);*/
    hdCur.innerText = Object.values(name);
    console.log(newArray);
    for (var i = 0; i < reformattedArray.length; i++) {
        if (i % 4 == 0 && i!=0) {
            var temp1 = Object.values(reformattedArray[i - 2]);
            var temp2 = Object.values(reformattedArray[i - 3]);
            var deger = temp2 - temp1;
            var tarih = Object.values(reformattedArray[i - 1]);
            newArray.push(tarih);
            newArray.push(deger);
        }
    }
    console.log(newArray);
    var x = d3.scaleTime()
        .domain([new Date("2021-01-01"), new Date("2021-07-07")])
        .rangeRound([20, width - 20]);
    svg
        .append('g')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
    // X scale and Axis
    var y = d3.scaleLinear()
        .domain([0, 1])         // This is the min and the max of the data: 0 to 100 if percentages
        .range([height, 0]);       // This is the corresponding value I want in Pixel
    svg
        .append('g')
        .call(d3.axisLeft(y));
}



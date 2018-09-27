const ctx2 = document.getElementById('canvas2').getContext('2d')

Chart.defaults.scale.gridLines.display = false
Chart.scaleService.updateScaleDefaults('linear', {
    ticks: {
        min: 0
    }
});

const drawGraph2 = () => {
    
  return fetch('http://localhost:3000/ingresos/list-for-chart')
  .then(result => result.json())
  .then(ingresos => {
    console.log(ingresos[0].cantidad)
    cantidad = []
    labels = []
    for(i = 0; i < ingresos.length; i++){
      cantidad.push(ingresos[i].cantidad)
      labels.push(ingresos[i].concepto)
    }
    
    console.log(cantidad)
    var myChart = new Chart(ctx2, {
    type: 'horizontalBar',
    data: {
        labels,
        datasets: [{
            data: cantidad,
            backgroundColor: [
                '#FF6283',
                '#009DF8',
                '#FFCC6A',
                '#3DC0BF',
                '#C9CBCF',
                '#FFB880'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,

        }]
    },
    options: {
        legend: {
            display: false
        }
    }
});
  })
}
    
drawGraph2()
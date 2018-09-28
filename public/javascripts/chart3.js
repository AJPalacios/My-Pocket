const ctx3 = document.getElementById('canvas3').getContext('2d')

const drawGraph3 = () => {
  return fetch('https://my-pocket.herokuapp.com/gastos/list-for-chart')
  .then(result => result.json())
  .then(gastos => {
    console.log(gastos[0].cantidad)
    cantidad = []
    labels = []
    for(i = 0; i < gastos.length; i++){
      cantidad.push(gastos[i].cantidad)
      labels.push(gastos[i].tipo)
    }
    
    console.log(cantidad)
    var myChart = new Chart(ctx3, {
    type: 'bar',
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
            borderWidth: 1
        }]
    },
    
});
  })
}
    
drawGraph3()
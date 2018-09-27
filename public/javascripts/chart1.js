const ctx = document.getElementById('canvas1').getContext('2d')

const drawGraph1 = () => {
  return fetch('http://localhost:3000/ahorros/list-for-chart')
  .then(result => result.json())
  .then(ahorros => {
    console.log(ahorros[0].cantidad)
    cantidad = []
    labels = []
    for(i = 0; i < ahorros.length; i++){
      cantidad.push(ahorros[i].cantidad)
      labels.push(ahorros[i].nombre)
    }
    
    console.log(cantidad)
    var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels,
        datasets: [{

            data: cantidad,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
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
    
drawGraph1()

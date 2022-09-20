const tooltipList1 = [].slice.call(document.querySelectorAll('[data-bs-toggle = "tooltip"]'))  
const tooltipList2 = tooltipList1.map(function (tooltipTriggerfun) {  
  return new bootstrap.Tooltip(tooltipTriggerfun)  
})  
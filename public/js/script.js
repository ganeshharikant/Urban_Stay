// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  let taxtoogle=document.getElementById("flexSwitchCheckReverse")
  taxtoogle.addEventListener("click",()=>{
  let taxes=document.querySelectorAll(".tax-dis")
  for (let tax of taxes){
  if(tax.classList.contains("hide") ){
    tax.classList.remove("hide")
  }else{
    tax.classList.add("hide")
  }
  }
  })
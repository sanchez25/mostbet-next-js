export default function clickHandler(e, amp) {

    if (!amp){
       
       const el = e.target.closest(".table_link")

       if (el && e.currentTarget.contains(el)) {

          e.preventDefault()

          const blockID = el.getAttribute('href').replace('#', '')
          
          window.scrollTo({
             behavior: 'smooth',
             top: document.getElementById(blockID).getBoundingClientRect().top - document.body.getBoundingClientRect().top - 70,
          })
       }
    }
}
console.log("--------accordion start--------");

const accordionHeaders = document.querySelectorAll('.item-header');
const accordionContents = document.querySelectorAll('.item-content');

accordionContents.forEach(function(content){
    content.style.display = 'none';
});

accordionHeaders.forEach(function(accordionHeader) {
    accordionHeader.addEventListener('click', function() {

        // const clickedAccordionContent = accordionHeader.parentElement.children[1];
        const clickedAccordionContent = accordionHeader.nextElementSibling;

        // const isVisible = clickedAccordionContent.classList.contains('visible');
        const isVisible = clickedAccordionContent.style.display === 'block';

        accordionContents.forEach(function(elm) {
            // elm.classList.remove('visible');
            elm.style.display = 'none';
        });

        if(!isVisible) {
            // clickedAccordionContent.classList.toggle('visible');
            clickedAccordionContent.style.display = 'block';
        }
    });
});

console.log("--------accordion end--------");
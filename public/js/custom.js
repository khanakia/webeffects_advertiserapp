jQuery(document).ready(function(){
	// jQuery(".question-mark-icon").click(function(){
	// 	alert("sdfs");
	// 	return false;
	// });
	document.body.addEventListener( 'click', function ( event ) {
        if(jQuery(event.target).hasClass('question-mark-icon')) {
     		event.preventDefault();       
        }
    });

})


function onlyNum(e){
    var typing=(window.event)?event.keyCode:e.which;   
    if((typing>47 && typing<58)) return true;
    else{
    	if (typing==8 || typing==0) return true;
	else  return false;
    }
}
export default function action(e, dom, lineWidth){
	let r = Math.sqrt((e.offsetX - dom.offsetWidth/2)**2 + (e.offsetY - dom.offsetWidth/2)**2)
	if (r > dom.offsetWidth/2 - lineWidth + lineWidth/2 || r < dom.offsetWidth/2 - lineWidth - lineWidth/2) return
	let quadrant = e.offsetY > 150 ? 180 : 0
	if (e.offsetX < 150 && quadrant === 0) quadrant = 360

	return Math.atan((e.offsetX - dom.offsetWidth/2) / (e.offsetY - dom.offsetWidth/2)) * 180 / Math.PI

	

}
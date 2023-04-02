import {environmentConfig} from "../apis";

export default function getImage (img) {
	console.log('x',img)
	if (img?.startsWith('https://')||img?.startsWith('html://')){
		return img
	}
	return `${environmentConfig.BASE_URI}/${img}`
}
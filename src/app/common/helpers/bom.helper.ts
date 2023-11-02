import { Position } from "../enums/position.enums";

export const BomUtilties = {
    getPosition : (sourceEl: HTMLElement, targetElWidth: number) => {
        const elPositionDetails = sourceEl.getBoundingClientRect();
        if(elPositionDetails.left + 20 > targetElWidth){
            return {position : Position.Left}
        }else{
            return {position : Position.Right} 
        }
    }
}
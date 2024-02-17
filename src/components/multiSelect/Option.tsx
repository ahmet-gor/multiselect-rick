import React, {KeyboardEvent} from "react";
import {SearchResultObject} from "../../types/types";

interface OptionComponentType  {
    item: SearchResultObject;
    searchParam?: string;
}
const Option = ({item,searchParam}:OptionComponentType)=>{

    const handleKeyDown =(event:KeyboardEvent<HTMLDivElement>)=>{
        if (event.code == 'ArrowDown'){
            const active = document.activeElement;
            if (active?.nextElementSibling) {
                (active.nextElementSibling as HTMLElement).focus();
            }
        }
        if (event.code == 'ArrowUp'){
            const active = document.activeElement;
            if (active?.previousElementSibling) {
                (active.previousElementSibling as HTMLElement).focus();
            }
        }
    }

    const handleNameString = (input:string) =>{
        if (searchParam){
            const valueIndex = input.toLowerCase().indexOf(searchParam.toLowerCase().trim());
            const valueLength = searchParam.trim().length;

            if (valueIndex === -1){
                return input
            }

            const before = input.substring(0,valueIndex);
            const present = input.substring(valueIndex,valueIndex+valueLength);
            const after = input.substring(valueIndex+valueLength,input.length)

            return <i style={{fontStyle:'normal'}}>{before}<i style={{fontWeight:'bold',fontStyle:'normal'}}>{present}</i>{after}</i>;
        }else {
            return input;
        }
    }

    return(
        <div key={item.id}  className={'singleOptionWrapper'} tabIndex={0} onKeyDown={(e)=>{handleKeyDown(e)}}>
            <img src={item.image} alt={item.name} className={'optionImage'}/>
            <div className={'optionTextWrapper'}>
                <div className={'optionNameText'}>{handleNameString(item.name)}</div>
                <div className={'optionEpisodesText'}>{item.episode.length} Episode{item.episode.length > 1 ?'s':''}</div>
            </div>
        </div>
    )
}


export default Option;
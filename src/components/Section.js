import React from "react";


function SectionTag(props) {
    if(props.type == "title"){
        return <h1 className = "title">{props.text}</h1>
    }else if (props.type == "header"){
        return <h2 className = "section-header">{props.text}</h2>
    }else{
        return <p className = "paragraph">{props.text}</p>
    }
}

function Section(props){
    return <SectionTag type = {props.sectionType} text = {props.sectionText}/>
}

export default Section
import React from "react";
import {Fragment} from "react"

function AnnotateableText(props){

    let textnode = props.text;
    const addAnnotation = (spot, annotationlabel) =>{
        textnode = <Fragment><Fragment>{textnode.slice(0,spot)}</Fragment>
                   <Fragment>{annotationlabel}</Fragment>
                   <Fragment>{textnode.slice(spot)}</Fragment></Fragment>
    }

    return <Fragment>{textnode}</Fragment>
}


function AnnotatedSection(props){
    const {annotations, text} = props; 

    



    return <React.Fragment>{displaytext}</React.Fragment>
}

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
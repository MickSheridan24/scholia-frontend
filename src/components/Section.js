import React from "react";
import { Fragment } from "react"
import JsxParser from "react-jsx-parser"
import AnnotationMarker from "./AnnotationMarker";



function getMarker(annotation) {
    return <AnnotationMarker annotation = {annotation} id={`marker-${annotation.id}`} data-id={annotation.id} />
}

function AnnotatedSection(props) {
    const { annotations, text } = props;
    const sorted = annotations.sort((a, b) => a.location_char_index - b.location_char_index)

    return (<Fragment>
        {
            sorted.map((a, i) => {
                return (<Fragment>
                    <Fragment>{text.slice(i === 0 ? 0 : sorted[i - 1].location_char_index , a.location_char_index)}
                    </Fragment>
                    {getMarker(a)}
                </Fragment>)
            })
          
        }
        {  text.slice(sorted[sorted.length -1].location_char_index)}

    </Fragment>)
}

function GetSection(props){
    return props.annotations.length ? AnnotatedSection(props) : props.text; 
}

function Section(props) {

    const type = props.section.section_type
    if (type === "title") {
        return <h1 className="title"><GetSection annotations={props.section.annotations} text={props.section.html} /></h1>
    } else if (type === "header") {
        return <h2 className="section-header"><GetSection annotations={props.section.annotations} text={props.section.html} /></h2>
    } else {
        return <p className="paragraph"><GetSection annotations={props.section.annotations} text={props.section.html} /></p>
    }
}

export default Section
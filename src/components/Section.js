import React from "react";
import { Fragment } from "react"
import JsxParser from "react-jsx-parser"
import AnnotationMarker from "./AnnotationMarker";



function getMarker(annotation) {
    return "<AnnotationMarker id={`marker-${annotation.id}`} data-id={annotation.id} />"
}

function AnnotatedSection(props) {
    const { annotations, text } = props;
    debugger;
    const sorted = annotations.sort((a, b) => a.location_char_index - b.location_char_index)

    let displaytext = ""

    for (let x = 0; x < text.length; x++) {
        debugger
        displaytext += text[x]
        const annos = sorted.filter(anno => anno.location_char_index === x)
        annos.forEach(a => {
            debugger
            displaytext += getMarker(a)
        })
    }
    debugger;
    return <JsxParser jsx={displaytext} components={{ AnnotationMarker }} />
}

function SectionTag(props) {
 
}

function Section(props) {

    const type = props.section.section_type
    if (type === "title") {
        return <h1 className="title"><AnnotatedSection annotations={props.section.annotations} text={props.section.html} /></h1>
    } else if (type === "header") {
        return <h2 className="section-header"><AnnotatedSection annotations={props.section.annotations} text={props.section.html} /></h2>
    } else {
        return <p className="paragraph"><AnnotatedSection annotations={props.section.annotations} text={props.section.html} /></p>
    }
}

export default Section
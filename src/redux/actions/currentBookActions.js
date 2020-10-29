import { fetchAnnotations } from "./annotationsActions";
import React from "react";
import AnnotationMarker from "../../components/AnnotationMarker";
import { fetchStudies } from "./studiesActions";
import { findBook } from "./annotationsActions";
import { CHUNK_SIZE } from "../actionType";
import ENDPOINT from "../endpoint";

// annotates the book and sets it to the store
function setBook(book) {
  return async dispatch => {
    dispatch(fetchStudies());
    dispatch({
      type: "SET_BOOK",
      book: {
        id: book.id,
        title: book.title,
        author: book.author,
        sections: book.sections
      }
    });

    dispatch({
      type: "SET_OTHER_ANNOTATIONS",
      annotations: book.sections.map(s => s.annotations).flat()
    })
  };
}

// histograms annotations for annotations
function prepAnnotations(annotations) {
  const index = annotations.reduce((memo, annotation) => {
    if (!memo[annotation.location_p_index]) {
      memo[annotation.location_p_index] = [annotation];
    } else {
      memo[annotation.location_p_index].push(annotation);
    }
    return memo;
  }, {});
  return index;
}

// adds chunk to store
function setChunk(i) {
  return { type: "SET_CHUNK", value: i };
}

// changes selected line
function setSelectedLine(args) {
  return { type: "SET_SELECTED_LINE", line: args };
}

export {
  setBook,
  setChunk,
  setSelectedLine,
};

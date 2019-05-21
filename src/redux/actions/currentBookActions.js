import { fetchAnnotations } from "./annotationsActions";
import React from "react";
import AnnotationMarker from "../../components/AnnotationMarker";

function setBook(book) {
  // console.log("SETBOOK ACTION");
  return async dispatch => {
    const bookToBeAnnotated = { ...book };
    await dispatch(fetchAnnotations(bookToBeAnnotated));
    dispatch(annotateAndSetBook(bookToBeAnnotated));
  };
}
function annotateAndSetBook(book) {
  // console.log("ANNOTATE AND SET BOOK ACTION");
  return (dispatch, getState) => {
    const annotations = getState().otherAnnotations;
    annotate(book, annotations, dispatch, getState);
  };
}

function annotate(book, annotations, dispatch, getState) {
  // console.log("ANNOTATE ACTION");
  const parsedText = parseBook(book.text);
  const annoIndex = prepAnnotations(annotations);
  addAsterisks(parsedText, annoIndex);
  let paragraphs = [];
  if (parsedText.length > 500) {
    paragraphs = [jsxParagraphs(parsedText.slice(0, 500))];
    dispatch({ type: "SET_BOOK", book: { id: book.id, title: book.title, author: book.author, text: paragraphs } });
    continueParsing(parsedText, dispatch);
  } else {
    paragraphs = [jsxParagraphs(parsedText)];
    dispatch({ type: "SET_BOOK", book: { id: book.id, title: book.title, author: book.author, text: paragraphs } });
  }
}

function continueParsing(parsedText, dispatch) {
  let counter = 500;

  while (counter + 500 < parsedText.length) {
    const paragraphs = jsxParagraphs(parsedText.slice(counter, counter + 500));
    dispatch({ type: "ADD_CHUNK", chunk: paragraphs });
    counter += 500;
  }
  const paragraphs = jsxParagraphs(parsedText.slice(counter));
  dispatch({ type: "ADD_CHUNK", chunk: paragraphs });
}
function addAsterisks(parsedText, annoIndex) {
  for (const key in annoIndex) {
    annoIndex[key].forEach(anno => {
      let ind = anno.location_char_index;
      while (parsedText[key][ind] !== " " && ind < parsedText[key].length) {
        ind++;
      }
      parsedText[key] =
        parsedText[key].slice(0, anno.location_char_index) +
        `*{${anno.id}}` +
        parsedText[key].slice(anno.location_char_index);
    });
  }
}
function parseBook(text) {
  // console.log("PARSE BOOK");
  const lines = text.split(/\r\n[ \t]*/);
  return lines;
}
function jsxify(line, index) {
  // console.log("JSXIFY LINE");
  const segments = [];
  let i = 0;
  let currentSegment = "";
  while (i < line.length) {
    if (line[i] === "*" && line[i + 1] === "{") {
      segments.push(<React.Fragment key={`line-${index}-segment-${segments.length}`}>{currentSegment}</React.Fragment>);
      let key = "";
      i += 2;
      while (line[i] !== "}" && i < line.length) {
        key += line[i];
        i++;
      }
      segments.push(<AnnotationMarker id={key} key={`Annotation-${key}`} />);
      currentSegment = "";
    } else {
      currentSegment += line[i];
    }
    i++;
  }
  if (currentSegment.length > 0) {
    segments.push(<React.Fragment key={`line-${index}-segment-${segments.length}`}>{currentSegment}</React.Fragment>);
  }

  segments.push(<meta key={`line-${index}-metaSegment`} data-index={index} name="lineIndex" />);

  return segments;
}
function jsxParagraphs(lines) {
  // console.log("JSXIFY PARAGRAPHS");
  let paragraphs = [];
  let currentParagraph = [];
  let i = 0;
  while (i < lines.length) {
    const jsxLine = jsxify(lines[i], i);
    if (jsxLine.length > 1) {
      currentParagraph.push(jsxLine);
    } else {
      paragraphs.push(currentParagraph);
      currentParagraph = [];
    }
    i++;
  }
  if (currentParagraph.length > 0) {
    paragraphs.push(currentParagraph);
  }
  return paragraphs;
}
function prepAnnotations(annotations) {
  // console.log("HIST ANNOTATIONS ACTION");
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

export { setBook, annotate, annotateAndSetBook };

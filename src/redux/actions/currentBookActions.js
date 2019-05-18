import { fetchAnnotations } from "./annotationsActions";
import React from "react";
import AnnotationMarker from "../../components/AnnotationMarker";

function setBook(book) {
  return async (dispatch, getState) => {
    const bookToBeAnnotated = { ...book };

    await dispatch(fetchAnnotations(bookToBeAnnotated));
    const annotations = getState().otherAnnotations;
    const annotatedText = annotate(bookToBeAnnotated, annotations);

    dispatch({ type: "SET_BOOK", book: { ...bookToBeAnnotated, temporary_text: "", text: annotatedText } });
  };
}

function parseBook(text) {
  const lines = text.split("\r\n");

  return lines;
}

function annotate(book, annotations) {
  book.text = parseBook(book.text);
  const annoIndex = prepAnnotations(annotations);
  for (const key in annoIndex) {
    annoIndex[key].forEach(anno => {
      book.text[key] =
        book.text[key].slice(0, anno.location_char_index) +
        `*{${anno.id}}` +
        book.text[key].slice(anno.location_char_index);
    });
  }

  const paragraphs = jsxParagraphs(book.text);

  return paragraphs;
}
function jsxify(line, index) {
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
      segments.push(<AnnotationMarker key={`Annotation-${key}`} />);
      currentSegment = "";
    } else {
      currentSegment += line[i];
    }
    i++;
  }
  if (currentSegment.length > 0) {
    segments.push(<React.Fragment key={`line-${index}-segment-${segments.length}`}>{currentSegment}</React.Fragment>);
  }
  if (segments.length > 0) {
    segments.push(<meta key={`line-${index}-metaSegment`} data-index={index} name="lineIndex" />);
  }

  return segments;
}
function jsxParagraphs(lines) {
  let paragraphs = [];
  let currentParagraph = [];
  let i = 0;
  while (i < lines.length) {
    const jsxLine = jsxify(lines[i], i);
    if (jsxLine.length > 0) {
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

export { setBook, annotate };

import { fetchAnnotations } from "./annotationsActions";
import Parser from "html-react-parser";
import domToReact from "html-react-parser/lib/dom-to-react";
import React from "react";
import AnnotationMarker from "../../components/AnnotationMarker";

function setBook(book) {
  return { type: "SET_BOOK", book: book };
  // return async (dispatch, getState) => {
  //   await dispatch(fetchAnnotations(book));
  //   const annotations = getState().otherAnnotations;
  //   const annoIndex = prepAnnotations(annotations);

  //   const annotatedBook = annotate(book, annoIndex);
  //   dispatch({ type: "SET_BOOK", book: book });
  // };
}

function annotate(book, annoIndex) {
  let count = 0;
  let doc = Parser(book.temporary_text, {
    replace: node => {
      if (node.name === "p") {
        node.attribs.key = count;

        if (annoIndex[count]) {
          count++;

          return <p>ANNOTATED {annotateParagraph(node, annoIndex[count - 1])}</p>;
        } else {
          count++;
          return;
        }
      }
    },
  });
  book.text = doc;
  return book;
}

function annotateParagraph(node, annotations) {
  let betterKids = node.children.length > 1 ? domToReact(node.children) : [domToReact(node.children)];

  annotations.forEach(anno => {
    betterKids = insertAnnotation(anno, betterKids);
  });

  return <p>P{betterKids}P</p>;
}
function insertAnnotation(annotation, betterKids) {
  let totalLength = 0;
  let i = 0;
  let success = false;

  while (i < betterKids.length && !success) {
    if (typeof betterKids[i] === "string") {
      if (annotation.location_char_index < totalLength + betterKids[i].length) {
        const offset = annotation.location_char_index - totalLength;

        let slicedBefore = betterKids[i].slice(0, offset);

        let slicedAfter = betterKids[i].slice(offset);
        betterKids[i] = (
          <span>
            {slicedBefore}
            <AnnotationMarker /> {slicedAfter}
          </span>
        );
        success = true;
      }
      totalLength += [i].length;
    }
    i++;
  }
  return betterKids;
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

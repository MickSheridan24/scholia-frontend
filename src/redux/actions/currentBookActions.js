import { fetchAnnotations } from "./annotationsActions";
import React from "react";
import AnnotationMarker from "../../components/AnnotationMarker";
import { fetchStudies } from "./studiesActions";
import { findBook } from "./annotationsActions";
import { CHUNK_SIZE } from "../actionType";

// annotates the book and sets it to the store
function setBook(book) {
  return async dispatch => {
    const bookToBeAnnotated = { ...book };
    dispatch(fetchStudies());
    await dispatch(fetchAnnotations(bookToBeAnnotated));
    dispatch(annotateAndSetBook(bookToBeAnnotated));
  };
}

// TODO: refactor
// Sort of a middleman function right now
function annotateAndSetBook(book) {
  return (dispatch, getState) => {
    const annotations = getState().otherAnnotations;
    annotate(book, annotations, dispatch, getState);
  };
}

// annotates the book text, prepares it to be appended to the application
function annotate(book, annotations, dispatch) {
  const parsedText = parseBook(book.text);
  const annoIndex = prepAnnotations(annotations);
  addAsterisks(parsedText, annoIndex);
  let paragraphs = [];
  if (parsedText.length > CHUNK_SIZE) {
    paragraphs = [jsxParagraphs(parsedText.slice(0, CHUNK_SIZE), 0, 0)];
    dispatch({ type: "SET_BOOK", book: { id: book.id, title: book.title, author: book.author, text: paragraphs } });
    continueParsing(parsedText, dispatch);
  } else {
    paragraphs = [jsxParagraphs(parsedText, 0, 0)];
    dispatch({ type: "SET_BOOK", book: { id: book.id, title: book.title, author: book.author, text: paragraphs } });
  }
}

// repeats annotation steps for each 2000 lines
function continueParsing(parsedText, dispatch) {
  let counter = CHUNK_SIZE;
  let chunkCounter = 1;

  while (counter + CHUNK_SIZE < parsedText.length) {
    const paragraphs = jsxParagraphs(parsedText.slice(counter, counter + CHUNK_SIZE), counter, chunkCounter);
    dispatch({ type: "ADD_CHUNK", chunk: paragraphs });
    counter += CHUNK_SIZE;
    chunkCounter += 1;
  }
  const paragraphs = jsxParagraphs(parsedText.slice(counter), counter, chunkCounter);
  // console.log(paragraphs);
  dispatch({ type: "ADD_CHUNK", chunk: paragraphs });
}

// adds the asterisks in to be interpreted later
function addAsterisks(parsedText, annoIndex, offset = 0) {
  for (const key in annoIndex) {
    annoIndex[key].forEach(anno => {
      let ind = anno.location_char_index;
      while (parsedText[key - offset][ind] !== " " && ind < parsedText[key - offset].length) {
        ind++;
      }
      parsedText[key - offset] =
        parsedText[key - offset].slice(0, anno.location_char_index) +
        `*{${anno.id}}` +
        parsedText[key - offset].slice(anno.location_char_index);
    });
  }
}

//splits text on linebreaks-- removes other whitespace
function parseBook(text) {
  const lines = text.split(/\r\n[ \t]*/);
  return lines;
}

// turns a line into a jsx-appendable element, with AnnotationMarkers.
function jsxify(line, index, counter, chunkCounter) {
  const segments = [];
  let i = 0;
  let currentSegment = "";
  while (i < line.length) {
    if (line[i] === "*" && line[i + 1] === "{") {
      segments.push(
        <React.Fragment key={`line-${index + counter}-segment-${segments.length}`}>{currentSegment}</React.Fragment>,
      );
      let key = "";
      i += 2;
      while (line[i] !== "}" && i < line.length) {
        key += line[i];
        i++;
      }
      segments.push(<AnnotationMarker chunk={chunkCounter} id={key} key={`Annotation-${key}`} />);
      currentSegment = "";
    } else {
      currentSegment += line[i];
    }
    i++;
  }
  if (currentSegment.length > 0) {
    segments.push(
      <React.Fragment key={`line-${index + counter}-segment-${segments.length}`}>{currentSegment}</React.Fragment>,
    );
  }
  segments.push(<meta key={`line-${index + counter}-metaSegment`} data-index={index + counter} name="lineIndex" />);
  return segments;
}

// converts Chunks into arrays of jsx
function jsxParagraphs(lines, counter, chunkCounter) {
  // console.log("JSXIFY PARAGRAPHS");
  let paragraphs = [];
  let currentParagraph = [];
  let i = 0;
  while (i < lines.length) {
    const jsxLine = jsxify(lines[i], i, counter, chunkCounter);
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

// revises a chunk upon addition or deletion
function reannotateChunk(annotation) {
  const chunk = Math.floor(annotation.location_p_index / CHUNK_SIZE);
  return (dispatch, getState) => {
    const chunkArray = getState().currentBook.text[chunk];
    const book = findBook(getState);
    const parsedBook = parseBook(book.text);
    const low = CHUNK_SIZE * chunk;
    const high = CHUNK_SIZE * chunk + CHUNK_SIZE;
    const range = parsedBook.slice(low, high);
    const relevantAnnotations = getState().otherAnnotations.filter(a => {
      return a.location_p_index >= low && a.location_p_index < high;
    });
    const preparedAnnotations = prepAnnotations(relevantAnnotations);
    addAsterisks(range, preparedAnnotations, low);
    const newParagraphs = jsxParagraphs(range, low, chunk);

    dispatch({ type: "REANNOTATE_CHUNK", chunk: newParagraphs, chunkIndex: chunk });
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

export { setBook, annotate, annotateAndSetBook, setChunk, setSelectedLine, reannotateChunk };

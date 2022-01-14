import * as React from 'react';

type Props = {
  loadedBibleObject: ILoadedBible,
  updateUploadedBible: (newlyLoadedBibleObject: ILoadedBible) => void
}

const defaultBibleBookPickerText = "Choose bible book";

function createBibleBookPicker(bibleBookNameList: Array<string>, selectedBibleBookName: string) {
  var markup = `<option disabled value="undefined">${defaultBibleBookPickerText}</option>`;
  for (let i = 0; i < bibleBookNameList.length; i++) {
    let selected = ''
    if (selectedBibleBookName === bibleBookNameList[i]) {
      selected = 'selected'
    }
    markup += `<option ${selected} value="${bibleBookNameList[i]}">${bibleBookNameList[i]}</option>`
  }
  return markup;
}

const updateBibleBookName = (e: React.FormEvent<HTMLSelectElement>, oldBible: ILoadedBible,
  updateUploadedBible: (newlyLoadedBibleObject: ILoadedBible) => void): void => {
  e.preventDefault();

  oldBible.chosenBibleBookDetails[0] = e.currentTarget.value;
  oldBible.chosenBibleBookDetails[1] = '0';
  oldBible.chosenBibleBookDetails[2] = '0';

  const newBible: ILoadedBible = {
    ['bibleObject']: oldBible.bibleObject,
    ['chosenBibleSourceName']: oldBible.chosenBibleSourceName,
    ['chosenBibleBookNames']: oldBible.chosenBibleBookNames,
    ['chosenBibleBookDetails']: oldBible.chosenBibleBookDetails
  }

  updateUploadedBible(newBible)
}

const BibleBookPickerBlock: React.FC<Props> = ({loadedBibleObject, updateUploadedBible}) => {
  let bibleBookNameList = loadedBibleObject.chosenBibleBookNames;
  let selectedBibleBookName = loadedBibleObject.chosenBibleBookDetails[0];

  return (
    <select id="bible-book-picker" className="picker-items"
      name="bible-book-picker" defaultValue="undefined"
      onChange={(e) => updateBibleBookName(e, loadedBibleObject, updateUploadedBible)}
      dangerouslySetInnerHTML={{__html:
      createBibleBookPicker(bibleBookNameList, selectedBibleBookName) }} >
    </select>
  );
}

export default BibleBookPickerBlock;
import {TouchableOpacity, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import {UserContext} from '../../contexts/UserContext/UserContext';
import {SearchContext} from '../../contexts/SearchContext/SearchContext';
function AddToCartButton({note, isInCart}) {
  const [executing, setExecuting] = useState(false);
  const {saveData} = useContext(UserContext);
  const {searchedNotes, setSearchedNotes} = useContext(SearchContext);
  const onRealClick = async (event) => {
    setExecuting(true);
    await saveData(note);
    makeDisableAddToCartBtn(note);
  };

  function makeDisableAddToCartBtn(cartNote) {
    // console.log(cartNote);
    let tempArray = [];
    searchedNotes.forEach((note) => {
      if (note.id === cartNote.id) {
        note['isButtonActive'] = false;
        tempArray.push(note);
      } else {
        tempArray.push(note);
      }
    });
    setSearchedNotes(tempArray);
    // console.log(tempArray);
    // tempArray.forEach((test) => console.log(test.isButtonActive));
  }
  console.log(note.isButtonActive + '14.satir');
  return (
    <TouchableOpacity
      style={{
        borderRadius: 4,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor:
          note.isButtonActive === true
            ? '#00509d'
            : executing || isInCart
            ? 'gray'
            : '#00509d',
      }}
      onPress={() => onRealClick()}
      disabled={note.isButtonActive === true ? false : executing || isInCart}>
      <Text
        style={{
          fontWeight: 'bold',
          color:
            note.isButtonActive === true
              ? '#00509d'
              : executing || isInCart
              ? 'gray'
              : '#00509d',
        }}>
        Add to cart
      </Text>
    </TouchableOpacity>
  );
}

export default AddToCartButton;

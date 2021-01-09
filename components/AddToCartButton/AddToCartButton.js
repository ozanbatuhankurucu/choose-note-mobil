import {TouchableOpacity, Text} from 'react-native';
import React, {useState, useContext} from 'react';
import {ShoppingCartContext} from '../../contexts/ShoppingCartContext/ShoppingCartContext';

function AddToCartButton({note, isInCart}) {
  const [executing, setExecuting] = useState(false);
  const {saveData} = useContext(ShoppingCartContext);
  console.log(isInCart)
  const onRealClick = async (event) => {
    setExecuting(true);
    await saveData(note);
  };
  return (
    <TouchableOpacity
      style={{
        borderRadius: 4,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderColor: executing  || isInCart ? 'gray' : '#00509d',
      }}
      onPress={onRealClick}
      disabled={executing || isInCart}>
      <Text
        style={{
          fontWeight: 'bold',
          color: executing  || isInCart ? 'gray' : '#00509d',
        }}>
        Add to cart
      </Text>
    </TouchableOpacity>
  );
}

export default AddToCartButton;

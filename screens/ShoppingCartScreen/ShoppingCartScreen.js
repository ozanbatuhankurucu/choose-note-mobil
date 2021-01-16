import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  LogBox,
  FlatList,
  Button,
  Dimensions,
} from 'react-native';
import {UserContext} from '../../contexts/UserContext/UserContext';
import {Storage, API} from 'aws-amplify';
import ProgressImage from '../../components/ProgressImage/ProgressImage';
import CartCollapsable from '../../components/CartCollapsable/CartCollapsable';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function ShoppingCartScreen({navigation}) {
  const {cartNotes} = useContext(UserContext);
  const [totalAmountOfNotes, setTotalAmountOfNotes] = useState(null);
  const [loadImage, setLoadImage] = useState(false);

  console.log(cartNotes.length);

  const totalOfCart = () => {
    console.log('icerdeyim');
    let total = 0;
    if (cartNotes.length !== 0) {
      for (const prop in cartNotes) {
        total += cartNotes[prop].price;
      }
      setTotalAmountOfNotes(total);
    }
  };
  async function getPictureUrls(pictureUrls) {
    setLoadImage(true);
    const tempArray = [];
    let picUrls = pictureUrls;

    const tempPicUrl = await Storage.get(picUrls[0].key);
    tempArray.push({url: tempPicUrl});

    setLoadImage(false);
    return tempArray;
  }
  function _renderItem({item}) {
    return (
      <View style={{paddingHorizontal: 20, paddingVertical: 5}} key={item.id}>
        <View style={styles.boxWithShadow}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 10,
              paddingVertical: 8,
            }}>
            <View style={{flex: 2}}>
              {item.documents.length === 0 ? null : (
                <TouchableOpacity
                  onPress={async () => {
                    const tempArray = await getPictureUrls(item.documents);
                    navigation.navigate('Image View', tempArray);
                  }}>
                  <ProgressImage
                    itemDocuments={item.documents}
                    imgStyle={{borderRadius: 10, width: 60, height: 65}}
                  />
                </TouchableOpacity>
              )}
            </View>
            <View style={{flex: 8, paddingLeft: 8}}>
              <Text style={{fontWeight: 'bold'}}>
                {item.lesson.toUpperCase()}
              </Text>
              <Text style={{fontSize: 12, marginTop: 4}}>
                {item.description}
              </Text>
              <CartCollapsable note={item} />
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Text style={{marginRight: 16, fontWeight: 'bold'}}>
                  {item.price} TL
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderTopWidth: 1,
              borderColor: '#B7C6D9',
            }}>
            <TouchableOpacity>
              <Text style={{color: '#1F93FF', fontSize: 12}}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  useEffect(() => {
    totalOfCart();
  }, []);
  return (
    <>
      {cartNotes.length === 0 ? (
        <View style={{flex: 1}}>
          <Text>cart bostur</Text>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={{flex: 0.9}}>
            {loadImage === true ? (
              <View style={styles.loadImage}>
                <ActivityIndicator size={'large'} color={'green'} />
              </View>
            ) : null}
            <FlatList
              keyExtractor={(item, index) => {
                return item.id;
              }}
              data={cartNotes}
              onEndReachedThreshold={0.1}
              renderItem={_renderItem}
            />
          </View>
          <View
            style={{
              flex: 0.1,
              padding: 10,
              borderTopWidth: 1,
              borderTopColor: '#B7C6D9',
              justifyContent: 'center',
              backgroundColor: '#fff',
            }}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 4}}>
                <View style={{marginLeft: 15}}>
                  <Text style={{color: '#251D21'}}>Total</Text>
                  <Text style={styles.totalText}>{totalAmountOfNotes} TL</Text>
                </View>
              </View>
              <View style={{flex: 6}}>
                <TouchableOpacity style={styles.checkoutBtn}>
                  <Text style={styles.checkoutText}>Check Out</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  boxWithShadow: {
    backgroundColor: '#fff',
    minHeight: 50,
    borderRadius: 5,
    paddingTop: 10,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  checkoutBtn: {
    borderRadius: 5,
    backgroundColor: '#1F93FF',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  loadImage: {
    position: 'absolute',
    top: windowHeight * 0.4,
    zIndex: 1,
    left: windowWidth * 0.5,
  },
});

export default ShoppingCartScreen;

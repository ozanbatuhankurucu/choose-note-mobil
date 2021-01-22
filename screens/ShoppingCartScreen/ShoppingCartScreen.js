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
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SearchContext} from '../../contexts/SearchContext/SearchContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function ShoppingCartScreen({navigation}) {
  const {
    cartNotes,
    removeData,
    setTotalAmountOfNotes,
    totalAmountOfNotes,
    totalOfCart,
  } = useContext(UserContext);
  const {searchedNotes, setSearchedNotes} = useContext(SearchContext);
  const [loadImage, setLoadImage] = useState(false);
  const [tempSearchedNotes, setTempSearchedNotes] = useState(null);

  async function getPictureUrls(pictureUrls) {
    setLoadImage(true);
    const tempArray = [];
    let picUrls = pictureUrls;

    const tempPicUrl = await Storage.get(picUrls[0].key);
    tempArray.push({url: tempPicUrl});

    setLoadImage(false);
    return tempArray;
  }
  function makeActiveAddToCartBtn(cartNote) {
    let tempArray = [];
    if (searchedNotes !== null) {
      searchedNotes.forEach((note) => {
        if (note.id === cartNote.id) {
          note['isButtonActive'] = true;
          tempArray.push(note);
        } else {
          tempArray.push(note);
        }
      });
      setSearchedNotes(tempArray);
    }
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

              {item.documents.length === 0 &&
              item.documentFiles.length !== 0 ? (
                <View style={styles.pdfFrame}>
                  <Text style={styles.pdfText}>PDF</Text>
                  <Feather name="download" size={20} color="#00509d" />
                </View>
              ) : null}
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
            <TouchableOpacity
              onPress={() => {
                makeActiveAddToCartBtn(item);
                removeData(item);
              }}>
              <Text style={{color: '#1F93FF', fontSize: 12}}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  useEffect(() => {
    totalOfCart(cartNotes);
  }, []);
  return (
    <>
      {cartNotes.length === 0 ? (
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{marginTop: 70, alignItems: 'center'}}>
            <MaterialIcons name="add-shopping-cart" size={68} color="#1F93FF" />
            <Text
              style={{
                marginTop: 35,
                fontWeight: '700',
                fontSize: 16,
                color: '#9898AD',
              }}>
              Your Shopping Cart is Empty.
            </Text>
          </View>
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
  pdfFrame: {
    width: 60,
    height: 65,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#A2CDFF',
    alignItems: 'center',
    paddingTop: 8,
  },
  pdfText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#464647',
  },
});

export default ShoppingCartScreen;

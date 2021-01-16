import React, {useState} from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import PostIcon from '../PostIcon/PostIcon';
import moment from 'moment';
import {termConverter} from '../../HelperFunctions/HelperFunctions';

function CartCollapsable({note}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '700',
            color: '#006400',
            textDecorationLine: 'underline',
            marginTop: 4,
          }}>
          See other details
        </Text>
      </TouchableOpacity>
      <Collapsible collapsed={isCollapsed}>
        <View style={{paddingVertical: 8}}>
          <PostIcon
            iconName="university"
            iconSize={14}
            iconText={note.university}
          />
          <PostIcon
            iconName="graduation-cap"
            iconSize={14}
            iconText={note.department}
          />
          <PostIcon
            iconName="pencil"
            iconSize={14}
            iconText={termConverter(note.termID)}
          />
          <PostIcon
            iconName="calendar"
            iconSize={14}
            iconText={moment(note.createdAt).format('LLLL')}
          />
          {note.documents.length !== 0 && note.documentFiles.length !== 0 ? (
            <PostIcon
              iconName="file"
              iconSize={16}
              iconText="download pdf file"
              isDifferentStyle={true}
            />
          ) : null}
        </View>
      </Collapsible>
    </>
  );
}

export default CartCollapsable;

/* eslint-disable-line */ const aws = require('aws-sdk');
var ddb = new aws.DynamoDB({apiVersion: '2012-10-08'});
exports.handler = async (event, context, callback) => {
  // insert code to be executed by your lambda trigger
  console.log(event);

  let date = new Date();

  const tableName = 'User-cid5y722mvfrbldletr5fpatz4-dev';
  const region = 'eu-central-1';
  const bucket = 'elma48f004463c8a496bbd4f114a620be25c30500-dev';
  const url = 'https://elma48f004463c8a496bbd4f114a620be25c30500-dev.s3.eu-central-1.amazonaws.com/public/profilePictures/anonimpp.jpg';
 
  console.log("table=" + tableName + " -- region=" + region);

  aws.config.update({region: region});

  // If the required parameters are present, proceed
  if (event.request.userAttributes.sub) {

      // -- Write data to DDB
      let ddbParams = {
          Item: {
              'id': {S: event.request.userAttributes.sub},
              '__typename': {S: 'User'},
              'username': {S: event.userName},
              'owner': {S: event.userName},
              'email': {S: event.request.userAttributes.email},
              'profilePicture':{S: url},
              'name':{S:''},
              'university':{S:''},
              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()}
          },
          TableName: tableName
      };

      // Call DynamoDB
      try {
          await ddb.putItem(ddbParams).promise();
          console.log("Success");
      } catch (err) {
          console.log("Error", err);
      }

      console.log("Success: Everything executed correctly");
      context.done(null, event);

  } else {
      // Nothing to do, the user's email ID is unknown
      console.log("Error: Nothing was written to DDB or SQS");
      context.done(null, event);
  }
  callback(null, event);
};

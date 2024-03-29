const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1'
  });
  
  
  const route53 = new AWS.Route53();
  

const addDNSRecord = async (hostedZoneId, recordName, recordType, recordValue, ttl) => {
  console.log('adding DNS record',hostedZoneId,recordName,recordType,recordValue);
    let name = recordName.endsWith('.') ? recordName : recordName + '.';
    
    const zone = await route53.getHostedZone({ Id: hostedZoneId }).promise();
    console.log('adding DNS record for',zone);
    
    const zoneName = zone.HostedZone.Name;
    
    if (name === zoneName) {
      name = zoneName;
    }
    else
      name=name+zoneName;

    
    const params = {
      HostedZoneId: hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: 'CREATE',
            ResourceRecordSet: {
              Name: name,
              Type: recordType,
              TTL: ttl,
              ResourceRecords: [
                {
                  Value: recordValue
                }
              ]
            }
          }
        ]
      }
    };
  
    try {
      const response = await route53.changeResourceRecordSets(params).promise();
      console.log('DNS record added successfully:', response.ChangeInfo);
      return response;
    } catch (error) {
      console.error('Error adding DNS record:', error);
      throw error;
    }
  };



// List DNS records 
const listDNSRecords = async (id) => {

    const params = {
      HostedZoneId: id
    };
  
    try {
      const response = await route53.listResourceRecordSets(params).promise();
      console.log('DNS records:', response.ResourceRecordSets);
      
      const zone = await route53.getHostedZone({ Id: id }).promise();
      const zoneName = zone.HostedZone.Name;
      const filteredRecords = response.ResourceRecordSets.filter(record => record.Name !== zoneName);    
    return filteredRecords;
      // return response.ResourceRecordSets;
    } catch (error) {
      console.error('Error listing DNS records:', error);
    }
  };
  

  const deleteDNSRecord = async (id, recordName, type, ttl,recordValue) => {
    try {
      
        // Remove trailing dot if present in recordName
        recordName = recordName.endsWith('.') ? recordName : recordName+'.';

        // Retrieve hosted zone information to ensure correctness
        const zone = await route53.getHostedZone({ Id: id }).promise();
        const zoneName = zone.HostedZone.Name;

        
        
console.log("Name", recordName);
console.log("type: ",typeof(recordName),typeof(type),typeof(ttl),typeof(recordValue));
        const params = {
            HostedZoneId: id,
            ChangeBatch: {
                Changes: [
                    {
                      
                        Action: 'DELETE',
                        ResourceRecordSet: {
                            Name: recordName,
                            Type: type,
                            TTL:parseInt(ttl),
                            ResourceRecords: [
                                {
                                    Value: recordValue
                                }
                            ]

                            

                        }
                    }
                ]
            }
        };
        console.log(params.ChangeBatch.Changes[0].ResourceRecordSet);

        const response = await route53.changeResourceRecordSets(params).promise();
        console.log('DNS record deleted successfully:', response.ChangeInfo);
        return response.ChangeInfo;
    } catch (error) {
        console.error('Error deleting DNS record:', error);
        throw error;
    }
};

  
//   update DNS Record

const updateDNSRecord = async (hostedZoneId, recordName, recordType, recordValue, ttl) => {
  let name = recordName.endsWith('.') ? recordName : recordName + '.';
  
  const zone = await route53.getHostedZone({ Id: hostedZoneId }).promise();
  
  const zoneName = zone.HostedZone.Name;
  
  if (name === zoneName) {
    name = zoneName;
  }
  else
    name=name+zoneName;



    console.log("naam ",name);
  
  const params = {
    HostedZoneId: hostedZoneId,
    ChangeBatch: {
      Changes: [
        {
          Action: 'UPSERT',
          ResourceRecordSet: {
            Name: recordName,
            Type: recordType,
            TTL: ttl,
            ResourceRecords: [
              {
                Value: recordValue
              }
            ]
            
          }
        }
      ]
    }
  };

  try {
    const response = await route53.changeResourceRecordSets(params).promise();
    console.log('DNS record added successfully:', response.ChangeInfo);
    
    return response;
    
  } catch (error) {
    console.error('Error adding DNS record:', error.message);
    return error;
    
  }
};
  
  
  module.exports = {
    addDNSRecord,
    listDNSRecords,
    deleteDNSRecord,
    updateDNSRecord
  };
  